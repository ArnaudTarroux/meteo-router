import { Module } from '@nestjs/common';
import { RouteWeatherController } from './controllers/route-weather.controller';
import { RouteWeatherModule } from '../application/route-weather';

@Module({
  controllers: [RouteWeatherController],
  imports: [RouteWeatherModule],
})
export class ApiModule {}
