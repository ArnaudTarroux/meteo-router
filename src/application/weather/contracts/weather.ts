import { WaypointWithPassageDatetime } from '../../../shared/types/waypoint-with-passage-datetime.type';
import { WeatherType } from './weather.types';

export const Weather = Symbol('Weather');

export interface Weather {
  getWeatherAt(
    waypoints: WaypointWithPassageDatetime[],
  ): Promise<WeatherType[]>;
}
