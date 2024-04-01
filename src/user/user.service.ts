import { Injectable, Request } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { hash, compare } from 'bcryptjs';
import { SendGridService, TwilioService } from '../sms/sms.service';
import { JwtService } from '@nestjs/jwt';
import { HelpersService } from 'src/helpers/helpers.service';
import { DeviceToken } from 'src/deviceTokens/entities/deviceToken.entity';
import { MyLogger } from '../loggers/loggers.service';

@Injectable()
export class UserService {
  private readonly logger = new MyLogger(UserService.name);
  constructor(
    @InjectModel(User)
    @InjectModel(DeviceToken) 
    private userModel: typeof User,
    private jwtService: JwtService,
    private twilio: TwilioService,
    private sendGrid: SendGridService,
    private helper: HelpersService,

  ) {}
  async generateAccessToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET_KEY, expiresIn: '1h' }); // Set access token expiration time
  }

  async generateRefreshToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET_KEY, expiresIn: '7d' }); // Set refresh token expiration time
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    const payload = this.jwtService.verify(refreshToken,  {
      secret: process.env.JWT_SECRET_KEY
    });
    delete payload.exp;
    return await this.generateAccessToken(payload);
  }
  
  async signUp(UserDto) {
    try {
      const user = await this.userModel.findOne({
        where: {
          email: UserDto.email
        }
      });
      if (user) throw 'email already exist'
      let otp = 1111
      const MINUTES = 5 * 60 // convert to second
      const CURRENT_TIME = Math.floor(new Date().getTime() / 1000)
      let otp_expire_time = CURRENT_TIME + MINUTES
      // this.twilio.sendSMS(process.env.TWILIO_PHONE, UserDto.phome_number, otp) // send otp by twilio
      this.sendGrid.sendSMS(UserDto.email, otp) // send otp by sendgrid
      UserDto.otp = otp
      UserDto.is_otp_verify = false
      UserDto.is2fa = true
      UserDto.otp_expire_time = otp_expire_time
      UserDto.password = await hash(UserDto.password, 10);
      const saveuser = new User(UserDto);
      const data = await saveuser.save();

      let save = {
        user_id: user.id,
        device_doken: UserDto.device_doken
      }
      const saveDeviceToken = new DeviceToken(save)
      await saveDeviceToken.save();
      return this.helper.SuccessResponce('successfully registred', data)
    } catch (error) {
      this.logger.error(`Error fetching ${error}`);
      return this.helper.ErrorResponce(error);
    }
  }

  async verifyOtp(req) {
    try {
      const user = await this.userModel.findOne({
        attributes:['id','email', 'name','phone_number', 'is_otp_verify','is2fa'],
        where: {
          email: req.body.email,
          otp: req.body.otp
        },
        raw: true
      });
      if (!user) throw 'Invalid otp'
      const CURRENT_TIME = Math.floor(new Date().getTime() / 1000)

      if (CURRENT_TIME > user.otp_expire_time) throw 'Your otp is expired'
      await User.update({ otp: 0, is_otp_verify: true },
        { where: { id: user.id } })

        let access_token = await this.generateAccessToken(user)
        let refresh_token = await this.generateRefreshToken(user)
      return this.helper.SuccessResponce('VerifyOtp successfull', {user, access_token, refresh_token})
    }
    catch (error) {
      this.logger.error(`Error fetching ${error}`);
      return this.helper.ErrorResponce(error);
    }
  }

  async refreshToken(req) {
    let { refreshToken } = req.body
    let token = await this.refreshAccessToken(refreshToken)
    return { token }
  }

  async login(UserDto) {
    try {
      const user = await this.userModel.findOne({
        where: {
          email: UserDto.email
        },
        raw: true
      });

      if (!user) throw 'Invalid email and password'

      // compare password (login)
      if (!await compare(UserDto.password, user.password)) throw 'Invalid email and password'

      if (user.is2fa) return this.helper.sendOtp(user)
      
      let access_token = await this.generateAccessToken(user)
      let refresh_token = await this.generateRefreshToken(user)

      return this.helper.SuccessResponce('successfully logins', {user, access_token, refresh_token})
    }
    catch (error) {
      this.logger.error(`Error fetching ${error}`);
      return this.helper.ErrorResponce(error);
    }
  }

  async findAll() {
    this.logger.log(`Fetching user $`);
    try {
      const users = await this.userModel.findAll();
      return this.helper.SuccessResponce('user get successfully ',users)
    } catch (error) {
      this.logger.error(`Error fetching user ${error.message}`);

      throw this.helper.ErrorResponce(error);
    }
  }
}
