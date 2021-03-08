import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { PartyManagerDto } from './dtos/party-manager.dto';
import { party } from '../cache-party';
import { PartyManager } from './party-manager';
import { CREATE_PARTY, ENTER_PARTY } from 'src/constants';
import { FIND_PARTY } from '../constants';
import { PartyUserManager } from './party-user-manager';

/*
 Party Manager의 Contoller
 주요 명령어들을 호출하는 곳
*/


const commandSetting = [
  {
    name: FIND_PARTY,
    command: [
      '파',
      '파티',
      '파티리',
      '파티리스',
      '파티리스트',
    ]
  },
  {
    name: CREATE_PARTY,
    command: [],
  },
  {
    name: ENTER_PARTY,
    command: ['파티참', '파티참여'],
  },
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
      const rmSlash = msg.slice(1);
      console.log('rmSlash', rmSlash)
      const partyManager = new PartyManager(rmSlash);
      const partyUserManager = new PartyUserManager(rmSlash, sender);
      const command = msg.split(' ')[0].slice(1);

      console.log('command', command)

      for (let i=0; i<commandSetting.length; i++) {
        const type = commandSetting[i];
        if (type.command.includes(command)) {
          if (type.name === FIND_PARTY) {
            return partyTranslateString(partyManager.findParty());
          } else if (type.name === ENTER_PARTY) {
            return partyTranslateString(partyUserManager.enterParty());
          }
        }
      }
    }

    return '비정상적인 명령어 입니다 (X_x)';
  }
}

const partyTranslateString = (party) => {
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
  });
  return str;
}
