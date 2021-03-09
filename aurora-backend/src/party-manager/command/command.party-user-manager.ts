import {
  ENTER_PARTY,
  EXIT_PARTY,
} from "src/constants";

/*
  Party User 관리에 관련된 명령어 목록
*/
export const commandPartyUserManager = [
  {
    name: ENTER_PARTY,
    command: ['파티참', '파티참여'],
  },
  {
    name: EXIT_PARTY,
    command: ['파티탈', '파티탈퇴', '파티떠', '파티떠나', '파티떠나기'],
  }
];