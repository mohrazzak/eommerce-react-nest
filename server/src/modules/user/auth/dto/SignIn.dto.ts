import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class SignInDTO {
  @IsString({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @IsString({ message: 'Password is required' })
  @Length(8, 16, {
    message: 'Password should be between 8 and 16 characters long.',
  })
  @Matches(/^(?=.*[a-z])/g, {
    message: 'Password should contain at least one lowercase letter.',
  })
  @Matches(/^(?=.*[A-Z])/g, {
    message: 'Password should contain at least one uppercase letter.',
  })
  @Matches(/^(?=.*\d)/g, {
    message: 'Password should contain at least one digit.',
  })
  password: string;
}
