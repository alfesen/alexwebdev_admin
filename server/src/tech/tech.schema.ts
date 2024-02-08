import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type HydratedTech = HydratedDocument<Tech>

@Schema({})
export class Tech {
  @Prop({ required: true })
  heading: string

  @Prop({ required: true })
  text: string

  @Prop({ required: true })
  icon: string

  @Prop({ required: true })
  category: string
}

export const TechSchema = SchemaFactory.createForClass(Tech)
