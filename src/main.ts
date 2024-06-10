import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
import { join } from 'path';



async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  /*
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport : Transport.GRPC,
    options : {
      url : '0.0.0.0:50051',
      package : 'mailService',
      protoPath : join(__dirname, 'app.proto'),
    }

  });
  await app.listen();*/
  await app.listen(3000);
}
bootstrap();
