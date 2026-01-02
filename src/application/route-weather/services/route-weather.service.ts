import { Inject, Injectable, Logger } from '@nestjs/common';
import { ComputeWeatherFromAddress } from '../compute-weather.types';
import { Geocoding } from '../../geocoding/interfaces/geocoding';
import { Routing } from '../../routing/interfaces';
import { RouteSamplerService } from './route-sampler.service';
import { Weather } from '../../weather/interfaces';

@Injectable()
export class RouteWeatherService {
  private readonly logger = new Logger(RouteWeatherService.name);

  constructor(
    @Inject(Geocoding)
    private readonly geocoding: Geocoding,
    @Inject(Routing)
    private readonly routing: Routing,
    @Inject(Weather)
    private readonly weather: Weather,
    private readonly samplerService: RouteSamplerService,
  ) {}

  async computeRouteWeatherFromAddress({
    from,
    to,
    departure,
  }: ComputeWeatherFromAddress) {
    this.logger.debug(
      `Get route weather from ${from} to ${to} at ${departure.toISOString()}`,
    );

    const { fromCoordinates, toCoordinates } =
      await this.getCoordinatesFromAddress(from, to);

    const { waypoints, duration, distance } = await this.routing.getRoute(
      fromCoordinates,
      toCoordinates,
    );
    const sampledWaypointsWithPassageDatetime = (
      await this.samplerService.sampleRoute(waypoints, 20)
    ).map((waypoint, index) => ({
      id: index,
      location: waypoint.location,
      passageDatetime: new Date(
        departure.getTime() + waypoint.timestamp * 1000,
      ),
    }));
    this.logger.debug(
      `Sampled ${sampledWaypointsWithPassageDatetime.length} waypoints`,
    );

    return {
      distance,
      duration,
      weather: await this.weather.getWeatherAt(
        sampledWaypointsWithPassageDatetime,
      ),
    };
  }

  private async getCoordinatesFromAddress(from: string, to: string) {
    const [fromCoordinates, toCoordinates] = await Promise.all([
      this.geocoding.getCoordinates(from),
      this.geocoding.getCoordinates(to),
    ]);
    return { fromCoordinates, toCoordinates };
  }
}
