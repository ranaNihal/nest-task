import { Injectable } from '@nestjs/common';
import { SendGridService } from 'src/sms/sms.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class HelpersService {
constructor(
  private readonly sendGrid: SendGridService
){}
    async sendOtp(user) {
        let otp = 1111
        const MINUTES = 5 * 60 // convert to second
        const CURRENT_TIME = Math.floor(new Date().getTime()/1000)
        let otp_expire_time = CURRENT_TIME + MINUTES
        let updatedData = {
          otp,
          otp_expire_time,
          is_otp_verify: false
        }
        
        await User.update(updatedData, {
          where: { id: user.id }
        });
        //this.sendGrid.sendSMS(user.email, otp) // send otp by sendgrid

        return this.SuccessResponce('otp send successfully',{})
      }

      ErrorResponce(message) { return { success: false, code: 400, message } }
    
      SuccessResponce(message, data) {
        return {
          success: true,
          code: 200,
          message,
          data
        }
      }
}
