import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { party } from '../../cache-party';
import { ChatBotInput, ChatBotOutput } from '../../common/dtos/chatBot.dto';
import { trimInput } from '../../common/trimInput';
import { Working } from '../../user-custom-command/entities/working.entity';

/*
  @author AJu (zoz0312)
  Party 참가 유저 관련 명령어
*/
export class WorkingListManager {
  constructor (
    @InjectRepository(Working)
    private readonly keyword: Repository<Working>,
  ) {
  }

  async createWorking(): Promise<ChatBotOutput> {
    return {
      success: true,
      message: '',
    }
  }

  async updateWorking(): Promise<ChatBotOutput> {
    return {
      success: true,
      message: '',
    }

  }

  async deleteWorking(): Promise<ChatBotOutput> {
    return {
      success: true,
      message: '',
    }

  }
}