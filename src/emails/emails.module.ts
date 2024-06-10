import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [ConfigModule.forRoot({
        isGlobal: true,
    }),
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({ 
        transport: {
          host: process.env.EMAIL_HOST,
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        },
        defaults: {
          from: `"PARKING PAYMENT" <${process.env.EMAIL_FROM}`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService], 
    }),
  ],
  controllers: [],
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}
