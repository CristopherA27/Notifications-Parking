import { Body, Controller, Get, Post } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserEmail } from './interfaces/userEmail';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService : AppService) {}

  //@GrpcMethod('AppService', 'postEmail')
  @Post('sendEmail')
  async postEmail(@Body() user: UserEmail) {
    try {
      console.log(user)
      return this.appService.sendEmail(user);
    }
    catch(error){
      return 'Error al enviar el correo';
    }
  }
}
