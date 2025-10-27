import { Module } from '@nestjs/common';
import { OrdersController } from './infrastructure/controllers/order.controller';
import { OrderFileParserService } from './domain/services/order-file-parse.service';
import { ProcessFileUseCase } from './application/use-cases/process-file.use-case';
import { LocallyOrderRepository } from './infrastructure/repositories/locally-order.repository';
import { FindAllOrdersUseCase } from './application/use-cases/find-all-orders.user-case';

@Module({
  controllers: [OrdersController],
  providers: [
    OrderFileParserService,
    ProcessFileUseCase,
    {
      provide: 'OrderRepository',
      useClass: LocallyOrderRepository,
    },
    FindAllOrdersUseCase,
  ],
  exports: [],
})
export class OrderModule {}
