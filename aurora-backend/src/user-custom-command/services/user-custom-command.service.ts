import { ChatBotInput, ChatBotOutput } from '../../common/dtos/chatBot.dto';
import { Keyword } from '../entities/keyword.entitiy';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rooms } from '../entities/rooms.entitiy';

/*
  @author AJu (zoz0312)
  User Custom Command Services
*/
export class UserCustomCommandService {
  constructor (
    @InjectRepository(Keyword)
    private readonly keyword: Repository<Keyword>,
  ) {
  }

	async findRandomCommand (
		{
			room,
			msg,
			sender,
			isGroupChat,
			image,
		}: ChatBotInput,
    myRoom: Rooms,
	): Promise<ChatBotOutput> {
		try {
      const outputText = await this.keyword.findOne({
        where: {
          keyword: msg,
          rooms: myRoom,
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

      const ramdomValue = Math.floor(Math.random() * (len));
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
