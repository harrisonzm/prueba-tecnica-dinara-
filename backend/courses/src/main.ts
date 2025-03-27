import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { envs } from './config';

async function bootstrap() {
  console.log('Listening on port:', envs.port ?? 'no hay');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: envs.port,
        host: envs.host,
      },
    },
  );

  // Configurar globalmente los pipes de validación
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en los DTOs
      forbidNonWhitelisted: true, // Lanza error si se envían propiedades desconocidas
      transform: true, // Convierte los tipos automáticamente (por ejemplo, string a Date)
    }),
  );

  await app.listen();
  console.log('Course Microservice is running on port:', envs.port);
}
bootstrap();
