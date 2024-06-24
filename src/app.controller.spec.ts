import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { EmailsService } from './emails/emails.service';
import { NotificationRequest, NotificationResponse } from './emails/emails.pb';

describe('AppController', () => {
  let appController: AppController;
  let emailsService: EmailsService;

  beforeEach(async () => {
    const mockEmailsService = {
      sendEmailInformation: jest.fn((request: NotificationRequest) => {
        const response: NotificationResponse = {
          success: true,
          message: 'Correo enviado con éxito',
        };
        return response;
      }),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: EmailsService,
          useValue: mockEmailsService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    emailsService = app.get<EmailsService>(EmailsService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  it('should call sendEmailInformation method of EmailsService', async () => {
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

    const result = await appController.postEmail(request);

    expect(result).toEqual(expectedResponse);
    expect(emailsService.sendEmailInformation).toHaveBeenCalledWith(request);
  });
});
