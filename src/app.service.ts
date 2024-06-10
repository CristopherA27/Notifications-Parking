import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { text } from 'stream/consumers';
import { UserEmail} from './interfaces/userEmail';
import { EmailsService } from './emails/emails.service';

@Injectable()
export class AppService {
  constructor(private emailService : EmailsService) {}

  async sendEmail(dataEmail : UserEmail){
    try{
      await this.emailService.sendEmailInformation(dataEmail.name, dataEmail.email, dataEmail.amount, dataEmail.status, dataEmail.timeDuration);
      return 'Correo enviado';
    }catch(error){
      console.log('Error al enviar el correo a ${to}', error);
      throw new Error('Error al enviar el correo');
    }
  }
}
