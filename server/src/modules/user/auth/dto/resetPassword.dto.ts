import { IsEmail, IsString } from 'class-validator';

export class ResetPasswordDTO {
  @IsString({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;
}
