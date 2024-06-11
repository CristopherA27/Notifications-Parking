import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { join } from 'path';

async function bootstrap() {
   /*const app = await NestFactory.create(AppModule);
  await app.listen(3000);*/
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051',
      package: 'notifications',
      protoPath: join(__dirname,  '../src/emails/emails.proto'),
    },
  });
  await app.listen();
}
bootstrap();
