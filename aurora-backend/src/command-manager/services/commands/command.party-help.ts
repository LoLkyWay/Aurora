import {
  HELP_PARTY, HELP_PARTY_DETAIL,
} from '../../../constants';

/*
  @author AJu (zoz0312)
  Party 관리에 관련된 명령어 목록
*/
export const commandPartyHelp: commandDTO[] = [
  {
    name: HELP_PARTY,
    command: ['도', '도움말', '사용법'],
    desc: '도움말',
  },
  {
    name: HELP_PARTY_DETAIL,
    command: ['상세도움말'],
    desc: '상세도움말',
  },
];