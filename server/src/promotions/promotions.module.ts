import { Module } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { PromotionsController } from './promotions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PromotionSchema } from './promotion.schema';
import { UserSchema } from 'src/users/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Promotion', schema: PromotionSchema }, { name: 'User', schema: UserSchema }])],
  providers: [PromotionsService],
  controllers: [PromotionsController]
})
export class PromotionsModule { }
