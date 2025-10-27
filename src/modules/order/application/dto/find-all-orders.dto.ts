import { ApiProperty } from '@nestjs/swagger';

export class ProducDto {
  @ApiProperty({ description: 'Id do produto' })
  productId: string;

  @ApiProperty({ description: 'Valor do produto' })
  price: number;
}

export class OrderDto {
  @ApiProperty({ description: 'Id do pedido' })
  orderId: string;

  @ApiProperty({ description: 'Valor total do pedido' })
  amount: string;

  @ApiProperty({ description: 'Data do pedido' })
  date: string;

  @ApiProperty({
    description: 'Lista de produtos',
    type: ProducDto,
    isArray: true,
  })
  products: ProducDto[];
}

export class FindAllOrdersDto {
  @ApiProperty({ description: 'Id do usuário' })
  userId: string;

  @ApiProperty({ description: 'Nome do usuário' })
  name: string;

  @ApiProperty({
    description: 'Lista de pedidos',
    type: OrderDto,
    isArray: true,
  })
  orders: OrderDto[];
}
