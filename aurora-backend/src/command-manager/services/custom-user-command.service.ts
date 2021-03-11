import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Commands } from '../../user-custom-command/entities/commands.entitiy';
import { Keyword } from '../../user-custom-command/entities/keyword.entitiy';
import { ChatBotInput, ChatBotOutput } from '../../common/dtos/chatBot.dto';
import { trimInput } from '../../common/trimInput';

/*
  @author AJu (zoz0312)
  Custom User Command를 등록 및 삭제하는 곳
*/
@Injectable()
export class CustomUserCommand {
  constructor (
    @InjectRepository(Commands)
    private readonly commands: Repository<Commands>,
    @InjectRepository(Keyword)
    private readonly keyword: Repository<Keyword>,
  ) {}

  async createUserCommand(
    chatBotInput :ChatBotInput
  ): Promise<ChatBotOutput> {
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

  async findUserCommand(
    chatBotInput :ChatBotInput
  ): Promise<ChatBotOutput> {
    const [_, keyword] = trimInput(chatBotInput);

    if (!keyword) {
      return {
        success: false,
        message: '키워드를 입력해주세요!'
      }
    }
    try {
      const outputText = await this.keyword.findOne({
        where: { keyword },
        relations: ['commands'],
      });
      const returnText = outputText.commands.map(({
        id,
        userName,
        createdAt,
        outputText,
      }) => {
        const date = `${createdAt.getFullYear()}/${createdAt.getMonth() + 1}/${createdAt.getDate()} ${createdAt.getHours()}:${createdAt.getMinutes()}`;
        return `-- "${keyword}" 학습 내역 --\n[ID: ${id}, author: ${userName}, date: ${date}]\n${outputText}`
      });
      return {
        success: true,
        message: returnText.join('\n'),
      }
    } catch (error) {
      return {
        success: false,
        message: 'DB 조회 오류!',
        error,
      }
    }
  }

  async deleteUserCommand(
    chatBotInput :ChatBotInput
  ): Promise<ChatBotOutput> {
    try {

    } catch (error) {
      return {
        success: false,
        message: 'DB 조회 오류!',
        error,
      }
    }
  }
}