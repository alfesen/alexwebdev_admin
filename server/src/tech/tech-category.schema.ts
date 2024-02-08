import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose"
import mongoose from "mongoose"

@Schema()
export class TechCategory {
  @Prop({ required: true, type: String })
  category: string

  @Prop({ ref: "Tech", default: [] })
  items: mongoose.Schema.Types.ObjectId[]
}

export const TechCategorySchema = SchemaFactory.createForClass(TechCategory)
