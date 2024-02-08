import { NestInterceptor, CallHandler, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { plainToClass } from 'class-transformer'

export interface SerializeConstructor<T> {
  new (...args: any[]): T
}

export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private dto: SerializeConstructor<T>) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse()

    return handler.handle().pipe(
      map((data: any) => {
        return response.json(
          plainToClass(this.dto, data, {
            excludeExtraneousValues: true,
          })
        )
      })
    )
  }
}
