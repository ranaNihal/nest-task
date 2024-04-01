import { Table, Column, Model } from 'sequelize-typescript';

// @Entity()
@Table
export class DeviceToken extends Model {
  @Column
  user_id: number;

  @Column
  device_token:string

  @Column
  status: boolean
}