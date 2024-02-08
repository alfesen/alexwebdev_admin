import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import { InjectConnection, InjectModel } from "@nestjs/mongoose"
import { Tech } from "./tech.schema"
import { Connection, Model } from "mongoose"
import { TechCategory } from "./tech-category.schema"
import { join, relative } from "path"
import * as fs from "fs"

@Injectable()
export class TechService {
  constructor(
    @InjectModel("Tech") private techModel: Model<Tech>,
    @InjectModel("TechCategory") private techCategoryModel: Model<TechCategory>,
    @InjectConnection() private connection: Connection,
  ) {}

  async createTech(
    heading: string,
    text: string,
    category: string,
    icon: string,
  ) {
    const searchedCategory = await this.findOrCreateCategory(category)

    const existingTech = await this.techModel.findOne({ heading, category })

    if (existingTech) {
      throw new BadRequestException(
        "The tech with a given name already exists in this category",
      )
    }

    const tech = new this.techModel({
      heading,
      text,
      category,
      icon,
    })

    const techErrors = tech.validateSync()

    if (techErrors) throw new BadRequestException(techErrors.message)

    try {
      await tech.save()
    } catch (error) {
      throw new BadRequestException(error.message)
    }

    const session = await this.connection.startSession()
    session.startTransaction()

    try {
      searchedCategory.items.push(tech.id)
      await searchedCategory.save()
      await session.commitTransaction()
    } catch (error) {
      await session.abortTransaction()
      throw new BadRequestException(error.message)
    }

    return searchedCategory.toObject({ getters: true })
  }

  private async findOrCreateCategory(category: string) {
    let searchedCategory = await this.techCategoryModel.findOne({ category })
    if (!searchedCategory) {
      searchedCategory = new this.techCategoryModel({
        category,
        items: [],
      })
      try {
        await searchedCategory.save()
      } catch (error) {
        throw new BadRequestException(error.message)
      }
    }

    return searchedCategory
  }

  async getAllTechs() {
    const storedTechCategories = await this.techCategoryModel.find()
    if (!storedTechCategories || storedTechCategories.length === 0) {
      throw new NotFoundException("No techs were found")
    }

    const techs = await this.techModel.find()

    const categories = storedTechCategories.map((c) => {
      const categoryTechs = techs.filter((t) => t.category === c.category)

      if (categoryTechs.length > 0) {
        return {
          [c.category]: categoryTechs.map(t => t.toObject({getters: true})),
        }
      }
    })

    const mergedCategoryObject = Object.assign({}, ...categories)

    return mergedCategoryObject
  }

  async getSingleTech(id: string) {
    const tech = await this.techModel.findById(id)
    if (!tech)
      throw new NotFoundException("The tech with a given id was not found")
    return tech.toObject({ getters: true })
  }

  async updateTech(
    id: string,
    category: string,
    heading: string,
    text: string,
    icon: string,
  ) {
    const existingTech = await this.techModel.findById(id)
    if (!existingTech) {
      throw new NotFoundException("The tech with a given id was not found")
    }

    if (icon) {
      fs.unlink(relative(process.cwd(), existingTech.icon), (err) => {
        console.log(err)
      })
    }

    existingTech.category = category
    existingTech.heading = heading
    existingTech.text = text
    if(icon) {
      existingTech.icon = icon
    }
    existingTech.icon = existingTech.icon

    const validationError = existingTech.validateSync()
    if (validationError) {
      throw new BadRequestException(validationError.message)
    }

    existingTech.save()

    const session = await this.connection.startSession()
    session.startTransaction()

    try {
      const techCategory = await this.findOrCreateCategory(category)
      techCategory.items.push(existingTech.id)
      await techCategory.save()
      session.commitTransaction()
    } catch (err) {
      session.abortTransaction()
      throw new BadRequestException(err.message)
    }

    return existingTech.toObject({ getters: true })
  }

  async deleteTech(id: string) {
    try {
      const tech = await this.techModel.findById(id)
      if (!tech) throw new NotFoundException("No tech with this id found")
      fs.unlink(join(process.cwd(), tech.icon), (err) => {
        if (err) throw new BadRequestException(err.message)
      })

      await tech.deleteOne()
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
}
