import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/repositories/order.repository';
import { Order } from '../../domain/entities/order.entity';
import { QueryOrderDto } from '@modules/order/application/dto/query-orders.dto';

@Injectable()
export class LocallyOrderRepository implements OrderRepository {
  private orders: Order[] = [];

  saveAll(orders: Order[]): void {
    this.orders.push(...orders);
  }

  findAll(query: QueryOrderDto): Order[] {
    if (!query.orderId && !query.dateStart && !query.dateEnd)
      return this.orders;

    if (query.dateStart && query.dateEnd)
      return this.filterByDates(
        new Date(query.dateStart),
        new Date(query.dateEnd),
      );
    if (query.orderId) return this.filterById(query.orderId);
    return [];
  }

  private filterByDates(dateStart: Date, dateEnd: Date) {
    return this.orders.filter((item) => {
      if (item.date > dateStart && item.date <= dateEnd) return item;
    });
  }

  private filterById(orderId: string) {
    return this.orders.filter((item) => {
      if (item.id === orderId) return item;
    });
  }
}
