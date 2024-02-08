import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { IsString } from 'class-validator'

export type HydratedPromotion = HydratedDocument<Promotion>

@Schema()
export class Promotion {
  @IsString()
  @Prop({ required: true })
  text: string

  @IsString()
  @Prop({ required: true })
  image: string

  @Prop({
    ref: 'User'
  })
  creator: mongoose.Schema.Types.ObjectId
}

export const PromotionSchema = SchemaFactory.createForClass(Promotion)