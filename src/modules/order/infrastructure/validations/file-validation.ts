import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(value: File) {
    if (!value || value.size <= 0) {
      throw new BadRequestException(`Arquivo não recebido !`);
    }
    return value;
  }
}
