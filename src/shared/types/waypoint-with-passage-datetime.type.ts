import { Coordinates } from './coordinates.type';

export type WaypointWithPassageDatetime = {
  id: number;
  location: Coordinates;
  passageDatetime: Date;
};
