import { Body, Controller, Post, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Serialize } from 'src/decorators/serialize.decorator'
import { UserDto } from './dtos/user.dto'
import { Response } from 'express'
import { User } from './user.schema'

const expirationHours = 8
const expirationDate = new Date()
expirationDate.setTime(
  expirationDate.getTime() + expirationHours * 60 * 60 * 1000
)

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async createUser(@Body() { email, password }: User, @Res() res: Response) {
    const user = await this.authService.createUser(email, password)
    res.cookie('isAuth', user._id.toString(), { expires: expirationDate })
    return user
  }

  @Post('signin')
  async login(@Body() { email, password }: User, @Res() res: Response) {
    const user = await this.authService.login(email, password)
    res.cookie('isAuth', user._id.toString(), { expires: expirationDate })
    return user
  }
}
