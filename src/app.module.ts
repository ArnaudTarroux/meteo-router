import { Module } from '@nestjs/common';
import { RouteWeatherModule } from './application/route-weather';
import { ApiModule } from './api';
import { GeocodingModule } from './application/geocoding';
import { RoutingModule } from './application/routing';
import { WeatherModule } from './application/weather';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './common/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      load: [configuration],
    }),
    RouteWeatherModule,
    ApiModule,
    GeocodingModule,
    RoutingModule,
    WeatherModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
