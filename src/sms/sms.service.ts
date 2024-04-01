import * as twilio from 'twilio';
import { Injectable, Logger } from '@nestjs/common';
import TwilioClient from 'twilio/lib/rest/Twilio';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class TwilioService {
  twilioClient: TwilioClient;

  logger = new Logger(TwilioService.name);

  constructor() {

    this.twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  // Define methods to interact with Twilio API
  // For example, sending an SMS
  async sendSMS(from: string, to: string, otp: number): Promise<void> {
    try {
      await this.twilioClient.messages.create({ to, body: 'otp is: ' + otp, from });

    } catch (error) {
      this.logger.error(`Error fetching ${error}`);

    }
  }
}

export class SendGridService {
  logger = new Logger(SendGridService.name);

  constructor() {
    SendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendSMS(email: string, otp: number) {
    try {
      const mail = {
        to: email,
        subject: 'Nest js signup verification',
        from: process.env.SENDGRID_EMAIL, // Fill it with your validated email on SendGrid account
        text: 'Sendgrid',
        html: 'Hello from sendgrid your otp is: '+ otp,
      };
      const transport = await SendGrid.send(mail);
      
//      return transport;
    } catch (error) {
      this.logger.error(`Error fetching ${error}`);

    }

  }
}