import { IsEmail, IsNotEmpty } from 'class-validator';
export class UserDto {
name: string;

@IsEmail()
email: string

password: string

phome_number: string

token: string

device_token: string
}
