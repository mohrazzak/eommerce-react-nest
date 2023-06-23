import { HttpException, Logger } from '@nestjs/common';

export function handleException(error: HttpException | Error, message: string) {
  const status = error instanceof HttpException ? error.getStatus() : 500;
  const description = error.message;
  throw new HttpException(message, status, { description });
}
