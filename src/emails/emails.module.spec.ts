import { Test, TestingModule } from '@nestjs/testing';
import { EmailsModule } from './emails.module';

describe('EmailsModule', () => {
  let emailsModule: EmailsModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EmailsModule],
    }).compile();

    emailsModule = module.get<EmailsModule>(EmailsModule);
  });

  it('should be defined', () => {
    expect(emailsModule).toBeDefined();
  });
});
