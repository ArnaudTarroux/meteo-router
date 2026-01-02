import { Module } from '@nestjs/common';
import { Geocoding } from './interfaces/geocoding';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { SmappenPeliasGeocoding } from './implementations';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ConfigModule,
  ],
  providers: [
    {
      provide: Geocoding,
      useClass: SmappenPeliasGeocoding,
    },
  ],
  exports: [Geocoding],
})
export class GeocodingModule {}
