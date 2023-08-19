"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ErrorInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const uuid_1 = require("uuid");
const fs = require("fs");
const date_fns_1 = require("date-fns");
let ErrorInterceptor = ErrorInterceptor_1 = class ErrorInterceptor {
    constructor() {
        this.logger = new common_1.Logger(ErrorInterceptor_1.name);
    }
    auditError({ errorId, stack, userId, body, description, message, statusCode, url, logFileName }) {
        const timestamp = (0, date_fns_1.format)(new Date(), 'yyyy-mm-dd:hh:mm:ss');
        const logMessage = `[${timestamp}] [Error Audit] Error ID: ${errorId}\n` +
            `URL: ${url}\n` +
            `User ID: ${userId || 'N/A'}\n` +
            `Request Body: ${JSON.stringify(body)}\n` +
            `StatusCode: ${statusCode}\n` +
            `Message: ${message}\n` +
            `Description: ${description || 'N/A'}\n` +
            `Stack Trace: ${stack}\n` +
            '\n----------------------------------------\n';
        fs.appendFile(`logs/${logFileName}.log`, logMessage, (err) => {
            if (err)
                this.logger.error(`Error writing to error log: ${err}`);
        });
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.catchError)((error) => {
            var _a, _b;
            const statusCode = error instanceof common_1.HttpException ? error.getStatus() : 500;
            const message = error.message || 'Internal server error';
            console.error(error);
            const errorId = (0, uuid_1.v4)();
            const req = context.switchToHttp().getRequest();
            const url = req.url;
            const body = req.body;
            const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
            const stack = error.stack;
            const description = (_b = error === null || error === void 0 ? void 0 : error.options) === null || _b === void 0 ? void 0 : _b.description;
            const errorDetails = {
                errorId,
                stack: '',
                description,
            };
            if (process.env.NODE_ENV !== 'production')
                errorDetails.stack = stack;
            const errorResponse = {
                statusCode,
                message,
                error: errorDetails,
            };
            const logFileName = statusCode === 500 || statusCode === 503 ? 'important-errors' : 'regular-errors';
            this.auditError({ body, description, errorId, message, stack, statusCode, url, userId, logFileName });
            return (0, rxjs_1.throwError)(() => new common_1.HttpException(errorResponse, statusCode));
        }));
    }
};
ErrorInterceptor = ErrorInterceptor_1 = __decorate([
    (0, common_1.Injectable)()
], ErrorInterceptor);
exports.ErrorInterceptor = ErrorInterceptor;
//# sourceMappingURL=logging.interception.js.map