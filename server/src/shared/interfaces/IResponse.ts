import { HttpStatus } from '@nestjs/common';

export interface IResponse {
  message: string;
  data: object;
  statusCode: HttpStatus;
}
