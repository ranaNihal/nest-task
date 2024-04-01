import { Controller, Get, Post, Body, Patch, Param, Delete, LoggerService, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { VerifyToken } from 'src/middlewares/jwt.middleware';
import { MessagePattern } from '@nestjs/microservices';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  signUp(@Body() UserDto: UserDto) {
    return this.userService.signUp(UserDto);
  }

  @Post('/login')
  login(@Body() UserDto: UserDto) {
    return this.userService.login(UserDto);
  }

  @Post('/verify-otp')
  verifyOtp(@Request() req) {
    return this.userService.verifyOtp(req);
  }

  @Get('/refresh-token')
  refreshToken(@Request() req) {
    return this.userService.refreshToken(req);
  }

  @MessagePattern()
  @UseGuards(VerifyToken)
  @Get('')
  findAll() {
    return this.userService.findAll();
  }

}
