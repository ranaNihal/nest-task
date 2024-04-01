import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from 'src/app.service';
import { SendGridService, TwilioService } from '../sms/sms.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { HelpersService } from 'src/helpers/helpers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
require("dotenv").config();

@Module({
  imports: [
   SequelizeModule.forFeature([User]),
    // TypeOrmModule.forFeature([User]),
    // JwtModule.register({
    //   // global: true,
    //   secret: process.env.JWT_SECRET_KEY,
    //   signOptions: { expiresIn: 6000 },
    // })
  ],
  controllers: [UserController],
  providers: [UserService, AppService, JwtModule, TwilioService, SendGridService, JwtService, HelpersService],
 // exports: [UserService]
})
export class UserModule { }
