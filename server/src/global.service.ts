import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class GlobalService {
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
