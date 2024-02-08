import { Expose } from 'class-transformer'
import mongoose from 'mongoose'

export class PromotionDto {
  @Expose()
  text: string

  @Expose()
  id: mongoose.Schema.Types.ObjectId

  @Expose()
  image: Express.Multer.File
}
