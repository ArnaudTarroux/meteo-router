import { TimedWaypoint } from '../../../shared/types';

export type RoutingType = {
  distance: number;
  duration: number;
  waypoints: TimedWaypoint[];
};
