import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ChatBotInput, ChatBotOutput } from '../common/dtos/chatBot.dto';
import { party } from '../cache-party';
import { PartyManager } from './services/party-manager.service';
import { CREATE_PARTY, ENTER_PARTY, DELETE_PARTY, EXIT_PARTY, HELP_PARTY, CREATE_USER_COMMNAD, SHOW_USER_COMMAND_LIST, UPDATE_WORKING, HELP_PARTY_DETAIL } from 'src/constants';
import { FIND_PARTY, DELETE_USER_COMMAND, CREATE_WORKING, DELETE_WORKING } from '../constants';
import { PartyUserManager } from './services/party-user-manager.service';
import { Cron } from '@nestjs/schedule';
import { commandList } from './services/commands/index';
import { PartyHelp } from './services/party-help.service';
import { CustomUserCommand } from './services/custom-user-command.service';
import { WorkingListManager } from './services/working-list.service';

/*
  @author AJu (zoz0312)
  Party Manager의 Contoller
  주요 명령어들을 선언 및 호출하는 곳
*/
@Controller('command-manager')
export class CommandManagerController {
  constructor (
    private customUserCommand: CustomUserCommand,
    private partyManager: PartyManager,
    private partyUserManager: PartyUserManager,
    private partyHelp: PartyHelp,
    private workingManager: WorkingListManager,
  ) {}

  @Post()
  async commandManage(
    @Body() chatBotInput: ChatBotInput
  ): Promise<ChatBotOutput> {
    const { msg, sender } = chatBotInput;
    if (msg === undefined || msg === '') {
      return {
        success: false,
        message: '비정상적인 명령어 입니다 (X_x)',
      };
    }

    if (msg[0] === '/') {
      const userCommand = msg.slice(1);
      const command = userCommand.split(' ')[0];

      for (let i=0; i<commandList.length; i++) {
        const type = commandList[i];
        if (type.command.includes(command)) {
          switch (type.name) {
            case FIND_PARTY:
              return this.partyManager.findParty(chatBotInput);
            case CREATE_PARTY:
              return this.partyManager.createParty(chatBotInput);
            case DELETE_PARTY:
              return this.partyManager.deleteParty(chatBotInput);
            case ENTER_PARTY:
              return this.partyUserManager.enterParty(chatBotInput);
            case EXIT_PARTY:
              return this.partyUserManager.exitParty(chatBotInput);
            case HELP_PARTY:
              return this.partyHelp.printHelp();
            case HELP_PARTY_DETAIL:
              return this.partyHelp.printHelpDetail();
            case CREATE_USER_COMMNAD:
              return this.customUserCommand.createUserCommand(chatBotInput);
            case SHOW_USER_COMMAND_LIST:
              return this.customUserCommand.findUserCommand(chatBotInput);
            case DELETE_USER_COMMAND:
              return this.customUserCommand.deleteUserCommand(chatBotInput);

            case CREATE_WORKING:
              return this.workingManager.createWorking(chatBotInput);
            case UPDATE_WORKING:
              return this.workingManager.updateWorking(chatBotInput);
            case DELETE_WORKING:
              return this.workingManager.deleteWorking(chatBotInput);
          }
        }
      }
    }

    return {
      success: false,
      message: '비정상적인 명령어 입니다 (X_x)',
    };
  }

  /* Party Delete Scheduler Every minute on the 0th second */
  @Cron('0 * * * * *')
  deletePartyScheduler() {
    const curDate = new Date();
    Object.keys(party).map(roomName =>
      Object.keys(party[roomName]).map(partyName => {
        if (curDate > party[roomName][partyName].time) {
          delete party[roomName][partyName]
        }
      })
    );
  }

  /*
    매일 정각에 파티 초기화
  */
  @Cron('* * 0 * * *')
  dailyPartyDefine() {
    Object.keys(party).map(room => {
      delete party[room];
    });
  }
}

/*
  translateParty2String
  설명: party Object를 String으로 변환하는 함수
  인자:
   - message: 파티 목록의 맨 마지막에 붙혀줄 메시지
*/
export const translateParty2String = (room = '', message = '') => {
  if (room === '') {
    return '잘못된 방입니다.';
  }

  if (!party[room]) {
    party[room] = {};
  }

  const myRoom = party[room];
  const keys = Object.keys(party[room]);
  let str = '';

  if (keys.length === 0) {
    str = '[파티없음]';
  } else {
    keys.map(key => {
      const date = myRoom[key].time;

      str += `${key} - ${date.getHours()}시`;
      if (date.getMinutes() > 0) {
        str += ` ${date.getMinutes()}분`;
      }
      str += '\n';

      if (myRoom[key].user.length === 0) {
        str += `--- 없음 ---\n`;
      } else {
        myRoom[key].user.map((user, index) => {
          str += `${index+1}. ${user}\n`;
        });
      }
      str += '\n'
    });
  }

  if (message) {
    str += `\n\n${message}`;
  }
  return str;
}
