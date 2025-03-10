import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export class MediaService {
  static uploadPath = join(process.cwd(), 'public');

  static async saveImage(imageBuffer: { data: Buffer, name: string }): Promise<string> {
    try {
        if(!imageBuffer.data || !imageBuffer.name) throw new Error('No media found');
        const extension = imageBuffer.name.split('.').pop();

        await mkdir(this.uploadPath, { recursive: true });

        const fileName = `${uuidv4()}.${extension}`;
        const filePath = join(this.uploadPath, fileName);

        await writeFile(filePath, imageBuffer.data);

        return `/${fileName}`;
    } catch (error) {
      throw new Error('Media Error: ' + error.message);
    }
  }
}
