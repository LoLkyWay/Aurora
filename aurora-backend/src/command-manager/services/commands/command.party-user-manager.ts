import {
  ENTER_PARTY,
  EXIT_PARTY,
} from "src/constants";

/*
  @author AJu (zoz0312)
  Party User 관리에 관련된 명령어 목록
*/
export const commandPartyUserManager: commandDTO[] = [
  {
    name: ENTER_PARTY,
    command: ['파티참', '파티참여', '파참'],
    desc: '파티 참여',
    argumentDesc: ['파티이름'],
  },
  {
    name: EXIT_PARTY,
    command: ['파티탈', '파티탈퇴', '파탈'],
    desc: '파티 탈퇴',
    argumentDesc: ['파티이름'],
  }
];