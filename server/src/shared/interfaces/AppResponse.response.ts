import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiUnauthorizedResponse({
  description: 'Not authenticated Error',
  type: ErrorResponse,
})
export class ErrorResponse {
  @ApiProperty({ description: 'Response message', example: 'Request successful' })
  message: string;

  @ApiProperty({ description: 'Response data', type: Object })
  error: string;

  @ApiProperty({ description: 'HTTP status code', example: HttpStatus.OK })
  statusCode: HttpStatus;
}

export class AppResponse {
  @ApiProperty({ description: 'Response message', example: 'Request successful' })
  message: string;

  @ApiProperty({ description: 'Response data', type: Object })
  data: unknown;

  @ApiProperty({ description: 'HTTP status code', example: HttpStatus.OK })
  statusCode: HttpStatus;
}
