import { HttpStatus } from '@nestjs/common';
export declare class IResponse {
    message: string;
    data: unknown;
    statusCode: HttpStatus;
}
