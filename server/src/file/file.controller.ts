import {
  Controller,
  Get,
  NotFoundException,
  Param,
  StreamableFile,
} from '@nestjs/common'
import { createReadStream, statSync } from 'fs'
import { join } from 'path'

@Controller('uploads')
export class FileController {
  @Get('images/:filename')
  getImage(@Param('filename') filename: string) {
    try {
      const path = join(process.cwd(), 'uploads', 'images', filename)
      const stats = statSync(path)

      if (!stats.isFile()) {
        throw new NotFoundException('File not found')
      }

      const file = createReadStream(path)

      return new StreamableFile(file)
    } catch (error) {
      throw new NotFoundException('File not found')
    }
  }
}
