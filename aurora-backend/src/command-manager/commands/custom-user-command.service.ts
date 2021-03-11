import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Commands } from '../../user-custom-command/entities/commands.entitiy';
import { Keyword } from '../../user-custom-command/entities/keyword.entitiy';
import { ChatBotInput, ChatBotOutput } from '../../common/dtos/chatBot.dto';
import { trimInput } from '../../common/trimInput';

@Injectable()
export class CustomUserCommand {
  constructor (
    @InjectRepository(Commands)
    private readonly commands: Repository<Commands>,
    @InjectRepository(Keyword)
    private readonly keyword: Repository<Keyword>,
  ) {}

  async createUserCommand(chatBotInput :ChatBotInput): Promise<ChatBotOutput> {
    const { sender: userName } = chatBotInput;
    const [_, arguement] = trimInput(chatBotInput);
    const [keyword, outputText] = arguement.split('::');

    if (!keyword) {
      return {
        success: false,
        message: '키워드가 존재하지 않습니다!',
      }
    }
    if (!outputText) {
      return {
        success: false,
        message: '학습할 글자가 없습니다!',
      }
    }

    try {
      let dbKeyword = await this.keyword.findOne({
        where: {
          keyword
        }
      });

      if (!dbKeyword) {
        dbKeyword = await this.keyword.save(
          this.keyword.create({
            keyword
          })
        );
      }

      const commands = await this.commands.findOne({
        where: {
          outputText
        }
      });

      if (commands) {
        return {
          success: false,
          message: `[${outputText}]는 이미 등록되어있습니다.`
        }
      }

      await this.commands.save(
        this.commands.create({
          keyword: dbKeyword,
          outputText,
          userName,
        })
      );

      return {
        success: true,
        message: '정상적으로 등록되었습니다',
      }
    } catch (error) {
      return {
        success: false,
        message: 'DB 조회 오류!',
        error,
      }
    }
  }
}