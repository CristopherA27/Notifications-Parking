import { Body, Controller, Get, Post } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserEmail } from './interfaces/userEmail';
import { EmailsService } from './emails/emails.service';
import { NotificationRequest, NotificationResponse } from './emails/emails.pb';//

@Controller()
export class AppController {
  constructor(
    private readonly emailService : EmailsService
  ) {}

  @GrpcMethod('EmailsService', 'sendEmailInformation')
  //@Post('sendEmail')
  async postEmail(request: NotificationRequest ): Promise<NotificationResponse>  {
    return this.emailService.sendEmailInformation(request);
  }
 
}
