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
import { IUserPublic, IUserResponse } from './interfaces';
import { AuthGuard, IAuthRequest } from 'src/shared';
import { UpdateUserDTO, UpdateUserPasswordDTO, DeleteUserDTO } from './dto';
import { AuthService } from './auth/auth.service';
import { UploadService } from '../upload/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from 'src/shared/pipes/FileValidationPipe';
import { ApiAcceptedResponse, ApiBearerAuth, ApiOperation, ApiResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly uploadService: UploadService,
  ) {}

  @Get('/me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user information' }) // Provide a summary for the operation
  @ApiResponse({ status: HttpStatus.OK, description: 'User fetched successfully', type: IUserResponse }) // Describe the response type
  async getMe(@Req() req: IAuthRequest): Promise<IUserResponse> {
    const user = await this.userService.getUserByIdPublic(req.user.id);
    if (!user) throw new NotFoundException('User not found');

    return {
      data: { user },
      message: 'User fetched successfully',
      statusCode: HttpStatus.OK,
    };
  }

  @Delete()
  @UseGuards(AuthGuard)
  async DeleteUser(@Body() dto: DeleteUserDTO, @Req() req: IAuthRequest): Promise<IUserResponse> {
    const user = await this.userService.deleteUserById(dto, req.user.id);

    return {
      data: { user },
      message: 'User deleted Successfully',
      statusCode: HttpStatus.OK,
    };
  }

  @UseInterceptors(FileInterceptor('imageURL'))
  @Put()
  @UseGuards(AuthGuard)
  async updateUser(
    @Req() req: IAuthRequest,
    @Body() dto: UpdateUserDTO,
    @UploadedFile(FileValidationPipe)
    image: Express.Multer.File,
  ): Promise<IUserResponse> {
    const user = await this.userService.updateUser(dto, req.user.id, image);

    return {
      data: { user },
      message: 'User updated Successfully',
      statusCode: HttpStatus.OK,
    };
  }

  @Patch('/update-password')
  @UseGuards(AuthGuard)
  async updateUserPassword(@Req() req: IAuthRequest, @Body() dto: UpdateUserPasswordDTO): Promise<IUserResponse> {
    const user = await this.userService.updatePassword(dto, req.user.id);

    return {
      data: { user },
      message: 'User updated Successfully',
      statusCode: HttpStatus.OK,
    };
  }

  @Patch('/update-password')
  @UseGuards(AuthGuard)
  async updateImage(@Req() req: IAuthRequest, @Body() dto: UpdateUserPasswordDTO): Promise<IUserResponse> {
    const user = await this.userService.updatePassword(dto, req.user.id);
    return {
      data: { user },
      message: 'User updated Successfully',
      statusCode: HttpStatus.OK,
    };
  }

  @UseInterceptors(FileInterceptor('image'))
  @Patch('image')
  @UseGuards(AuthGuard)
  async uploadFile(
    @Req() req: IAuthRequest,
    @UploadedFile(FileValidationPipe)
    image: Express.Multer.File,
  ): Promise<IUserResponse> {
    const user = await this.userService.updateUserImage(req.user.id, image);

    return { data: { user }, message: 'User Image updated Successfully', statusCode: HttpStatus.OK };
  }
}
