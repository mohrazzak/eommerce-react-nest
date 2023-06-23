import { BadRequestException, Body, Controller, HttpCode, HttpStatus, NotFoundException, Post, Put } from '@nestjs/common';
import { ISignInResponse, IAuthResponse } from './interfaces';
import { ActivateDTO, ResetPasswordConfirmationDTO, ResetPasswordDTO, SignInDTO, SignUpDTO } from './dto';
import { AuthService } from './auth.service';
import { UserService } from 'src/modules/user/user.service';
import { exclude } from 'src/shared';
import { User } from '@prisma/client';
import { IUserPublic } from 'src/modules/user/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Post('/signup')
  async signup(@Body() dto: SignUpDTO): Promise<IAuthResponse> {
    const userExists = await this.userService.getUserByEmail(dto.email);
    if (userExists) throw new BadRequestException('User already exists');
    const user = await this.authService.signUp(dto);

    const activationToken = await this.authService.genToken({
      email: user.email,
      id: user.id,
      name: user.name,
      isActive: user.isActive,
    });

    await this.authService.sendActivateEmail(user.email, activationToken);

    const userWithoutPassword = exclude<User, keyof User>(user, ['password']) as IUserPublic;

    return {
      data: { user: userWithoutPassword },
      message: 'Confirmation email sent to your mail',
      statusCode: HttpStatus.CREATED,
    };
  }

  @Post('/activate')
  async activate(@Body() dto: ActivateDTO): Promise<IAuthResponse> {
    const { email } = await this.authService.verifyToken(dto.activateToken);

    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    if (user.isActive) throw new BadRequestException('User is already active');

    await this.authService.activate(email);

    const userWithoutPassword = exclude<User, keyof User>(user, ['password']) as IUserPublic;

    return {
      message: 'User activated, You can now login',
      data: { user: userWithoutPassword },
      statusCode: HttpStatus.OK,
    };
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() dto: SignInDTO): Promise<ISignInResponse> {
    const user = await this.userService.getUserByEmail(dto.email);
    if (!user) throw new NotFoundException('User not found');

    const passwordValid = await this.authService.passwordValid(user.password, dto.password);
    if (!passwordValid) throw new BadRequestException('Password invalid');

    if (!user.isActive) throw new BadRequestException('User is not active');

    const accessToken = await this.authService.genToken({
      id: user.id,
      email: user.email,
      name: user.name,
      isActive: user.isActive,
    });

    const userWithoutPassword = exclude<User, keyof User>(user, ['password']) as IUserPublic;

    return {
      data: {
        user: userWithoutPassword,
        accessToken,
      },
      message: 'Signed in successfully',
      statusCode: HttpStatus.OK,
    };
  }

  @Post('/reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() dto: ResetPasswordDTO): Promise<IAuthResponse> {
    const user = await this.userService.getUserByEmail(dto.email);
    if (!user) throw new NotFoundException('User not found');

    const resetToken = await this.authService.genToken({
      email: user.email,
      id: user.id,
      name: user.name,
      isActive: user.isActive,
    });

    await this.authService.sendResetPasswordEmail(user.email, resetToken);

    await this.authService.updateResetCode(resetToken, user.email);

    const userWithoutPassword = exclude<User, keyof User>(user, ['password']) as IUserPublic;

    return {
      message: 'Confirmation email sent to your mail',
      data: { user: userWithoutPassword },
      statusCode: HttpStatus.OK,
    };
  }

  @Put('/reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPasswordConfirmation(@Body() dto: ResetPasswordConfirmationDTO): Promise<IAuthResponse> {
    const decodedToken = await this.authService.verifyToken(dto.resetToken);

    const user = await this.userService.getUserByEmail(decodedToken.email);
    if (!user) throw new NotFoundException('User not found');

    const userRequestedReset = user.resetCode === dto.resetToken;
    if (!userRequestedReset) throw new BadRequestException('Invalid token');

    await this.authService.changePassword(user.email, dto.password);

    await this.authService.updateResetCode(null, user.email);

    const userWithoutPassword = (await exclude<User, keyof User>(user, ['password'])) as IUserPublic;

    return {
      message: 'Password changed',
      data: { user: userWithoutPassword },
      statusCode: HttpStatus.OK,
    };
  }
}
