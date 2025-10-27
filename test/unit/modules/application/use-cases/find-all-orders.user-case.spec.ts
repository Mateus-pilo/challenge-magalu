import { FindAllOrdersDto } from '@modules/order/application/dto/find-all-orders.dto';
import { FindAllOrdersUseCase } from '@modules/order/application/use-cases/find-all-orders.user-case';
import { OrderItem } from '@modules/order/domain/entities/order-item.entity';
import { Order } from '@modules/order/domain/entities/order.entity';
import { User } from '@modules/order/domain/entities/user.entity';
import { OrderRepository } from '@modules/order/domain/repositories/order.repository';

describe('FindAllOrdersUseCase', () => {
  let useCase: FindAllOrdersUseCase;
  let orderRepo: jest.Mocked<OrderRepository>;

  beforeEach(() => {
    orderRepo = {
      findAll: jest.fn(),
    } as unknown as jest.Mocked<OrderRepository>;

    useCase = new FindAllOrdersUseCase(orderRepo);
  });

  it('should return mapped DTOs when repository returns data', () => {
    const first = new Order('1', new Date('2022-01-02'), new User('1', 'test'));
    first.addItem(new OrderItem('1', 100));

    const second = new Order(
      '2',
      new Date('2022-01-02'),
      new User('2', 'test'),
    );
    second.addItem(new OrderItem('2', 100));

    const mockOrders: Order[] = [first, second];

    const mockDtos: FindAllOrdersDto[] = [
      {
        userId: '1',
        name: 'test',
        orders: [
          {
            orderId: '1',
            amount: '100.00',
            date: '2022-01-02',
            products: [{ productId: '1', price: 100 }],
          },
        ],
      },
      {
        userId: '2',
        name: 'test',
        orders: [
          {
            orderId: '2',
            amount: '100.00',
            date: '2022-01-02',
            products: [{ productId: '2', price: 100 }],
          },
        ],
      },
    ];

    orderRepo.findAll.mockReturnValue(mockOrders);

    const result = useCase.execute({});

    expect(orderRepo.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockDtos);
  });

  it('should return empty array when repository returns empty list', () => {
    orderRepo.findAll.mockReturnValue([]);

    const result = useCase.execute({});

    expect(orderRepo.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });

  it('should return empty array when repository returns undefined', () => {
    orderRepo.findAll.mockReturnValue(undefined as any);

    const result = useCase.execute({});

    expect(orderRepo.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });
});
