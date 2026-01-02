import { Coordinates } from '../../../../shared/types';

export const CoordinatesDistanceCalculator = Symbol(
  'CoordinatesDistanceCalculator',
);

export interface CoordinatesDistanceCalculator {
  calculateDistance(pointA: Coordinates, pointB: Coordinates): Promise<number>;
}
