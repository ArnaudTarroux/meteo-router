import { Coordinates } from '../../../shared/types';
import { RoutingType } from './routing.types';

export const Routing = Symbol('Routing');

export interface Routing {
  getRoute(start: Coordinates, end: Coordinates): Promise<RoutingType>;
}
