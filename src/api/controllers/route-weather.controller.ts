import {
  Controller,
  Get,
  NotFoundException,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ComputeRouteWeatherRequest } from '../dtos/compute-route-weather.request';
import { ComputeRouteWeatherResponse } from '../dtos/compute-route-weather.response';
import { AddressNotFoundError } from '../../application/geocoding/errors';
import { WaypointWeatherNotFoundError } from '../../application/weather/errors';
import { RouteWeatherService } from '../../application/route-weather/providers';

@Controller('route-weather')
export class RouteWeatherController {
  constructor(private readonly routeWeatherService: RouteWeatherService) {}
  @Get()
  async computeRouteWeather(@Query() query: ComputeRouteWeatherRequest) {
    try {
      const weather =
        await this.routeWeatherService.computeRouteWeatherFromAddress(query);

      return new ComputeRouteWeatherResponse(
        weather.distance,
        weather.duration,
        weather.weather.map((waypoint) => ({
          location: waypoint.location,
          passageDatetime: waypoint.passageDatetime,
          weather: {
            temperature: waypoint.weather.temperature,
            weatherCondition: waypoint.weather.weatherCondition,
            precipitationProbability: waypoint.weather.precipitationProbability,
            windSpeed: waypoint.weather.windSpeed,
          },
        })),
      );
    } catch (error) {
      if (error instanceof AddressNotFoundError) {
        throw new NotFoundException('Address not found');
      }
      if (error instanceof WaypointWeatherNotFoundError) {
        throw new UnprocessableEntityException(
          'Could not retrieve weather for route waypoints',
        );
      }

      throw error;
    }
  }
}
