import { User } from '@prisma/client';

export class UserEntity implements User {
  password: string;
  updatedAt: Date;
  createdAt: Date;
  email: string;
  id: string;
  name: string;
  imageURL: string;
  resetCode: string;
  isActive: boolean;
  isAdmin: boolean;
  phoneNumber: string;
}
