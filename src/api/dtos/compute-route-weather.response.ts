import { Coordinates } from '../../shared/types';
import { WeatherCondition } from '../../application/weather/interfaces/weather.types';

class WaypointWeatherResponse {
  location: Coordinates;
  passageDatetime: Date;
  weather: {
    temperature: number;
    weatherCondition: WeatherCondition;
    precipitationProbability: number;
    windSpeed: number;
  };
}

export class ComputeRouteWeatherResponse {
  distance: number;
  duration: number;
  waypoints: WaypointWeatherResponse[];

  constructor(
    distance: number,
    duration: number,
    waypoints: WaypointWeatherResponse[],
  ) {
    this.distance = distance;
    this.duration = duration;
    this.waypoints = waypoints;
  }
}
