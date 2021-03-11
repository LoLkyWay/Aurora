import { party } from '../../cache-party';
import { translateParty2String } from '../command-manager.controller';

export class PartyUserManager {
  private sender: string;
  private command: string;
  private argument: string;

  constructor (
    command: string,
    sender: string,
  ) {
    const splitMsg = command.split(' ');
    this.sender = sender;
    this.command = splitMsg[0];
    this.argument = splitMsg.slice(1).join(' ');
  }

  /*
    enterParty
     - 파티에 참여하는 유저
  */
  enterParty() {
    const partyName = this.argument;
    if (!partyName) {
      return '참여할 파티를 입력해주세요!';
    }

    if (Object.keys(party).includes(partyName)) {
      if (party[partyName].user.includes(this.sender)) {
        return `이미 참여한 파티입니다!`;
      }
      let maximum = 5;
      if (partyName.includes('내전')) {
        maximum = 10;
      }
      if (party[partyName].user.length >= maximum) {
        return '파티가 꽉 찼습니다 ㅠ.ㅠ';
      }
      party[partyName].user.push(this.sender);
      return translateParty2String('파티에 참여하였습니다.');
    }
    return '참여할 파티가 존재하지 않습니다.';
  }

  /*
    exitParty
     - 파티에 떠나는 유저
  */
  exitParty() {
    const partyName = this.argument;
    if (!partyName) {
      return '떠날 파티를 입력해주세요!';
    }

    if (Object.keys(party).includes(partyName)) {
      const idx = party[partyName].user.indexOf(this.sender);
      if (idx !== -1) {
        party[partyName].user.splice(idx, 1);
        return translateParty2String(`${partyName} 파티에서 떠났습니다~ :D`);
      }
      return '떠날 파티가 없습니다.. ㅜ.ㅜ';
    }
    return translateParty2String('존재하지 않는 파티입니다. O_o!');
  }
}