import { Coordinates } from '../../../shared/types';

export type WeatherType = {
  location: Coordinates;
  passageDatetime: Date;
  weather: {
    temperature: number;
    weatherCondition: WeatherCondition;
    precipitationProbability: number;
    windSpeed: number;
  };
};

export enum WeatherCondition {
  Clear = 'clear',
  Cloudy = 'cloudy',
  Fog = 'fog',

  Drizzle = 'drizzle',
  Rain = 'rain',
  Snow = 'snow',

  Showers = 'showers',
  Thunderstorm = 'thunderstorm',

  Unknown = 'unknown',
}
