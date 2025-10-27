import { OrderItem } from '@modules/order/domain/entities/order-item.entity';
import { Order } from '@modules/order/domain/entities/order.entity';
import { User } from '@modules/order/domain/entities/user.entity';
import { OrderFileParserService } from '@modules/order/domain/services/order-file-parse.service';

describe('OrderFileParserService', () => {
  let service: OrderFileParserService;

  beforeEach(() => {
    service = new OrderFileParserService();
  });

  it('should parse a valid file content correctly', () => {
    const userId = '0000000123';
    const name = 'JOAO DA SILVA'.padEnd(45, ' ');
    const orderId = '0000000456';
    const productId = '0000000789';
    const value = '000000012345'; // 12345
    const date = '20250101';
    const line = `${userId}${name}${orderId}${productId}${value}${date}`;

    const buffer = Buffer.from(`${line}\n`);

    const result = service.parse(buffer);

    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);

    const order = result.data![0];
    expect(order).toBeInstanceOf(Order);
    expect(order.id).toBe('456');
    expect(order.user).toBeInstanceOf(User);
    expect(order.user.id).toBe('123');
    expect(order.user.name).toBe('JOAO DA SILVA');
    expect(order.getItems()).toHaveLength(1);

    const item = order.getItems()[0];
    expect(item).toBeInstanceOf(OrderItem);
    expect(item.productId).toBe('789');
    expect(item.price).toBe(12345);
  });

  it('should group multiple items under the same order', () => {
    const userId = '0000000123';
    const name = 'MARIA OLIVEIRA'.padEnd(45, ' ');
    const orderId = '0000001111';
    const date = '20250102';

    const line1 = `${userId}${name}${orderId}0000000001000000000100${date}`;
    const line2 = `${userId}${name}${orderId}0000000002000000000200${date}`;
    const buffer = Buffer.from(`${line1}\n${line2}\n`);

    const result = service.parse(buffer);
    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(1);

    const order = result.data![0];
    expect(order.getItems()).toHaveLength(2);
    expect(order.getItems()[0].price).toBe(100);
    expect(order.getItems()[1].price).toBe(200);
  });

  it('should handle parsing errors gracefully', () => {
    const invalidBuffer = Buffer.from('INVALID_LINE');

    const result = service.parse(invalidBuffer);
    expect(result.data).toBeUndefined();
  });
});
