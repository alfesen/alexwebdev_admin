import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { UploadExceptionFilter } from './filters/upload-exception.filter'

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

  app.useGlobalFilters(new UploadExceptionFilter())
  await app.listen(3000)
}
bootstrap()
