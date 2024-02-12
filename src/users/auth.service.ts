import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async createUser(email: string, password: string) {
    const storedUser = await this.userModel.findOne({ email })

    if (storedUser) {
      throw new BadRequestException('Email is busy')
    }
    const salt = randomBytes(8).toString('hex')
    const hash = await scrypt(password, salt, 32) as Buffer
    const result = `${salt}.${hash.toString('hex')}`

    const user = new this.userModel({ email, password: result, promotions: [] })

    const error = user.validateSync()

    if(error) {
      throw new ForbiddenException(error.message)
    }
 
    user.save()

    return user
  }

  async login(email: string, password: string) {
    const storedUser = await this.userModel.findOne({ email })
    if (!storedUser) {
      throw new NotFoundException('User not found')
    }
    const [salt, hash] = storedUser.password.split('.')
    const hashBuffer = await scrypt(password, salt, 32) as Buffer
    const isMatch = hash === hashBuffer.toString('hex')
    if (!isMatch) {
      throw new ForbiddenException('Wrong credentials')
    }

    return storedUser
  }
}