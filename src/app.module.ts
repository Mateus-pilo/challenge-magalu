import { HealthModule } from '@config/health/health.module';
import { SwaggerConfigModule } from '@config/swagger';
import { OrderModule } from '@modules/order/order.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [SwaggerConfigModule, HealthModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
