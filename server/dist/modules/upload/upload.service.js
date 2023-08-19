"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const streamifier_1 = require("streamifier");
const sharp = require("sharp");
let UploadService = class UploadService {
    async uploadFile(file, folder) {
        return new Promise(async (resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({ folder }, (error, result) => {
                if (error)
                    return reject(error);
                resolve(result);
            });
            const compressedImage = await sharp(file.buffer).webp({ quality: 20 }).toBuffer();
            (0, streamifier_1.createReadStream)(compressedImage).pipe(uploadStream);
        });
    }
    async deleteFile(public_id) {
        const res = await cloudinary_1.v2.uploader.destroy(public_id, { resource_type: 'image' });
        if (res.result !== 'ok')
            throw new common_1.BadRequestException("Couldn't delete the image", { description: res.result });
    }
};
UploadService = __decorate([
    (0, common_1.Injectable)()
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map