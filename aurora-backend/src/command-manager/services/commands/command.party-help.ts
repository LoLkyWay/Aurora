import {
  HELP_PARTY,
} from '../../../constants';

/*
  @author AJu (zoz0312)
  Party 관리에 관련된 명령어 목록
*/
export const commandPartyHelp: commandDTO[] = [
  {
    name: HELP_PARTY,
    command: ['도', '도움', '도움말', '사용', '사용법'],
    desc: '도움말',
  },
];