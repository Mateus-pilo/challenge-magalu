import { Injectable } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

@Injectable()
export class SwaggerConfigService {
  constructor() {}

  setupSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('Challenge Magalu')
      .setDescription('Projeto criado para desafio técnico do magalu 🚀')
      .setVersion('1.0')
      .addApiKey(
        { type: 'apiKey', name: 'x-api-key', in: 'header' },
        'x-api-key',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }
}
