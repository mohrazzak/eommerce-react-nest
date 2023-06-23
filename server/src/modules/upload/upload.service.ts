import { BadRequestException, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './upload.response';
import { createReadStream } from 'streamifier';
import sharp = require('sharp');

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File, folder: Folder): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>(async (resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      // Compress
      const compressedImage = await sharp(file.buffer).webp({ quality: 20 }).toBuffer();
      // Assign the image to the cloudinary
      createReadStream(compressedImage).pipe(uploadStream);
    });
  }

  async deleteFile(public_id: string) {
    const res: IDeleteResponse = await cloudinary.uploader.destroy(public_id, { resource_type: 'image' });
    if (res.result !== 'ok') throw new BadRequestException("Couldn't delete the image", { description: res.result });
  }
}

type Folder = 'users';
interface IDeleteResponse {
  result: 'not found' | 'ok';
}
