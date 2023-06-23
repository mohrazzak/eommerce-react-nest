import { Global, Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CloudinaryProvider } from './upload.provider';

@Global()
@Module({
  providers: [CloudinaryProvider, UploadService],
  exports: [CloudinaryProvider, UploadService],
})
export class UploadModule {}
