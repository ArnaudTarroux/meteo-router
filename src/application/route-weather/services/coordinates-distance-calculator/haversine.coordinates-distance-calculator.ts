import { CoordinatesDistanceCalculator } from './coordinates-distance-calculator';
import { Coordinates } from '../../../../shared/types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HaversineCoordinatesDistanceCalculator implements CoordinatesDistanceCalculator {
  calculateDistance(pointA: Coordinates, pointB: Coordinates) {
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371; // earth radius in km
    const dLat = toRad(pointB.lat - pointA.lat);
    const dLng = toRad(pointB.lng - pointA.lng);
    const lat1 = toRad(pointA.lat);
    const lat2 = toRad(pointB.lat);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Promise.resolve(R * c);
  }
}
