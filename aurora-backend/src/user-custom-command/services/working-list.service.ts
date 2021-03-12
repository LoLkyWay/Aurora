import { InjectRepository } from "@nestjs/typeorm";
import { ChatBotOutput } from "src/common/dtos/chatBot.dto";
import { Repository } from "typeorm";
import { Status, Working } from '../entities/working.entity';


/*
  @author AJu (zoz0312)
  Party 관리 관련 명령어
*/
export class WorkingList {
  constructor(
    @InjectRepository(Working)
    private readonly working: Repository<Working>
  ) {
  }

  async findWorlingList(): Promise<ChatBotOutput> {
    try {
      const list = await this.working.find();

      if (list.length === 0) {
        return {
          success: false,
          message: '[등록된 작업목록이 없습니다]',
        }
      }

      let message = '[룽지님 작업 목록]\n\n';
      list.map(({ userName, champion, status }, index) => {
        message += `${index + 1}. `;
        message += `${userName} - ${champion}`;
        if (status === Status.Todo) {
        } else if (status === Status.Working) {
          message += ' 👩‍🏭';
        } else if (status === Status.Done) {
          message += ' 🔥';
        }
        message += '\n';
      });

      return {
        success: true,
        message,
      }
    } catch (error) {
      return {
        success: false,
        message: 'DB 조회 오류',
        error,
      }
    }
  }
}