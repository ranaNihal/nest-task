import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MyLogger } from './loggers/loggers.service';
import { SendGridService, TwilioService } from './sms/sms.service';
import { HelpersService } from './helpers/helpers.service';
import { DevicetokenModule } from './deviceTokens/deviceToken,module';
import { dbConnection } from './db/mysqlConnection';

@Module({
  imports: [dbConnection, UserModule, DevicetokenModule],
  controllers: [AppController],
  providers: [AppService, MyLogger, TwilioService, SendGridService, HelpersService],
})

export class AppModule {}
