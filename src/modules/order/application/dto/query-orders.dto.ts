import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class QueryOrderDto {
  @ApiPropertyOptional({ description: 'Id do pedido' })
  @IsOptional()
  @IsString()
  orderId?: string;

  @ApiPropertyOptional({ description: 'Data inicial da busca', format: 'date' })
  @IsOptional()
  @MinLength(10, {
    message: 'Data inicial deve ser no formato (YYYY-MM-DD)',
  })
  @IsDateString(
    {},
    { message: 'Data inicial deve ser no formato (YYYY-MM-DD).' },
  )
  dateStart?: string;

  @ApiPropertyOptional({ description: 'Data final da busca', format: 'date' })
  @ValidateIf((o) => o.dateStart != undefined)
  @MinLength(10, {
    message: 'Data inicial deve ser no formato (YYYY-MM-DD)',
  })
  @IsDateString(
    {},
    { message: 'Data inicial deve ser no formato (YYYY-MM-DD).' },
  )
  @IsNotEmpty({ message: 'A data fim deve ser preenchida' })
  dateEnd?: string;
}
