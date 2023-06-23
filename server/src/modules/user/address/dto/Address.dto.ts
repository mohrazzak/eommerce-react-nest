import { IsEmail, IsString } from 'class-validator';

export class AddressDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  addressLine1: string;

  @IsString()
  addressLine2?: string;

  @IsString()
  state: string;

  @IsString()
  country: string;

  @IsString()
  postalCode: string;

  @IsString()
  addressName: string;
}
