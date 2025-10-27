import { ProcessFileUseCase } from '@modules/order/application/use-cases/process-file.use-case';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileValidationPipe } from '../validations/file-validation';
import { FindAllOrdersUseCase } from '@modules/order/application/use-cases/find-all-orders.user-case';
import { FindAllOrdersDto } from '@modules/order/application/dto/find-all-orders.dto';
import { QueryOrderDto } from '@modules/order/application/dto/query-orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly processFileUseCase: ProcessFileUseCase,
    private readonly findAllOrders: FindAllOrdersUseCase,
  ) {}

  @Post('process-file')
  @ApiResponse({
    status: 204,
  })
  @ApiOperation({
    description: 'Upload a file of orders',
    summary: 'When you want to load an order file',
  })
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.NO_CONTENT)
  processFile(
    @UploadedFile(new FileValidationPipe())
    file: Express.Multer.File,
  ) {
    this.processFileUseCase.execute(file);
  }

  @Get('')
  @ApiResponse({
    status: 204,
    type: [FindAllOrdersDto],
  })
  @ApiOperation({
    description: 'Get all orders',
    summary: 'When you want to catch all orders',
  })
  getAll(@Query() query: QueryOrderDto): FindAllOrdersDto[] {
    return this.findAllOrders.execute(query);
  }
}
