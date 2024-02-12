import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module'
import { PromotionsModule } from './promotions/promotions.module'
import { TechModule } from './tech/tech.module'
import { FileModule } from './file/file.module'
import { MessagesModule } from './messages/messages.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { CookieSessionModule } from 'nestjs-cookie-session'
import { join } from 'path'

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
        httpOnly: false
      }
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'build'),
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
