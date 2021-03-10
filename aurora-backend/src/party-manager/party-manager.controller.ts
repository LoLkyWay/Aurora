import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { PartyManagerDto } from './dtos/party-manager.dto';
import { party, partyStructure } from '../cache-party';
import { PartyManager } from './party-manager';
import { CREATE_PARTY, ENTER_PARTY, DELETE_PARTY, EXIT_PARTY } from 'src/constants';
import { FIND_PARTY } from '../constants';
import { PartyUserManager } from './party-user-manager';
import { Cron } from '@nestjs/schedule';
import { commandList } from './command/index';
import { deepCopy } from 'deep-copy-ts';

/*
 Party Manager의 Contoller
 주요 명령어들을 선언 및 호출하는 곳
*/

@Controller('party-manager')
export class PartyManagerController {
  @Post()
  partyManage(@Body() {
    room,
    msg,
    sender,
    isGroupChat,
    image,
  }: PartyManagerDto): string {
    if (msg === undefined || msg === '') {
      return '비정상적인 명령어 입니다 (X_x)';
    }

    if (msg[0] === '/') {
      const userCommand = msg.slice(1);
      const partyManager = new PartyManager(userCommand);
      const partyUserManager = new PartyUserManager(userCommand, sender);
      const command = msg.split(' ')[0].slice(1);

      for (let i=0; i<commandList.length; i++) {
        const type = commandList[i];
        if (type.command.includes(command)) {
          switch (type.name) {
            case FIND_PARTY:
              return partyManager.findParty();
            case CREATE_PARTY:
              return partyManager.createParty();
            case DELETE_PARTY:
              return partyManager.deleteParty();
            case ENTER_PARTY:
              return partyUserManager.enterParty();
            case EXIT_PARTY:
              return partyUserManager.exitParty();
          }
        }
      }
    }

    return '비정상적인 명령어 입니다 (X_x)';
  }

  /* Party Delete Scheduler Every minute on the 0th second */
  @Cron('0 * * * * *')
  deletePartyScheduler() {
    const curDate = new Date();
    Object.keys(party).map(partyName => {
      if (curDate > party[partyName].time) {
        delete party[partyName]
      }
    });
  }

  /*
    매일 정각에 파티 초기화
  */
  @Cron('* * 0 * * *')
  dailyPartyDefine() {
    const curDate = new Date();
    const rank = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      curDate.getDate(),
      21,
      0,
      10
    );
    const teamFight = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      curDate.getDate(),
      22,
      0,
      10
    );
    party['매일자랭'] = {
      ...deepCopy(partyStructure),
      time: rank,
    };
    party['정기내전'] = {
      ...deepCopy(partyStructure),
      time: teamFight,
    };
  }
}

/*
  translateParty2String
  설명: party Object를 String으로 변환하는 함수
  인자:
   - message: 파티 목록의 맨 마지막에 붙혀줄 메시지
*/
export const translateParty2String = (message = '') => {
  const keys = Object.keys(party);
  let str = '';
  keys.map(key => {
    const date = party[key].time;

    str += `${key} - ${date.getHours()}시`;
    if (date.getMinutes() > 0) {
      str += ` ${date.getMinutes()}분`;
    }
    str += '\n';

    if (party[key].user.length === 0) {
      str += `=== 없음 ===\n`;
    } else {
      party[key].user.map((user, index) => {
        str += `${index+1}. ${user}\n`;
      });
    }
    str += '-------------\n'
  });

  if (message) {
    str += `\n\n${message}`;
  }
  return str;
}
