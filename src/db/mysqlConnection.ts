import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: process.env.host,
            port: 3306,
            username: process.env.username,
            password: process.env.password,
            database: process.env.database,
            autoLoadModels: true,
            synchronize: false,
        })]
})

export class dbConnection { }
