import { Module } from '@nestjs/common';
import { Routing } from './interfaces';
import { OpenRouteRouting } from './implementations';
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
      provide: Routing,
      useClass: OpenRouteRouting,
    },
  ],
  exports: [Routing],
})
export class RoutingModule {}
