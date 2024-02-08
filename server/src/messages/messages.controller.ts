import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards
} from '@nestjs/common'
import { MessagesService } from './messages.service'
import { AuthGuard } from 'src/guards/auth.guard'
import { PostMessageDto } from './dtos/post-message.dto'

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Post()
  postMessage(@Body() { name, email, message, consent }: PostMessageDto) {
    return this.messagesService.postMessage(name, email, message, consent)
  }

  @Get()
  getMessages() {
    return this.messagesService.getMessages()
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  getSingleMessage(@Param('id') id: string) {
    return this.messagesService.getSingleMessage(id)
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteMessage(@Param('id') id: string) {
    return this.messagesService.deleteMessage(id)
  }
}
