import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailsModule } from './emails/emails.module';
import { AppService } from './app.service';
import { EmailsService } from './emails/emails.service';

@Module({
  imports: [EmailsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [ AppService], 
})
export class AppModule {}
