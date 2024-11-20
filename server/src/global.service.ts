/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { v2 as cloudinary } from 'cloudinary';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { Readable } from 'stream';
@Injectable()
export class GlobalService {
  constructor(
    @Inject('CLOUDINARY') private cloudinaryClient: typeof cloudinary,
  ) {}

  getMulterOptions(folder: string): MulterOptions {
    const storage = new CloudinaryStorage({
      cloudinary: this.cloudinaryClient,
      params: async () => ({
        folder: folder, // Specify folder here
        resource_type: 'auto', // Automatically detect the resource type (image/video)
        format: async (req: any, file: any) => 'jpg', // Optional: Specify default format (e.g., jpg)
        public_id: (req, file) => uuidv4() + file.originalname, // Optional: Use original file name as public ID
      }),
    });

    return { storage };
  }

  async uploadFileToCloudinary(
    file: Express.Multer.File,
    folder: string,
  ): Promise<any> {
    console.log(file);
    return this.cloudinaryClient.uploader.upload(file.path, {
      folder,
    });
  }

  /**
   * Uploads a file buffer to Cloudinary.
   * @param file - The file object containing buffer and metadata.
   * @param folder - The folder where the file will be stored.
   * @returns Promise with upload response.
   */
  async uploadBufferFileToCloudinary(
    file: Express.Multer.File,
    folder: string,
  ): Promise<any> {
    if (!file.buffer) {
      throw new BadRequestException('File buffer is empty');
    }

    const uploadStream = (folder: string) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder,
            resource_type: 'auto', // Auto-detect file type (image, video, etc.)
            public_id: file.originalname.split('.')[0], // Use original filename without extension
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );
        const bufferStream = new Readable();
        bufferStream.push(file.buffer);
        bufferStream.push(null); // End of stream
        bufferStream.pipe(stream);
      });

    return await uploadStream(folder);
  }

  async storeImageAndGetUrl(file: any, url: string): Promise<string> {
    const { originalname, buffer } = file;
    const uniqueFilename = `${uuidv4()}_${originalname}`;
    const directoryPath = join(process.cwd(), 'public', url);
    const filePath = join(directoryPath, uniqueFilename);
    const imageUrl = `${process.env.API_URL}/${url}/${uniqueFilename}`;

    if (!existsSync(join(process.cwd(), 'public', url))) {
      mkdirSync(join(process.cwd(), 'public', url), { recursive: true });
    }

    writeFileSync(filePath, buffer);

    return imageUrl;
  }
}
