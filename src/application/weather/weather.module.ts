import { Module } from '@nestjs/common';
import { Weather } from './interfaces';
import { OpenMeteoWeather } from './implementations';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 3000,
      maxRedirects: 2,
    }),
  ],
  providers: [
    {
      provide: Weather,
      useClass: OpenMeteoWeather,
    },
  ],
  exports: [Weather],
})
export class WeatherModule {}
