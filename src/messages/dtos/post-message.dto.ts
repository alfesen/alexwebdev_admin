import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class PostMessageDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  message: string

  @IsNotEmpty()
  @IsBoolean()
  consent: boolean
}
