import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards
} from '@nestjs/common'
import { PromotionsService } from './promotions.service'
import { AuthGuard } from 'src/guards/auth.guard'
import { UploadImage } from 'src/decorators/upload-image.decorator'
import { Request } from 'express'
import { PromotionDto } from './dtos/promotion.dto'
import { SharpImage } from 'src/decorators/sharp-image.decorator'

@Controller('promotions')
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UploadImage('image')
  async createPromotion(
    @Body() { enText, plText }: PromotionDto,
    @Req() request: Request,
    @SharpImage(1200, true) image: string
  ) {
    const cookies = request.headers.cookie
    const cookiesArray: string[] = cookies ? cookies.split('; ') : []
    const isAuthCookie = cookiesArray.find((cookie) =>
      cookie.startsWith('isAuth=')
    )

    const userId = isAuthCookie.split('=')[1]

    const promotion = await this.promotionsService.createPromotion(
      enText,
      plText,
      image,
      userId
    )

    return promotion
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  @UploadImage('image')
  async updatePromotion(
    @Param('id') id: string,
    @Body() { enText, plText }: PromotionDto,
    @SharpImage(1200, false) image: string
  ) {
    const newTech = await this.promotionsService.updatePromotion(
      id,
      enText,
      plText,
      image ? image : undefined
    )

    return newTech
  }

  @Get()
  getAllPromotions() {
    return this.promotionsService.getAllPromotions()
  }

  @Get('/:id')
  getSinglePromotion(@Param('id') id: string) {
    return this.promotionsService.getSinglePromotion(id)
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deletePromotion(@Param('id') id: string) {
    await this.promotionsService.deletePromotion(id)
    return { message: 'Promotion successfully deleted' }
  }
}
