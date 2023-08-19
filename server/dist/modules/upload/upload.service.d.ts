/// <reference types="multer" />
import { CloudinaryResponse } from './upload.response';
export declare class UploadService {
    uploadFile(file: Express.Multer.File, folder: Folder): Promise<CloudinaryResponse>;
    deleteFile(public_id: string): Promise<void>;
}
type Folder = 'users';
export {};
