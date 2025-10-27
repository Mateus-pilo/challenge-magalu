import { Order } from '@modules/order/domain/entities/order.entity';
import { FindAllOrdersDto, ProducDto } from '../dto/find-all-orders.dto';
import { DateUtil } from '@shared/utils/date.util';

export class OrdersMapper {
  static entityToDto(orders: Order[]) {
    return orders.reduce((accumulator: FindAllOrdersDto[], current: Order) => {
      const index = accumulator.findIndex(
        (item) => item.userId === current.user.id,
      );

      if (index >= 0) {
        accumulator[index].orders.push({
          orderId: current.id,
          amount: current.getAmount().toString(),
          date: DateUtil.formatDate(current.date),
          products: current.getItems() as unknown as ProducDto[],
        });

        return accumulator;
      }

      accumulator.push({
        userId: current.user.id,
        name: current.user.name,
        orders: [
          {
            orderId: current.id,
            amount: current.getAmount().toString(),
            date: DateUtil.formatDate(current.date),
            products: current.getItems() as unknown as ProducDto[],
          },
        ],
      });
      return accumulator;
    }, []);
  }
}
