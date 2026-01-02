import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Injectable, Logger } from '@nestjs/common';
import { OpenMeteoApiResponse } from './open-meteo.response';
import { WaypointWithPassageDatetime } from '../../../../shared/types/waypoint-with-passage-datetime.type';
import { WaypointWeatherNotFoundError } from '../../errors';
import { mapWeatherCodeToWeatherCondition } from './weather-condition.mapper';
import { Weather, WeatherType } from '../../contracts';

@Injectable()
export class OpenMeteoWeather implements Weather {
  private readonly logger = new Logger(OpenMeteoWeather.name);
  private readonly openMeteoHost: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {
    this.openMeteoHost = this.config.get<string>('open_meteo.host')!;
  }

  async getWeatherAt(
    waypoints: WaypointWithPassageDatetime[],
  ): Promise<WeatherType[]> {
    this.logger.debug(`Fetching weather for ${waypoints.length} waypoints`);
    const startDate = waypoints.sort(
      (a, b) => a.passageDatetime.getTime() - b.passageDatetime.getTime(),
    )[0]?.passageDatetime;
    const endDate = waypoints.sort(
      (a, b) => b.passageDatetime.getTime() - a.passageDatetime.getTime(),
    )[0]?.passageDatetime;

    const data = await this.getWeatherData(waypoints, startDate, endDate);

    return waypoints.map((waypoint) => {
      const matchedWeather: OpenMeteoApiResponse | undefined = data.find(
        (weather) => {
          if (waypoint.id === 0) {
            return !weather.location_id;
          }
          return weather.location_id === waypoint.id;
        },
      );

      if (!matchedWeather) {
        throw new WaypointWeatherNotFoundError(
          `No weather data found for location ${waypoint.id} (${waypoint.location.lat}, ${waypoint.location.lng})`,
        );
      }
      const weatherIndex = this.findWeatherIndex(
        waypoint.passageDatetime,
        matchedWeather.minutely_15.time.map((time) => new Date(time).getTime()),
      );

      return {
        ...waypoint,
        weather: {
          temperature: matchedWeather.minutely_15.temperature_2m[weatherIndex],
          weatherCondition: mapWeatherCodeToWeatherCondition(
            matchedWeather.minutely_15.weather_code[weatherIndex],
          ),
          precipitationProbability:
            matchedWeather.minutely_15.precipitation_probability[weatherIndex],
          windSpeed: matchedWeather.minutely_15.wind_speed_10m[weatherIndex],
        },
      };
    });
  }

  private async getWeatherData(
    waypoints: WaypointWithPassageDatetime[],
    startDate: Date | undefined,
    endDate: Date | undefined,
  ): Promise<OpenMeteoApiResponse[]> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<OpenMeteoApiResponse[]>(
          `${this.openMeteoHost}/v1/forecast`,
          {
            params: {
              latitude: waypoints.map((waypoint) => waypoint.location.lat),
              longitude: waypoints.map((waypoint) => waypoint.location.lng),
              minutely_15: [
                'temperature_2m',
                'weather_code',
                'precipitation_probability',
                'wind_speed_10m',
              ],
              timezone: 'Europe/Paris',
              start_date: new Intl.DateTimeFormat('en-CA').format(startDate), // YYYY-MM-DD
              end_date: new Intl.DateTimeFormat('en-CA').format(endDate), // YYYY-MM-DD
            },
          },
        ),
      );

      return data;
    } catch (error) {
      this.logger.error(`Error fetching weather data: ${error.message}`);
      throw new Error(`Error fetching weather data`);
    }
  }

  private findWeatherIndex(
    passageDatetime: Date,
    weatherTimestamps: number[],
  ): number {
    let closestIndex = 0;
    let minDiff = Infinity;

    for (let i = 0; i < weatherTimestamps.length; i++) {
      const diff = Math.abs(weatherTimestamps[i] - passageDatetime.getTime());

      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    }

    return closestIndex;
  }
}
