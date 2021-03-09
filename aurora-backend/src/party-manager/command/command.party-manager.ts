import {
  FIND_PARTY,
  CREATE_PARTY,
  DELETE_PARTY,
} from '../../constants';

/*
  Party 관리에 관련된 명령어 목록
*/
export const commandPartyManager = [
  {
    name: FIND_PARTY,
    command: ['파', '파티', '파티리', '파티리스', '파티리스트']
  },
  {
    name: CREATE_PARTY,
    command: ['파티생', '파티생성'],
  },
  {
    name: DELETE_PARTY,
    command: ['파티삭', '파티삭제', '파티제', '파티제거'],
  },
];