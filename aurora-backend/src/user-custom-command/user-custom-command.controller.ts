import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { chatBotInputDto } from '../common/dtos/chatBot.dto';
import { Commands } from './entities/commands.entitiy';
import { Keyword } from './entities/keyword.entitiy';

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
  }:chatBotInputDto): string {
    return '';
  }
}
