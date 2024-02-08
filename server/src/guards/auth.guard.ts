import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const cookies = request.headers.cookie
    const cookiesArray: string[] = cookies ? cookies.split('; ') : []

    const isAuthCookie = cookiesArray.find((cookie) =>
      cookie.startsWith('isAuth=')
    )

    return !!isAuthCookie
  }
}
