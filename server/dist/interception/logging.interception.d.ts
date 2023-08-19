import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
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
export declare class ErrorInterceptor implements NestInterceptor {
    private readonly logger;
    auditError({ errorId, stack, userId, body, description, message, statusCode, url, logFileName }: auditPops): void;
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown>;
}
export {};
