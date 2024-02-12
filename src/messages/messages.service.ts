import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Message } from './message.schema'

@Injectable()
export class MessagesService {
  constructor(@InjectModel('Message') private messageModel: Model<Message>) {}

  async postMessage(
    name: string,
    email: string,
    message: string,
    consent: boolean
  ) {
    if (consent !== true) {
      throw new ForbiddenException(
        'You need to consent to the processing of your personal data'
      )
    }

    const newMessage = new this.messageModel({
      name,
      email,
      message,
      consent,
      date: new Date().toLocaleString('pl')
    })

    const validationError = newMessage.validateSync()

    if (validationError) {
      console.log(validationError)
      throw new BadRequestException(validationError.message)
    }

    newMessage.save()

    return {
      message:
        'Your message was successfully sent, I will answer as soon as possible. Thank you for the contact.'
    }
  }

  async getMessages() {
    const messages = await this.messageModel.find()

    if (!messages || messages.length === 0) {
      throw new NotFoundException('No messages found')
    }
    const sortedMessages = messages.sort((a, b) =>
      new Date(a.date) > new Date(b.date) ? 1 : -1
    )
    return sortedMessages.map((m) => m.toObject({ getters: true }))
  }

  async getSingleMessage(id: string) {
    const message = await this.messageModel.findById(id)

    if (!message) {
      return this.throwNotFoundException()
    }

    return message.toObject({ getters: true })
  }

  async deleteMessage(id: string) {
    const message = await this.messageModel.findById(id)

    if (!message) {
      return this.throwNotFoundException()
    }

    await message.deleteOne()

    return { message: 'Message deleted successfully' }
  }

  private throwNotFoundException() {
    throw new NotFoundException('Message with a given id was not found')
  }
}
