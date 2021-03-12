
import { CREATE_WORKING, UPDATE_WORKING, DELETE_WORKING } from '../../../constants';
/*
  @author AJu (zoz0312)
  룽지님 working list
*/
export const commandWorkingListManager: commandDTO[] = [
  {
    name: CREATE_WORKING,
    command: ['작업생성'],
    desc: '작업 생성',
    argumentDesc: ['유저이름::챔피언'],
  },
  {
    name: UPDATE_WORKING,
    command: ['작업수정'],
    desc: '작업 상태 수정',
    argumentDesc: ['ID', '(상태 - 0: todo, 1: working, 2: finish)'],
  },
  {
    name: DELETE_WORKING,
    command: ['작업삭제'],
    desc: '작업 상태 삭제',
    argumentDesc: ['ID'],
  },
];