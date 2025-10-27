import { QueryOrderDto } from '@modules/order/application/dto/query-orders.dto';
import { Order } from '../entities/order.entity';

export interface OrderRepository {
  saveAll(orders: Order[]): void;
  findAll(query: QueryOrderDto): Order[];
}
