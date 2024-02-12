import { IsString } from "class-validator";

export class CreateTechDto {
  @IsString()
  heading: string
  @IsString()
  text: string
  @IsString()
  category: string
}