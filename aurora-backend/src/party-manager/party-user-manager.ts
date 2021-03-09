import { party } from '../cache-party';
import { translateParty2String } from './party-manager.controller';

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
      party[partyName].user.push(this.sender);
      return translateParty2String('파티에 참여하였습니다.');
    } else {
      return '참여할 파티가 존재하지 않습니다.';
    }
  }

  /*
    exitParty
     - 파티에 떠나는 유저
  */
  exitParty() {
    return translateParty2String('떠날 파티가 없습니다.. ㅜ.ㅜ');
  }
}