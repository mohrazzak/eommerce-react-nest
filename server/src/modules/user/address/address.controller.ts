import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { AuthGuard, IAuthRequest } from '../../../shared';
import { IAddressResponse, IGetAllAddressesResponse } from './interface';
import { AddressDTO } from './dto';

@Controller('users/addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAllAddresses(@Req() req: IAuthRequest): Promise<IGetAllAddressesResponse> {
    const addresses = await this.addressService.getAllUserAddresses(req.user.id);
    return {
      message: 'Addresses fetched successfully',
      data: { addresses },
      statusCode: HttpStatus.OK,
    };
  }

  @Post()
  @UseGuards(AuthGuard)
  async addAddress(@Req() req: IAuthRequest, @Body() dto: AddressDTO): Promise<IAddressResponse> {
    const address = await this.addressService.addAddress(dto, req.user.id);
    return {
      message: 'Address added successfully',
      data: { address },
      statusCode: HttpStatus.OK,
    };
  }

  @Put(':addressId')
  @UseGuards(AuthGuard)
  async updateAddress(@Req() req: IAuthRequest, @Body() dto: AddressDTO, @Param('addressId') addressId: number): Promise<IAddressResponse> {
    const address = await this.addressService.updateAddress(dto, +addressId, req.user.id);
    return {
      message: 'Address updated successfully',
      data: { address },
      statusCode: HttpStatus.OK,
    };
  }

  @Delete(':addressId')
  @UseGuards(AuthGuard)
  async deleteAddress(@Req() req: IAuthRequest, @Param('addressId') addressId: number): Promise<IAddressResponse> {
    const address = await this.addressService.deleteAddress(+addressId, req.user.id);
    return {
      message: 'Address deleted successfully',
      data: { address },
      statusCode: HttpStatus.OK,
    };
  }

  @Patch(':addressId')
  @UseGuards(AuthGuard)
  async setDefaultAddress(@Req() req: IAuthRequest, @Param('addressId') addressId: number): Promise<IAddressResponse> {
    const address = await this.addressService.setDefaultAddress(req.user.id, +addressId);
    return {
      message: 'Address is now default',
      data: { address },
      statusCode: HttpStatus.OK,
    };
  }
}
