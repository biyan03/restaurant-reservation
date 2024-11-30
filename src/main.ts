import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Get timezone from .env file using ConfigService
  const configService = app.get(ConfigService);
  const timezone = configService.get<string>('TIMEZONE') || 'UTC'; // Default to UTC if not set

  // Set default timezone
  process.env.TZ = timezone;

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Restaurant Booking API')
    .setDescription('API documentation for the restaurant booking reservation system')
    .setVersion('1.0')
    .addTag('Customer')
    .addTag('Table')
    .addTag('Restaurant Hours')
    .addTag('Reservations')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
