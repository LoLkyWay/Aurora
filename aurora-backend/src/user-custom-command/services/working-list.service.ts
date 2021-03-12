import { InjectRepository } from "@nestjs/typeorm";
import { ChatBotOutput } from "src/common/dtos/chatBot.dto";
import { Repository } from "typeorm";
import { Working } from '../entities/working.entity';


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
    const list = await this.working.find();
    return {
      success: true,
    }
  }
}