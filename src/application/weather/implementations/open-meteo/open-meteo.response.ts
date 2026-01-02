export interface OpenMeteoApiResponse {
  latitude: number;
  longitude: number;
  location_id: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  minutely_15_units: WeatherUnits;
  minutely_15: WeatherData;
}

export interface WeatherUnits {
  time: 'iso8601';
  temperature_2m: '°C';
  weather_code: 'wmo code';
  precipitation_probability: '%';
  wind_speed_10m: 'km/h';
}

export interface WeatherData {
  time: string[];
  temperature_2m: number[];
  weather_code: WeatherCode[];
  precipitation_probability: number[];
  wind_speed_10m: number[];
}

export enum WeatherCode {
  ClearSky = 0, // Clear sky
  MainlyClear = 1, // Mainly clear
  PartlyCloudy = 2, // Partly cloudy
  Overcast = 3, // Overcast
  Fog = 45, // Fog
  DepositingRimeFog = 48, // Depositing rime fog
  DrizzleLight = 51, // Drizzle: Light intensity
  DrizzleModerate = 53, // Drizzle: Moderate intensity
  DrizzleDense = 55, // Drizzle: Dense intensity
  FreezingDrizzleLight = 56, // Freezing Drizzle: Light intensity
  FreezingDrizzleDense = 57, // Freezing Drizzle: Dense intensity
  RainSlight = 61, // Rain: Slight intensity
  RainModerate = 63, // Rain: Moderate intensity
  RainHeavy = 65, // Rain: Heavy intensity
  FreezingRainLight = 66, // Freezing Rain: Light intensity
  FreezingRainHeavy = 67, // Freezing Rain: Heavy intensity
  SnowSlight = 71, // Snow fall: Slight intensity
  SnowModerate = 73, // Snow fall: Moderate intensity
  SnowHeavy = 75, // Snow fall: Heavy intensity
  SnowGrains = 77, // Snow grains
  RainShowersSlight = 80, // Rain showers: Slight
  RainShowersModerate = 81, // Rain showers: Moderate
  RainShowersViolent = 82, // Rain showers: Violent
  SnowShowersSlight = 85, // Snow showers: Slight
  SnowShowersHeavy = 86, // Snow showers: Heavy
  Thunderstorm = 95, // Thunderstorm: Slight or moderate
  ThunderstormSlightHail = 96, // Thunderstorm with slight hail
  ThunderstormHeavyHail = 99, // Thunderstorm with heavy hail
}
