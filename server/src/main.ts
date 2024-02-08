import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { UploadExceptionFilter } from './filters/upload-exception.filter'
import * as session from 'express-session'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Origin'
    ],
    origin: [
      process.env.ADMIN_CLIENT,
      process.env.CLIENT,
      process.env.PROD_CLIENT
    ],
    credentials: true
  })
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.use(
    session({
      secret: process.env.COOKIE_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: true,
        sameSite: 'none',
        httpOnly: false
      }
    })
  )

  app.useGlobalFilters(new UploadExceptionFilter())
  await app.listen(3000)
}
bootstrap()
