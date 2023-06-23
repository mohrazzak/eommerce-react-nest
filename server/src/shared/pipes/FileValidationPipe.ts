import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Express } from 'express';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  private readonly allowedMimeTypes = ['image/jpeg', 'image/png'];
  private readonly maxFileSize = 5 * 1024 * 1024;

  transform(file: Express.Multer.File): Express.Multer.File {
    if (!file) return file;

    if (!this.isMimeTypeValid(file.mimetype)) throw new BadRequestException('Invalid file type. Only JPEG and PNG images are allowed');

    if (file.size > this.maxFileSize) throw new BadRequestException('File size exceeds the allowed limit, Max is 10MB');

    return file;
  }

  private isMimeTypeValid(mimeType: string): boolean {
    return this.allowedMimeTypes.includes(mimeType);
  }
}
