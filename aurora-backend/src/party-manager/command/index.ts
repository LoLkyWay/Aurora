import { commandPartyManager } from "./command.party-manager";
import { commandPartyUserManager } from './command.party-user-manager';
import { commandPartyHelp } from './command.party-help';

/*
  주요 명령어 묶는 곳
*/
export const commandList: commandDTO[] = [
  ...commandPartyManager,
  ...commandPartyUserManager,
  ...commandPartyHelp,
];