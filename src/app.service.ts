import { Injectable } from '@nestjs/common';
import { TwilioService } from 'nestjs-twilio';

@Injectable()
export class AppService {
  // public constructor(private readonly twilioService: TwilioService) {}

  getHello(): string {
    return 'Hello World!';
  }
  
}
