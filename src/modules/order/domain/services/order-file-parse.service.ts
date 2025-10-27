import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { User } from '../entities/user.entity';
import { OrderFileParseResponse } from '../interfaces/order-file-parse.response';

@Injectable()
export class OrderFileParserService {
  private readonly logger = new Logger(OrderFileParserService.name);

  parse(content: Buffer): OrderFileParseResponse<Order[]> {
    try {
      const lines = content.toString().split(/\r?\n/).filter(Boolean);
      const ordersMap = new Map<string, Order>();

      for (const line of lines) {
        if (line.length < 90) continue;

        const userId = Number(line.substring(0, 10).trim()).toString();
        const userName = line.substring(10, 55).trim();
        const orderId = Number(line.substring(55, 65).trim()).toString();
        const productId = Number(line.substring(65, 75).trim()).toString();
        const value = Number(line.substring(75, 87));
        const dateStr = line.substring(87, 95);

        const item = new OrderItem(productId, value);
        const user = new User(userId, userName);

        const date = new Date(
          `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`,
        );
        if (!ordersMap.has(orderId)) {
          const order = new Order(orderId, date, user);
          order.addItem(item);
          ordersMap.set(orderId, order);
        } else {
          ordersMap.get(orderId)?.addItem(item);
        }
      }
      const data = Array.from(ordersMap.values());

      if (data.length === 0) throw new BadRequestException('Arquivo invalído');

      return { success: true, data };
    } catch (error) {
      this.logger.error(`Parser Order Fail: ${JSON.stringify(error)}`);
      return { success: false, data: undefined };
    }
  }
}
