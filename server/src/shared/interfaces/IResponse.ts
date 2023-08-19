import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class IResponse {
  @ApiProperty({ description: 'Response message', example: 'Request successful' })
  message: string;

  @ApiProperty({ description: 'Response data', example: {}, type: Object })
  data: unknown;

  @ApiProperty({ description: 'HTTP status code', example: HttpStatus.OK })
  statusCode: HttpStatus;
}
