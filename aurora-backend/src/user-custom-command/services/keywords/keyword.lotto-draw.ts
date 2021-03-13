
import { RANDOM_LOTTO, RANDOM_PENTION_LOTTO } from '../../../constants';

export const keywordLottoDraw: commandDTO[] = [
  {
    name: RANDOM_LOTTO,
    command: ['로또'],
    desc: '랜덤 로또 생성기',
  },
  {
    name: RANDOM_PENTION_LOTTO,
    command: ['연금복권'],
    desc: '랜덤 로또 생성기',
  },
]