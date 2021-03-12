import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatBotInput, ChatBotOutput } from '../../common/dtos/chatBot.dto';
import { trimInput } from '../../common/trimInput';
import { Working, Status } from '../../user-custom-command/entities/working.entity';

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

    try {
      const working = await this.working.findOne(idx);

      if (!working) {
        return {
          success: false,
          message: '존재하지 않는 Index 입니다.',
        }
      }

      let dbStatus = Status.Todo;
      if (state === 1) {
        dbStatus = Status.Working;
      } else if (state === 2) {
        dbStatus = Status.Done;
      }

      await this.working.save([{
        id: working.id,
        status: dbStatus,
      }]);

      return {
        success: true,
        message: `${working.userName}-${working.champion} => ${dbStatus} 상태 변경 완료`,
      }
    } catch (error) {
      return {
        success: false,
        message: 'DB 업데이트 오류',
        error,
      }
    }
  }

  async deleteWorking(
    chatBotInput :ChatBotInput
  ): Promise<ChatBotOutput> {
    const [_, idx] = trimInput(chatBotInput);

    if (!idx) {
      return {
        success: false,
        message: 'Index를 입력해주세요!',
      }
    }

    try {
      const working = await this.working.findOne(idx);

      if (!working) {
        return {
          success: false,
          message: '존재하지 않는 Index 입니다.',
        }
      }

      await this.working.softRemove(working);

      return {
        success: true,
        message: `${working.userName}-${working.champion} 삭제 완료`,
      }
    } catch (error) {
      return {
        success: false,
        message: 'DB 삭제 오류',
        error,
      }
    }
  }
}