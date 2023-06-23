import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class UpdateUserPasswordDTO {
  @IsString({ message: 'Old Password is required' })
  @Length(8, 16, {
    message: 'Old Password should be between 8 and 16 characters long.',
  })
  @Matches(/^(?=.*[a-z])/g, {
    message: 'Old Password should contain at least one lowercase letter.',
  })
  @Matches(/^(?=.*[A-Z])/g, {
    message: 'Old Password should contain at least one uppercase letter.',
  })
  @Matches(/^(?=.*\d)/g, {
    message: 'Old Password should contain at least one digit.',
  })
  oldPassword: string;

  @IsString({ message: 'New password is required' })
  @Length(8, 16, {
    message: 'New Password should be between 8 and 16 characters long.',
  })
  @Matches(/^(?=.*[a-z])/g, {
    message: 'New Password should contain at least one lowercase letter.',
  })
  @Matches(/^(?=.*[A-Z])/g, {
    message: 'New Password should contain at least one uppercase letter.',
  })
  @Matches(/^(?=.*\d)/g, {
    message: 'New Password should contain at least one digit.',
  })
  newPassword: string;
}
