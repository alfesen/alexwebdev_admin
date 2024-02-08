import { Exclude, Expose, Transform } from "class-transformer"
import mongoose from "mongoose"

export class UserDto {
  @Expose()
  email: string

  @Expose()
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  id: mongoose.Schema.Types.ObjectId

  @Exclude()
  password: string

  @Expose()
  promotions: mongoose.Schema.Types.ObjectId[]
}
