import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsEmail, IsStrongPassword, } from 'class-validator'
import mongoose, { HydratedDocument } from 'mongoose'

export type HydratedUser = HydratedDocument<User>

@Schema()
export class User {
  @IsEmail()
  @Prop({ required: true })
  email: string

  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minSymbols: 0
  })
  @Prop({ required: true })
  password: string

  @Prop({ ref: 'Promotion' })
  promotions: mongoose.Schema.Types.ObjectId[]
}

export const UserSchema = SchemaFactory.createForClass(User)