import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailsService {

  constructor(private readonly mailerService: MailerService) {}
  
  async sendEmailInformation(name: string, email: string,amount: number,status: string,timeDuration: number) {
    const convertedHours = this.convertMinutesToHoursMinutes(timeDuration);
    const formattedAmount = this.formatCurrencyCLP(amount);

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
  }
  private convertMinutesToHoursMinutes(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} horas ${mins} minutos`;
  }
  private formatCurrencyCLP(amount: number): string {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
  }
  /*
  async sendEmailInformation(name: string, email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Información de Pago del Parking',
      template : './paymentInfo',
      context: {
          name: name,
          amount : 100,
          date : new Date(),
          timeDuration : 50
      },
      
    });*/
  
}
  


