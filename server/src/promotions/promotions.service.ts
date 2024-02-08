import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { InjectConnection, InjectModel } from "@nestjs/mongoose"
import { Connection, Model } from "mongoose"
import { Promotion } from "./promotion.schema"
import { User } from "src/users/user.schema"
import { unlink } from "fs"
import { relative } from "path"

@Injectable()
export class PromotionsService {
  constructor(
    @InjectModel("Promotion") private promotionModel: Model<Promotion>,
    @InjectModel("User") private userModel: Model<User>,
    @InjectConnection() private connection: Connection,
  ) {}

  async createPromotion(text: string, image: string, creator: string) {
    const promotion = new this.promotionModel({
      text,
      image,
      creator,
    })

    const error = promotion.validateSync()

    if (error) {
      throw new BadRequestException(error.message)
    }

    await promotion.save()

    const session = await this.connection.startSession()
    session.startTransaction()

    try {
      const user = await this.userModel.findById(creator)
      if (!user) {
        throw new NotFoundException("User not found")
      }
      const promotions = user.promotions
      promotions.push(promotion.id)

      await user.save()
      await session.commitTransaction()
    } catch (error) {
      await session.abortTransaction()
      throw new BadRequestException(error.message)
    } finally {
      session.endSession()
    }

    return promotion.toObject({ getters: true })
  }

  async getAllPromotions() {
    const promotions = await this.promotionModel.find()
    if (!promotions) {
      throw new NotFoundException("Promotions were not found")
    }

    return promotions.map((p) => p.toObject({ getters: true }))
  }

  async getSinglePromotion(id: string) {
    const promotion = await this.promotionModel.findById(id)
    if (!promotion) {
      throw new NotFoundException("Promotion was not found")
    }

    return promotion.toObject({ getters: true })
  }

  async updatePromotion(id: string, text: string, image: string) {
    const promotion = await this.promotionModel.findById(id)
    if (!promotion) {
      throw new NotFoundException("Promotion was not found")
    }

    if (image) {
      unlink(relative(process.cwd(), promotion.image), (err) => {
        console.error(err)
      })
      promotion.image = image
    }

    promotion.text = text

    const validationError = promotion.validateSync()

    if (validationError) {
      throw new BadRequestException(validationError.message)
    }

    promotion.save()

    return promotion.toObject({ getters: true })
  }

  async deletePromotion(id: string) {
    const promotion = await this.promotionModel.findById(id)
    if (!promotion) {
      throw new BadRequestException("Promotion not found")
    }

    unlink(relative(process.cwd(), promotion.image), (err) => {
      console.error(err)
    })

    await promotion.deleteOne()
  }
}
