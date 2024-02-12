import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { TechSchema } from "./tech.schema"
import { TechController } from "./tech.controller"
import { TechService } from "./tech.service"
import { TechCategorySchema } from "./tech-category.schema"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Tech", schema: TechSchema },
      { name: "TechCategory", schema: TechCategorySchema },
    ]),
  ],
  controllers: [TechController],
  providers: [TechService],
})
export class TechModule {}
