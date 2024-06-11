import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { NotificationRequest, NotificationResponse } from './emails.pb';//


@Injectable()
export class EmailsService {

  constructor(private readonly mailerService: MailerService
  ) {}
  //public async sendEmailInformation(name: string, email: string,amount: number,status: string,timeDuration: number) {
  public async sendEmailInformation(request: NotificationRequest): Promise<NotificationResponse> {
    const { name, email, amount, status, timeDuration } = request;
    const convertedHours = this.convertMinutesToHoursMinutes(timeDuration);
    const formattedAmount = this.formatCurrencyCLP(amount);
    try{
      await this.mailerService.sendMail({
        to: email,
        subject: 'Información de Pago del Parking',
        template : './paymentInfo',
        context: {
            name: name,
            amount : formattedAmount,
            date: new Date().toLocaleString(),  
            status : status,
            timeDuration : convertedHours
        },
      });
      return { success: true, message: 'Correo enviado con éxito' };
    }catch(error){
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
  


