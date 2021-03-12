import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    private readonly working: Repository<Working>,
  ) {
  }

  async createWorking(
    chatBotInput :ChatBotInput
  ): Promise<ChatBotOutput> {
    const [_, arguements] = trimInput(chatBotInput);
    const [userName, champion] = arguements.split('::');

    if (!userName) {
      return {
        success: false,
        message: '유저 이름을 입력해주세요!',
      }
    }

    if (!champion) {
      return {
        success: false,
        message: '챔피언 이름을 입력해주세요!',
      }
    }

    try {
      await this.working.save(
        this.working.create({
          userName,
          champion,
        })
      );
      return {
        success: true,
        message: `${userName}님 ${champion}등록 완료!`,
      }
    } catch (error) {
      return {
        success: false,
        message: 'DB 저장 오류',
        error,
      }
    }
  }

  async updateWorking(
    chatBotInput :ChatBotInput
  ): Promise<ChatBotOutput> {
    const [_, arguements] = trimInput(chatBotInput);
    const [idx, status] = arguements.split(' ');

    if (!idx) {
      return {
        success: false,
        message: 'Index를 입력해주세요!',
      }
    }

    if (!status) {
      return {
        success: false,
        message: 'Status를 입력해주세요!',
      }
    }

    /*
      0: todo
      1: working
      2: finish
    */
    const state = +status;
    if (state < 0 && state > 2) {
      return {
        success: false,
        message: '올바르지 않은 상태 명령어 입니다.',
      }
    }

    return {
      success: true,
      message: '',
    }

  }

  async deleteWorking(
    chatBotInput :ChatBotInput
  ): Promise<ChatBotOutput> {
    const [_, idx] = trimInput(chatBotInput);
    return {
      success: true,
      message: '',
    }

  }
}