import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common"
import * as sharp from "sharp"
import * as fs from "fs"
import { join, parse, relative } from "path"

@Injectable()
export class SharpPipe
  implements PipeTransform<Express.Multer.File, Promise<string>>
{
  constructor(
    private width: number,
    private required: boolean,
  ) {}
  async transform(image: Express.Multer.File): Promise<string> {
    if (!this.required && !image) {
      return null
    }
    if (this.required && !image) {
      throw new BadRequestException("No file provided")
    }
    const { name } = parse(image.filename)
    const outputFilePath = relative(
      process.cwd(),
      join("uploads", "images", `${name}.webp`),
    )

    try {
      await sharp(relative(process.cwd(), image.path))
        .resize(this.width)
        .toFormat("webp")
        .toFile(outputFilePath)
    } catch (sharpError) {
      throw new BadRequestException("Invalid input")
    }

    fs.unlink(relative(process.cwd(), image.path), (err) => {
      if (err) {
        console.error("Error: ", err)
      }
    })

    return outputFilePath
  }
}
