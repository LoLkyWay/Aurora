import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { PartyManagerDto } from './dtos/party-manager.dto';
import { party } from '../cache-party';

/*
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
      const command = msg.slice(1);
      if (command === '파'
        || command === '파티'
        || command === '파티리'
        || command === '파티리스'
        || command === '파티리스트'
      ) {
        return partyTranslateString(party);
      }
    }

    return 'asd';
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
