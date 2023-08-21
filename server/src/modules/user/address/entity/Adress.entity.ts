import { Address } from '@prisma/client';

export class AddressEntity implements Address {
  name: string;
  id: number;
  addressLine1: string;
  addressLine2: string;
  phoneNumber: string;
  addressName: string;
  email: string;
  country: string;
  state: string;
  postalCode: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
