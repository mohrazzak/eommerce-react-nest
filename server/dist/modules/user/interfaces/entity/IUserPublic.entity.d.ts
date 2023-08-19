import { User } from '@prisma/client';
export declare class IUserPublic implements Omit<User, 'password'> {
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
