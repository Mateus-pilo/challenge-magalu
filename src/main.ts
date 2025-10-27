import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfigModule, SwaggerConfigService } from '@config/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v1', { exclude: ['health'] });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const swaggerModule = SwaggerConfigModule;
  const swaggerService = app.select(swaggerModule).get(SwaggerConfigService);
  swaggerService.setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
