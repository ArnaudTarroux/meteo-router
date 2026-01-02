import { Coordinates } from '../../../../shared/types';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { SmappenPeliasResponse } from './smappen-pelias.response';
import { Injectable, Logger } from '@nestjs/common';
import { AddressNotFoundError } from '../../errors';
import { Geocoding } from '../../contracts/geocoding';

@Injectable()
export class SmappenPeliasGeocoding implements Geocoding {
  private readonly logger = new Logger(SmappenPeliasGeocoding.name);

  private readonly peliasApiHost: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {
    this.peliasApiHost = this.config.get<string>('smappen_pelias.host')!;
  }

  async getCoordinates(address: string): Promise<Coordinates> {
    this.logger.debug(`Fetching coordinates for address: ${address}`);

    const { data } = await firstValueFrom(
      this.httpService.get<SmappenPeliasResponse>(
        `${this.peliasApiHost}/v1/search`,
        {
          params: {
            text: address,
          },
        },
      ),
    );

    if (data.features.length === 0) {
      throw new AddressNotFoundError('Address not found');
    }

    const [lng, lat] = data.features[0].geometry.coordinates;

    return { lat, lng };
  }
}
