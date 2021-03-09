import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { PartyManagerDto } from './dtos/party-manager.dto';
import { party } from '../cache-party';
import { PartyManager } from './party-manager';
import { CREATE_PARTY, ENTER_PARTY, DELETE_PARTY } from 'src/constants';
import { FIND_PARTY } from '../constants';
import { PartyUserManager } from './party-user-manager';
import { Cron } from '@nestjs/schedule';

/*
 Party Manager의 Contoller
 주요 명령어들을 선언 및 호출하는 곳
*/


/*
  commandSetting
  주요 명령어 등록하는 변수
*/
const commandSetting = [
  {
    name: FIND_PARTY,
    command: ['파', '파티', '파티리', '파티리스', '파티리스트']
  },
  {
    name: CREATE_PARTY,
    command: ['파티생', '파티생성'],
  },
  {
    name: ENTER_PARTY,
    command: ['파티참', '파티참여'],
  },
  {
    name: DELETE_PARTY,
    command: ['파티삭', '파티삭제', '파티제', '파티제거'],
  }
]

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

      for (let i=0; i<commandSetting.length; i++) {
        const type = commandSetting[i];
        if (type.command.includes(command)) {
          if (type.name === FIND_PARTY) {
            return translateParty2String(partyManager.findParty());
          } else if (type.name === CREATE_PARTY) {
            return translateParty2String(partyManager.createParty());
          } else if (type.name === DELETE_PARTY) {
            return translateParty2String(partyManager.deleteParty());
          } else if (type.name === ENTER_PARTY) {
            return translateParty2String(partyUserManager.enterParty());
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
}

/*
  translateParty2String
  설명: party Object를 String으로 변환하는 함수
  인자:
   - message: 파티 목록의 맨 마지막에 붙혀줄 메시지
*/
const translateParty2String = (message = '') => {
  const keys = Object.keys(party);
  let str = '';
  keys.map(key => {
    const date = party[key].time;
    str += `${key} - ${date.getHours()}시 ${date.getMinutes()}분\n`;
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
