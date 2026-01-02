import { Routing } from '../../interfaces';
import { Coordinates, TimedWaypoint } from '../../../../shared/types';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Geometry, OpenRouteResponse, Segment } from './open-route.response';
import { RoutingType } from '../../interfaces';

@Injectable()
export class OpenRouteRouting implements Routing {
  private readonly logger = new Logger(OpenRouteRouting.name);

  private readonly openRouteHost: string;
  private readonly openRouteApiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {
    this.openRouteHost = this.config.get<string>('open_route.host')!;
    this.openRouteApiKey = this.config.get<string>('open_route.api_key')!;
  }

  async getRoute(start: Coordinates, end: Coordinates): Promise<RoutingType> {
    this.logger.debug(
      `Fetching route from ${JSON.stringify(start)} to ${JSON.stringify(end)}`,
    );
    const { data } = await firstValueFrom(
      this.httpService.get<OpenRouteResponse>(
        `${this.openRouteHost}/v2/directions/driving-car`,
        {
          params: {
            api_key: this.openRouteApiKey,
            start: `${start.lng},${start.lat}`,
            end: `${end.lng},${end.lat}`,
          },
        },
      ),
    );

    const feature = data.features[0];
    return {
      distance: feature.properties.summary.distance,
      duration: feature.properties.summary.duration,
      waypoints: this.computeTimedRoute(
        this.extractRouteCoordinates(feature.geometry),
        feature.properties.segments[0],
      ),
    };
  }

  private extractRouteCoordinates(geometry: Geometry): Coordinates[] {
    return geometry.coordinates.map(([lng, lat]) => ({
      lat,
      lng,
    }));
  }

  private computeTimedRoute(
    coordinates: Coordinates[],
    segment: Segment,
  ): TimedWaypoint[] {
    const timedRoute: TimedWaypoint[] = [];

    let cumulativeTime = 0;

    for (const step of segment.steps) {
      const [startIdx, endIdx] = step.way_points;
      const stepDuration = step.duration;
      const stepLength = endIdx - startIdx;

      for (let i = startIdx; i <= endIdx; i++) {
        const ratio = stepLength === 0 ? 0 : (i - startIdx) / stepLength;
        const timestamp = cumulativeTime + ratio * stepDuration;

        timedRoute[i] = {
          location: coordinates[i],
          timestamp: timestamp,
        };
      }

      cumulativeTime += stepDuration;
    }

    return timedRoute;
  }
}
