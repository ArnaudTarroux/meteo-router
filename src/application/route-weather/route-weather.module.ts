import { Module } from '@nestjs/common';
import { RouteWeatherService } from './services/route-weather.service';
import { GeocodingModule } from '../geocoding';
import { RoutingModule } from '../routing';
import { RouteSamplerService } from './services/route-sampler.service';
import { HaversineCoordinatesDistanceCalculator } from './services/coordinates-distance-calculator/haversine.coordinates-distance-calculator';
import { CoordinatesDistanceCalculator } from './services/coordinates-distance-calculator/coordinates-distance-calculator';
import { WeatherModule } from '../weather';

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
