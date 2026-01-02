import { Module } from '@nestjs/common';
import { GeocodingModule } from '../geocoding';
import { RoutingModule } from '../routing';
import { WeatherModule } from '../weather';
import {
  CoordinatesDistanceCalculator,
  HaversineCoordinatesDistanceCalculator,
  RouteSamplerService,
  RouteWeatherService,
} from './providers';

@Module({
  imports: [GeocodingModule, RoutingModule, WeatherModule],
  providers: [
    RouteWeatherService,
    RouteSamplerService,
    {
      provide: CoordinatesDistanceCalculator,
      useClass: HaversineCoordinatesDistanceCalculator,
    },
  ],
  exports: [RouteWeatherService],
})
export class RouteWeatherModule {}
