"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleException = void 0;
const common_1 = require("@nestjs/common");
function handleException(error, message) {
    const status = error instanceof common_1.HttpException ? error.getStatus() : 500;
    const description = error.message;
    throw new common_1.HttpException(message, status, { description });
}
exports.handleException = handleException;
//# sourceMappingURL=handleException.js.map