import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Geocoding } from './contracts/geocoding';
import { SmappenPeliasGeocoding } from './providers';

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
