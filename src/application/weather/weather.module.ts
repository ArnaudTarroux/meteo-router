import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { Weather } from './contracts';
import { OpenMeteoWeather } from './providers';

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
