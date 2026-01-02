import { Inject, Injectable } from '@nestjs/common';
import { CoordinatesDistanceCalculator } from './coordinates-distance-calculator/coordinates-distance-calculator';
import { TimedWaypoint } from '../../../shared/types';

@Injectable()
export class RouteSamplerService {
  constructor(
    @Inject(CoordinatesDistanceCalculator)
    private readonly distanceCalculator: CoordinatesDistanceCalculator,
  ) {}
  async sampleRoute(
    route: TimedWaypoint[],
    stepInKm: number,
  ): Promise<TimedWaypoint[]> {
    const sampled: TimedWaypoint[] = [];
    let accumulatedDistance = 0;

    for (let i = 0; i < route.length - 1; i++) {
      const fromRoute = route[i];
      const toRoute = route[i + 1];
      const from = fromRoute.location;
      const to = toRoute.location;

      accumulatedDistance += await this.distanceCalculator.calculateDistance(
        from,
        to,
      );
      if (accumulatedDistance >= stepInKm) {
        sampled.push(toRoute);
        accumulatedDistance = 0;
      }
    }

    return sampled;
  }
}
