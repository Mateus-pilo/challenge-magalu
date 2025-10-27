import { OrderRepository } from '@modules/order/domain/repositories/order.repository';
import { Inject, Injectable } from '@nestjs/common';
import { FindAllOrdersDto } from '../dto/find-all-orders.dto';
import { OrdersMapper } from '../mappers/order.mapper';
import { QueryOrderDto } from '../dto/query-orders.dto';

@Injectable()
export class FindAllOrdersUseCase {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepo: OrderRepository,
  ) {}

  execute(query: QueryOrderDto): FindAllOrdersDto[] {
    const orders = this.orderRepo.findAll(query);
    if (!orders || orders.length <= 0) return [];
    return OrdersMapper.entityToDto(orders);
  }
}
