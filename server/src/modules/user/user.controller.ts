import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  UseGuards,
  Req,
  Put,
  Body,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponse } from './interfaces';
import { AuthGuard, IAuthRequest } from '../../shared';
import { UpdateUserDTO, UpdateUserPasswordDTO, DeleteUserDTO, UpdateUserImageDTO } from './dto';
import { AuthService } from './auth/auth.service';
import { UploadService } from '../upload/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from '../../shared/pipes/FileValidationPipe';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly uploadService: UploadService,
  ) {}

  @Get('/me')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get current user information' })
  @ApiOkResponse({ description: 'User fetched successfully', type: UserResponse })
  async getMe(@Req() req: IAuthRequest): Promise<UserResponse> {
    const user = await this.userService.getUserByIdPublic(req.user.id);
    if (!user) throw new NotFoundException('User not found');

    return {
      data: { user },
      message: 'User fetched successfully',
      statusCode: HttpStatus.OK,
    };
  }

  @UseInterceptors(FileInterceptor('imageURL'))
  @Put()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update user profile' })
  @ApiOkResponse({ description: 'User profile updated successfully', type: UserResponse })
  async updateUser(
    @Req() req: IAuthRequest,
    @Body() dto: UpdateUserDTO,
    @UploadedFile(FileValidationPipe)
    image: Express.Multer.File,
  ): Promise<UserResponse> {
    const user = await this.userService.updateUser(dto, req.user.id, image);

    return {
      data: { user },
      message: 'User profile updated successfully',
      statusCode: HttpStatus.OK,
    };
  }

  @Patch('/update-password')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update user password' })
  @ApiOkResponse({ description: 'Password updated successfully', type: UserResponse })
  async updateUserPassword(@Req() req: IAuthRequest, @Body() dto: UpdateUserPasswordDTO): Promise<UserResponse> {
    const user = await this.userService.updatePassword(dto, req.user.id);

    return {
      data: { user },
      message: 'Password updated successfully',
      statusCode: HttpStatus.OK,
    };
  }

  @Patch('/update-image')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update user profile image' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'User image',
    type: UpdateUserImageDTO,
  })
  @ApiOkResponse({ description: 'User image updated successfully', type: UserResponse })
  @UseInterceptors(FileInterceptor('image'))
  async updateImage(
    @Req() req: IAuthRequest,
    @UploadedFile(FileValidationPipe)
    image: Express.Multer.File,
  ): Promise<UserResponse> {
    const user = await this.userService.updateUserImage(req.user.id, image);

    return {
      data: { user },
      message: 'User image updated successfully',
      statusCode: HttpStatus.OK,
    };
  }

  @Delete()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete user account' })
  @ApiOkResponse({ description: 'User deleted successfully', type: UserResponse })
  async deleteUser(@Body() dto: DeleteUserDTO, @Req() req: IAuthRequest): Promise<UserResponse> {
    const user = await this.userService.deleteUserById(dto, req.user.id);

    return {
      data: { user },
      message: 'User deleted successfully',
      statusCode: HttpStatus.OK,
    };
  }
}
