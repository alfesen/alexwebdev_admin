import { Expose } from 'class-transformer'
import mongoose from 'mongoose'

export class PromotionDto {
  @Expose()
  enText: string
  
  @Expose()
  plText: string

  @Expose()
  id: mongoose.Schema.Types.ObjectId

  @Expose()
  image: Express.Multer.File
}
