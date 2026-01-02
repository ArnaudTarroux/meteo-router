import { Coordinates } from '../../../shared/types';

export const Geocoding = Symbol('Geocoding');

export interface Geocoding {
  getCoordinates(address: string): Promise<Coordinates>;
}
