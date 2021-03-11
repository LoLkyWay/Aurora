import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatBotInput } from '../common/dtos/chatBot.dto';
import { Commands } from './entities/commands.entitiy';
import { Keyword } from './entities/keyword.entitiy';

/*
  @author AJu (zoz0312)
  '/명령어'를 제외한 유저의 텍스트를 받아 처리하는 곳
*/
@Controller('user-custom-command')
export class UserCustomCommandController {
  constructor(
    @InjectRepository(Commands)
    private readonly commands: Repository<Commands>,
    @InjectRepository(Keyword)
    private readonly keyword: Repository<Keyword>,
  ) {}

  @Post()
  userCustomCommand(@Body() {
    room,
    msg,
    sender,
    isGroupChat,
    image,
  }: ChatBotInput): string {
    return '';
  }
}
