import { party } from '../cache-party';

export class PartyUserManager {
  private msg: string;
  private sender: string;
  private command: string;
  private argument: string;

  constructor (
    msg: string,
    sender: string,
  ) {
    this.msg = msg;
    this.sender = sender;
    this.command = msg.split(' ')[0];
    this.argument = msg.split(' ')[1];
  }

  enterParty() {
    const [_, partyName] = this.msg.split(' ');
    if (!partyName) {
      return '참여할 파티를 입력해주세요!';
    }

    if (Object.keys(party).includes(partyName)) {
      // add user
      if (party[partyName].user.includes(this.sender)) {
        return `이미 참여한 파티입니다!`;
      }
      party[partyName].user.push(this.sender);
      return party;
    }
     else {
      return '참여할 파티가 존재하지 않습니다.'
    }
  }

  exitParty() {

  }
}