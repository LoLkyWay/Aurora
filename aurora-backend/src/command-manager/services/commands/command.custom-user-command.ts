import { USER_COMMNAD } from "src/constants";

/*
  User Command 추가를 위한 명령어 목록
*/
export const commandCustomUserCommand: commandDTO[] = [
  {
    name: USER_COMMNAD,
    command: ['학습하기', '학습', '가르치기', '가르'],
    desc: '오로라 학습하기',
    argumentDesc: ['(학습키워드)::(내용)'],
  },
];