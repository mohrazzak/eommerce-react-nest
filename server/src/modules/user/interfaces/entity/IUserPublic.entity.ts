import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class IUserPublic implements Omit<User, 'password'> {
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  email: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  imageURL: string;
  @ApiProperty()
  resetCode: string;
  @ApiProperty()
  isActive: boolean;
  @ApiProperty()
  isAdmin: boolean;
  @ApiProperty()
  phoneNumber: string;
}
