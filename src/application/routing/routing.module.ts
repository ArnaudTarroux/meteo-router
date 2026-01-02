import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { Routing } from './contracts';
import { OpenRouteRouting } from './providers';

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
