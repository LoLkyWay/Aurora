import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatBotInput, ChatBotOutput } from '../common/dtos/chatBot.dto';
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
  async userCustomCommand(@Body() {
    room,
    msg,
    sender,
    isGroupChat,
    image,
  }: ChatBotInput): Promise<ChatBotOutput> {

    if (msg.length > 20) {
      return {
        success: false,
        message: '문자가 너무 깁니다.',
      }
    }
    try {
      const outputText = await this.keyword.findOne({
        where: {
          keyword: msg
        },
        relations: ['commands']
      });

      if (!outputText) {
        return {
          success: false,
          message: '등록된 키워드가 없습니다.'
        }
      }

      const len = outputText.commands.length;
      if (len === 0) {
        return {
          success: false,
          message: '등록된 단어가 없습니다.'
        }
      }
      const ramdomValue = Math.floor(Math.random() * (len))
      return {
        success: true,
        message: outputText.commands[ramdomValue].outputText,
      }
    } catch (error) {
      return {
        success: false,
        error,
      }
    }
  }
}
