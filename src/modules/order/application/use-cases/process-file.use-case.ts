import { OrderRepository } from '@modules/order/domain/repositories/order.repository';
import { OrderFileParserService } from '@modules/order/domain/services/order-file-parse.service';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProcessFileUseCase {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepo: OrderRepository,
    private readonly parser: OrderFileParserService,
  ) {}

  execute(file: Express.Multer.File) {
    const orders = this.parser.parse(file.buffer);
    if (!orders.success)
      throw new BadRequestException(`Falha ao processar arquivo`);

    this.orderRepo.saveAll(orders?.data ?? []);
  }
}
