import { Table, Column, Model } from 'sequelize-typescript';
// import { BeforeInsert, BaseEntity ,Column} from 'typeorm'
import { hash, compare } from 'bcryptjs';

// @Entity()
@Table
export class User extends Model<User> {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  phone_number: string;

  @Column
  otp: number;

  @Column
  otp_expire_time: number;

  @Column
  is_otp_verify: boolean;

  @Column
  is2fa: boolean;

}
