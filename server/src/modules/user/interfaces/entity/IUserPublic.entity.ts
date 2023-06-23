import { User } from '@prisma/client';

export interface IUserPublic extends Omit<User, 'password'> {}
