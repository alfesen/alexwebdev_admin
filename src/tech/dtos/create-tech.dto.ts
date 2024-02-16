import { IsString } from 'class-validator'

export class CreateTechDto {
  @IsString()
  heading: string
  @IsString()
  enText: string
  @IsString()
  plText: string
  @IsString()
  category: string
}
