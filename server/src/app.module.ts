import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module'
import { PromotionsModule } from './promotions/promotions.module'
import { TechModule } from './tech/tech.module'
import { FileModule } from './file/file.module'
import { MessagesModule } from './messages/messages.module'
import { CookieSessionModule } from 'nestjs-cookie-session'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development'
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('DB_URI')
        }
      },
      inject: [ConfigService]
    }),
    CookieSessionModule.forRoot({
      session: {
        secret: process.env.COOKIE_KEY,
        sameSite: 'none',
        secure: true
      }
    }),
    UsersModule,
    PromotionsModule,
    TechModule,
    FileModule,
    MessagesModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
