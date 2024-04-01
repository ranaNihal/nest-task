import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DeviceToken } from './entities/deviceToken.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    SequelizeModule.forFeature([DeviceToken])
  ],
  controllers: [],
  providers: [],
})

export class DevicetokenModule { }
