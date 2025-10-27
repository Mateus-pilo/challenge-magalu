import { OrderItem } from './order-item.entity';
import { User } from './user.entity';

export class Order {
  private amount: number = 0;
  private items: OrderItem[] = [];

  constructor(
    public readonly id: string,
    public readonly date: Date,
    public readonly user: User,
  ) {}

  public addItem(item: OrderItem) {
    this.amount += item.price;
    this.items.push(item);
  }

  public getItems(): OrderItem[] {
    return this.items;
  }

  public getAmount() {
    return this.amount.toFixed(2);
  }
}
