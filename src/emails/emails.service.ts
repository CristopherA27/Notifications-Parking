import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { NotificationRequest, NotificationResponse } from './emails.pb';//


@Injectable()
export class EmailsService {

  constructor(private readonly mailerService: MailerService
  ) {}
  
  public async sendEmailInformation(request: NotificationRequest): Promise<NotificationResponse> {
    const { name, email, qrCode, checkoutUrl, dateHourStart, zoneName, patente } = request;
    console.log('Enviando correo');
    try{
      await this.mailerService.sendMail({
        to: email,
        subject: 'Información de Pago del Parking',
        template : './paymentInfo',
        context: {
            name: name,
            qrCode : qrCode.split("base64,")[1],
            checkoutUrl: checkoutUrl,
            date: dateHourStart,  
            zoneName : zoneName,
            patente : patente
        },
        attachments: [
          {
            filename: 'qrCode.png',
            content: qrCode.split("base64,")[1],
            encoding: 'base64',
            cid: 'qrCode',
          },
        ],
      });
      return { success: true, message: 'Correo enviado con éxito' };
    }catch(error){
      console.log(error);
      return { success: false, message: 'Error al enviar el correo' };
    }
  }

  private convertMinutesToHoursMinutes(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} horas ${mins} minutos`;
  }
  private formatCurrencyCLP(amount: number): string {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
  }
}
  


