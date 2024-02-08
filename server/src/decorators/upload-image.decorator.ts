import { UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { diskStorage } from 'multer'
import { extname } from 'path'
import { randomUUID } from 'crypto'
import { BadRequestException } from '@nestjs/common'

const storage = diskStorage({
  destination: 'uploads/images',
  filename: (req, file, cb) => {
    const ext = extname(file.originalname)
    cb(null, `${randomUUID()}${ext}`)
  },
})

const MIME_TYPES = {
  'image/png': 'png',
  'image/webp': 'webp'
} as Record<string, string>

const fileFilter = (req, file, cb) => {
    const isValid = !!MIME_TYPES[file.mimetype]
    let error = isValid ? null : new BadRequestException('Invalid mime type')
    cb(error as null, isValid)
  }

export function UploadImage(type: string) {
  return UseInterceptors(FileInterceptor(type, { storage, fileFilter }))
}
