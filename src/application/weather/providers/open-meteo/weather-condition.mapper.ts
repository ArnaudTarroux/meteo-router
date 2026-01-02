import { WeatherCode } from './open-meteo.response';
import { WeatherCondition } from '../../contracts';

const weatherCodeToWeatherConditionMap: Record<WeatherCode, WeatherCondition> =
  {
    // Clear / clouds
    [WeatherCode.ClearSky]: WeatherCondition.Clear,
    [WeatherCode.MainlyClear]: WeatherCondition.Clear,
    [WeatherCode.PartlyCloudy]: WeatherCondition.Cloudy,
    [WeatherCode.Overcast]: WeatherCondition.Cloudy,

    // Fog
    [WeatherCode.Fog]: WeatherCondition.Fog,
    [WeatherCode.DepositingRimeFog]: WeatherCondition.Fog,

    // Drizzle
    [WeatherCode.DrizzleLight]: WeatherCondition.Drizzle,
    [WeatherCode.DrizzleModerate]: WeatherCondition.Drizzle,
    [WeatherCode.DrizzleDense]: WeatherCondition.Drizzle,
    [WeatherCode.FreezingDrizzleLight]: WeatherCondition.Drizzle,
    [WeatherCode.FreezingDrizzleDense]: WeatherCondition.Drizzle,

    // Rain
    [WeatherCode.RainSlight]: WeatherCondition.Rain,
    [WeatherCode.RainModerate]: WeatherCondition.Rain,
    [WeatherCode.RainHeavy]: WeatherCondition.Rain,
    [WeatherCode.FreezingRainLight]: WeatherCondition.Rain,
    [WeatherCode.FreezingRainHeavy]: WeatherCondition.Rain,

    // Snow
    [WeatherCode.SnowSlight]: WeatherCondition.Snow,
    [WeatherCode.SnowModerate]: WeatherCondition.Snow,
    [WeatherCode.SnowHeavy]: WeatherCondition.Snow,
    [WeatherCode.SnowGrains]: WeatherCondition.Snow,

    // Showers
    [WeatherCode.RainShowersSlight]: WeatherCondition.Showers,
    [WeatherCode.RainShowersModerate]: WeatherCondition.Showers,
    [WeatherCode.RainShowersViolent]: WeatherCondition.Showers,
    [WeatherCode.SnowShowersSlight]: WeatherCondition.Showers,
    [WeatherCode.SnowShowersHeavy]: WeatherCondition.Showers,

    // Thunderstorm
    [WeatherCode.Thunderstorm]: WeatherCondition.Thunderstorm,
    [WeatherCode.ThunderstormSlightHail]: WeatherCondition.Thunderstorm,
    [WeatherCode.ThunderstormHeavyHail]: WeatherCondition.Thunderstorm,
  };

export function mapWeatherCodeToWeatherCondition(
  code: WeatherCode,
): WeatherCondition {
  return weatherCodeToWeatherConditionMap[code] ?? WeatherCondition.Unknown;
}
