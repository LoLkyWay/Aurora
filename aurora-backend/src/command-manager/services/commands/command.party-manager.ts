import {
  FIND_PARTY,
  CREATE_PARTY,
  DELETE_PARTY,
} from '../../../constants';

/*
  Party 관리에 관련된 명령어 목록
*/
export const commandPartyManager: commandDTO[] = [
  {
    name: FIND_PARTY,
    command: ['파', '파티', '파티리', '파티리스', '파티리스트', '파리'],
    desc: '파티 조회',
  },
  {
    name: CREATE_PARTY,
    command: ['파티생', '파티생성', '파생'],
    desc: '파티 생성',
    argumentDesc: ['파티이름', '시간 (1500, 15:00, 15시 00분)'],
  },
  {
    name: DELETE_PARTY,
    command: ['파티삭', '파티삭제', '파티제', '파티제거', '파삭', '파제'],
    desc: '파티 삭제',
    argumentDesc: ['파티이름'],
  },
];