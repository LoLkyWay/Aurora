import { SHOW_USER_COMMAND_LIST, CREATE_USER_COMMNAD } from "src/constants";
import { DELETE_USER_COMMAND } from '../../../constants';

/*
  @author AJu (zoz0312)
  User Command 추가를 위한 명령어 목록
*/
export const commandCustomUserCommand: commandDTO[] = [
  {
    name: CREATE_USER_COMMNAD,
    command: ['학습하기', '학습', '가르치기', '가르'],
    desc: '오로라 학습하기',
    argumentDesc: ['(학습키워드)::(내용)'],
  },
  {
    name: SHOW_USER_COMMAND_LIST,
    command: ['학습내역', '가르치기내역'],
    desc: '오로라 학습 내역보기',
    argumentDesc: ['학습키워드'],
  },
  {
    name: DELETE_USER_COMMAND,
    command: ['학습제거', '학습삭제'],
    desc: '==미지원기능==',
    argumentDesc: ['[일부삭제](학습키워드)::(ID) 또는 [전체삭제](학습키워드)::(all)'],
  }
];