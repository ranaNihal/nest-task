import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost' || process.env.host,
            port: 5432,
            // username: process.env.username,
            // password: process.env.password,
            database: process.env.database,
            synchronize: false,
        })]
})

export class dbConnection { }
