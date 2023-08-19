"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileValidationPipe = void 0;
const common_1 = require("@nestjs/common");
let FileValidationPipe = class FileValidationPipe {
    constructor() {
        this.allowedMimeTypes = ['image/jpeg', 'image/png'];
        this.maxFileSize = 5 * 1024 * 1024;
    }
    transform(file) {
        if (!file)
            return file;
        if (!this.isMimeTypeValid(file.mimetype))
            throw new common_1.BadRequestException('Invalid file type. Only JPEG and PNG images are allowed');
        if (file.size > this.maxFileSize)
            throw new common_1.BadRequestException('File size exceeds the allowed limit, Max is 10MB');
        return file;
    }
    isMimeTypeValid(mimeType) {
        return this.allowedMimeTypes.includes(mimeType);
    }
};
FileValidationPipe = __decorate([
    (0, common_1.Injectable)()
], FileValidationPipe);
exports.FileValidationPipe = FileValidationPipe;
//# sourceMappingURL=FileValidationPipe.js.map