// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // Importe o ValidationPipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Configurar o ValidationPipe globalmente
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades que não estão no DTO
      forbidNonWhitelisted: true, // Lança erro se propriedades extras forem enviadas
      transform: true, // Transforma o payload para instâncias de DTOs (ex: string para number)
      transformOptions: {
        enableImplicitConversion: true, // Permite conversão implícita de tipos (útil para @Param e @Query)
      },
    }),
  );

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();