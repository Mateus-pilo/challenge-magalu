import { ProcessFileUseCase } from '@modules/order/application/use-cases/process-file.use-case';
import { Order } from '@modules/order/domain/entities/order.entity';
import { OrderRepository } from '@modules/order/domain/repositories/order.repository';
import { OrderFileParserService } from '@modules/order/domain/services/order-file-parse.service';
import { BadRequestException } from '@nestjs/common';

describe('ProcessFileUseCase', () => {
  let useCase: ProcessFileUseCase;
  let orderRepo: jest.Mocked<OrderRepository>;
  let parser: jest.Mocked<OrderFileParserService>;

  beforeEach(() => {
    orderRepo = {
      saveAll: jest.fn(),
    } as unknown as jest.Mocked<OrderRepository>;

    parser = {
      parse: jest.fn(),
    } as unknown as jest.Mocked<OrderFileParserService>;

    useCase = new ProcessFileUseCase(orderRepo, parser);
  });

  it('should parse the file and save orders successfully', () => {
    const mockFile = {
      buffer: Buffer.from('mock file content'),
    } as Express.Multer.File;

    const mockParsedOrders = {
      success: true,
      data: [
        {
          id: '1',
          items: [{ productId: '1', price: '100' }],
          date: '20200201',
          user: { id: '100', name: 'teste' },
        },
      ] as unknown as Order[],
    };

    parser.parse.mockReturnValue(mockParsedOrders);

    useCase.execute(mockFile);

    expect(parser.parse).toHaveBeenCalledTimes(1);
    expect(parser.parse).toHaveBeenCalledWith(mockFile.buffer);
    expect(orderRepo.saveAll).toHaveBeenCalledTimes(1);
    expect(orderRepo.saveAll).toHaveBeenCalledWith(mockParsedOrders.data);
  });

  it('should throw BadRequestException when parser fails', () => {
    const mockFile = {
      buffer: Buffer.from('invalid file content'),
    } as Express.Multer.File;

    parser.parse.mockReturnValue({ success: false, data: undefined });

    expect(() => useCase.execute(mockFile)).toThrow(BadRequestException);
    expect(() => useCase.execute(mockFile)).toThrow(
      'Falha ao processar arquivo',
    );
    expect(parser.parse).toHaveBeenCalledWith(mockFile.buffer);
    expect(orderRepo.saveAll).not.toHaveBeenCalled();
  });

  it('should save empty list if parser returns success with no data', () => {
    const mockFile = {
      buffer: Buffer.from('empty content'),
    } as Express.Multer.File;

    parser.parse.mockReturnValue({ success: true, data: undefined });

    useCase.execute(mockFile);

    expect(parser.parse).toHaveBeenCalledWith(mockFile.buffer);
    expect(orderRepo.saveAll).toHaveBeenCalledWith([]);
  });
});
