import { party } from '../cache-party';

export class PartyManager {
  private msg: string;
  private command: string;
  private argument: string;

  constructor (
    msg: string,
  ) {
    this.msg = msg;
    this.command = msg.split(' ')[0];
    this.argument = msg.split(' ')[1];
  }

  findParty () {
    return party;
  }

  createParty() {

  }

  deleteParty() {

  }
}