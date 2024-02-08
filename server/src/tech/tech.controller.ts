import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common"
import { TechService } from "./tech.service"
import { UploadImage } from "src/decorators/upload-image.decorator"
import { AuthGuard } from "src/guards/auth.guard"
import { SharpImage } from "src/decorators/sharp-image.decorator"
import { CreateTechDto } from "./dtos/create-tech.dto"
import { Response } from "express"

@Controller("tech")
export class TechController {
  constructor(private techService: TechService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UploadImage("icon")
  createTech(
    @Body() { heading, text, category }: CreateTechDto,
    @SharpImage(50, true) icon: string,
  ) {
    return this.techService.createTech(heading, text, category, icon)
  }

  @Get()
  getAllTechs() {
    return this.techService.getAllTechs()
  }

  @Get("/:id")
  getSingleTech(@Param("id") id: string) {
    return this.techService.getSingleTech(id)
  }

  @Patch("/:id")
  @UploadImage("icon")
  async updateTech(
    @Param("id") id: string,
    @Body() { heading, text, category },
    @SharpImage(50, false) icon: string,
  ) {
    const newTech = await this.techService.updateTech(
      id,
      category,
      heading,
      text,
      icon ? icon : undefined,
    )
    return newTech
  }

  @Delete("/:id")
  async deleteTech(@Param("id") id: string, @Res() response: Response) {
    await this.techService.deleteTech(id)
    return response.status(200).json({ message: "Tech successfully removed" })
  }
}
