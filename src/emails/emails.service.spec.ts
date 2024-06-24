import { Test, TestingModule } from '@nestjs/testing';
import { EmailsService } from './emails.service';
import { MailerService } from '@nestjs-modules/mailer';
import { NotificationRequest, NotificationResponse } from './emails.pb';

describe('EmailsService', () => {
  let service: EmailsService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const mockMailerService = {
      sendMail: jest.fn().mockResolvedValue(true),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailsService,
        {
          provide: MailerService,
          useValue: mockMailerService,
        },
      ],
    }).compile();

    service = module.get<EmailsService>(EmailsService);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send an email and return success response', async () => {
    const request: NotificationRequest = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
      checkoutUrl: 'http://example.com/checkout',
      dateHourStart: '2024-06-24T15:30:00Z',
      zoneName: 'Zone 1',
      patente: 'ABC1234',
    };

    const expectedResponse: NotificationResponse = {
      success: true,
      message: 'Correo enviado con éxito',
    };

    const result = await service.sendEmailInformation(request);

    expect(result).toEqual(expectedResponse);
    expect(mailerService.sendMail).toHaveBeenCalledWith({
      to: request.email,
      subject: 'Información de Pago del Parking',
      template: './paymentInfo',
      context: {
        name: request.name,
        qrCode: request.qrCode.split('base64,')[1],
        checkoutUrl: request.checkoutUrl,
        date: request.dateHourStart,
        zoneName: request.zoneName,
        patente: request.patente,
      },
      attachments: [
        {
          filename: 'qrCode.png',
          content: request.qrCode.split('base64,')[1],
          encoding: 'base64',
          cid: 'qrCode',
        },
      ],
    });
  });

  it('should return error response when sendMail throws an error', async () => {
    const request: NotificationRequest = {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
      checkoutUrl: 'http://example.com/checkout',
      dateHourStart: '2024-06-24T15:30:00Z',
      zoneName: 'Zone 2',
      patente: 'XYZ9876',
    };

    const expectedResponse: NotificationResponse = {
      success: false,
      message: 'Error al enviar el correo',
    };

    jest.spyOn(mailerService, 'sendMail').mockRejectedValueOnce(new Error('Send mail failed'));

    const result = await service.sendEmailInformation(request);

    expect(result).toEqual(expectedResponse);
    expect(mailerService.sendMail).toHaveBeenCalledWith({
      to: request.email,
      subject: 'Información de Pago del Parking',
      template: './paymentInfo',
      context: {
        name: request.name,
        qrCode: request.qrCode.split('base64,')[1],
        checkoutUrl: request.checkoutUrl,
        date: request.dateHourStart,
        zoneName: request.zoneName,
        patente: request.patente,
      },
      attachments: [
        {
          filename: 'qrCode.png',
          content: request.qrCode.split('base64,')[1],
          encoding: 'base64',
          cid: 'qrCode',
        },
      ],
    });
  });
});
