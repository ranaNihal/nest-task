import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()

export class AuthService {
  constructor(public client: ClientProxy ){
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options:{
        host: 'localhost',
        port: 3000
      }
    })
  }

  signUp(createAuthDto: CreateAuthDto) {

    return 'This action adds a new auth';
  }
}
