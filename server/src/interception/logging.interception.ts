import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, Logger } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { v4 as genUniqueId } from 'uuid';
import * as fs from 'fs';
import { format } from 'date-fns';
import { IAuthRequest } from '../shared';

interface ErrorResponse {
  statusCode: number;
  message: string;
  error: {
    errorId: string;
    stack: string;
    cause?: string;
    description?: string;
  };
}

interface auditPops {
  errorId: string;
  stack: string;
  userId: string;
  url: string;
  body: unknown;
  statusCode: number;
  message: string;
  description: string;
  logFileName: string;
}

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ErrorInterceptor.name);

  auditError({ errorId, stack, userId, body, description, message, statusCode, url, logFileName }: auditPops): void {
    const timestamp = format(new Date(), 'yyyy-mm-dd:hh:mm:ss');

    const logMessage =
      `[${timestamp}] [Error Audit] Error ID: ${errorId}\n` +
      `URL: ${url}\n` +
      `User ID: ${userId || 'N/A'}\n` +
      `Request Body: ${JSON.stringify(body)}\n` +
      `StatusCode: ${statusCode}\n` +
      `Message: ${message}\n` +
      `Description: ${description || 'N/A'}\n` +
      `Stack Trace: ${stack}\n` +
      '\n----------------------------------------\n';

    fs.appendFile(`logs/${logFileName}.log`, logMessage, (err) => {
      if (err) this.logger.error(`Error writing to error log: ${err}`);
    });
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((error) => {
        const statusCode = error instanceof HttpException ? error.getStatus() : 500;
        const message = error.message || 'Internal server error';

        console.error(error);
        const errorId = genUniqueId();

        const req = context.switchToHttp().getRequest<IAuthRequest>();
        const url = req.url;
        const body = req.body;
        const userId = req?.user?.id;

        const stack = error.stack;
        const description = error?.options?.description;

        const errorDetails = {
          errorId,
          stack: '',
          description,
        };

        if (process.env.NODE_ENV !== 'production') errorDetails.stack = stack;

        const errorResponse: ErrorResponse = {
          statusCode,
          message,
          error: errorDetails,
        };

        const logFileName = statusCode === 500 || statusCode === 503 ? 'important-errors' : 'regular-errors';
        this.auditError({ body, description, errorId, message, stack, statusCode, url, userId, logFileName });

        return throwError(() => new HttpException(errorResponse, statusCode));
      }),
    );
  }
}
