import { IsDate, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class ComputeRouteWeatherRequest {
  @IsString()
  from: string;

  @IsString()
  to: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  departure: Date;
}
