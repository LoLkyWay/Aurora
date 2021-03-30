import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Commands } from '../../user-custom-command/entities/commands.entitiy';
import { Keyword } from '../../user-custom-command/entities/keyword.entitiy';
import { ChatBotInput, ChatBotOutput } from '../../common/dtos/chatBot.dto';
import { trimInput } from '../../common/trimInput';
import { CommandsRepository } from '../../user-custom-command/repositories/commands.repository';
import { KeywordRepository } from '../../user-custom-command/repositories/keyword.repository';

/*
  @author AJu (zoz0312)
  Custom User Command를 등록 및 삭제하는 곳
*/
@Injectable()
export class CustomUserCommand {
  constructor (
    private readonly commands: CommandsRepository,
    private readonly keyword: KeywordRepository,
  ) {}

  async readUserCommand(
  ): Promise<ChatBotOutput> {
    const allKeyword = await this.keyword.find({
      relations: ['commands'],
    });
    const rtnText = allKeyword.map(item => {
      return `[${item.keyword}] => ${item.commands.length}개`;
    })
    return {
      success: true,
      message: rtnText.join('\n'),
    }
  }

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
          outputText,
          keyword: dbKeyword,
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

      let text = `-- "${keyword}" 학습 내역 --\n`;
      text += outputText.commands.map(({
        id,
        userName,
        createdAt,
        outputText,
      }, index) => {
        const date = `${createdAt.getFullYear()}.${createdAt.getMonth() + 1}.${createdAt.getDate()}. ${createdAt.getHours()}:${createdAt.getMinutes()}`;
        return `[ID: ${index}, author: ${userName} (${date})]\n${outputText}`
      }).join('\n');

      return {
        success: true,
        message: text,
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
    const { sender: userName } = chatBotInput;
    const [_, arguement] = trimInput(chatBotInput);
    const [keyword, arg] = arguement.split('::');

    if (!keyword) {
      return {
        success: false,
        message: '키워드가 존재하지 않습니다!',
      }
    }

    const idx = +arg;
    if (idx < 0 && arg !== 'all') {
      return {
        success: false,
        message: 'index 범위가 벗어납니다',
      }
    }

    try {
      if (arg === 'all') {
        // 전체삭제
        const key = await this.keyword.findOne({
          where: { keyword },
          relations: ['commands'],
        });

        await this.keyword.softRemove(key);

        return {
          success: true,
          message: `"${keyword}" 키워드 전체 삭제 완료`,
        }
      } else {
        // 부분삭제
        const key = await this.keyword.findOne({
          where: { keyword },
          relations: ['commands'],
        });

        if (!key.commands[idx]) {
          return {
            success: false,
            message: '삭제하려는 ID가 없습니다.',
          }
        }

        await this.commands.softDelete(key.commands[idx].id);

        return {
          success: true,
          message: `"${key.commands[idx].outputText}" 답변 삭제 완료`,
        }
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