import { party, partyStructure } from '../../cache-party';
import { deepCopy } from 'deep-copy-ts';
import { translateParty2String } from '../command-manager.controller';
import { ChatBotInput, ChatBotOutput } from '../../common/dtos/chatBot.dto';
import { trimInput } from '../../common/trimInput';

export class PartyManager {
  constructor (
  ) {
  }

  findParty () {
    return translateParty2String('지금까지의 파티 목록입니다!');
  }

  createParty(
    chatBotInput :ChatBotInput
  ): ChatBotOutput {
    const [_, arguement] = trimInput(chatBotInput);
    const args = arguement.split(' ');
    const partyName = args[0];
    const times = args.slice(1).join('').replace(/[^0-9]/g, '');

    /* command 정상 입력 유효성 검사 */
    if (!partyName) {
      return {
        success: false,
        message: '파티 이름 오류!',
      }
    }
    if (!times) {
      return {
        success: false,
        message: '시간 입력 오류!',
      }
    }

    /* 파티 이름 중복 유효성 검사 */
    const parties = Object.keys(party);
    for (let i=0; i<parties.length; i++) {
      if (parties[i] === partyName) {
        return {
          success: false,
          message: translateParty2String('이미 존재하는 파티입니다.'),
        }
      }
    }

    /* 시간 입력 범위 유효성 검사 */
    let hours = 0;
    let minutes = 0;
    if (times.length === 3) {
      hours = +times[0];
      minutes = +times.slice(1);
    } else if (times.length === 4) {
      hours = +times.slice(0, 2);
      minutes = +times.slice(2, 4);
    }

    if (hours < 0 && hours > 24) {
      return {
        success: false,
        message: '시간 입력이 잘못되었습니다.',
      }
    }
    if (minutes < 0 && minutes > 59) {
      return {
        success: false,
        message: '분 입력이 잘못되었습니다.',
      }
    }

    const curDate = new Date();
    const partyDate = new Date(
      curDate.getFullYear(),
      curDate.getMonth(),
      curDate.getDate(),
      hours,
      minutes,
      10
    );

    party[partyName] = {
      ...deepCopy(partyStructure),
      time: partyDate,
    }

    return {
      success: true,
      message: translateParty2String('파티가 생성되었습니다!'),
    }
  }

  deleteParty(
    chatBotInput :ChatBotInput
  ): ChatBotOutput {
    const [_, partyName] = trimInput(chatBotInput);
    if (!partyName) {
      return {
        success: false,
        message: '삭제할 파티를 입력해주세요!',
      }
    }

    const parties = Object.keys(party);
    for (let i=0; i<parties.length; i++) {
      if (parties[i] === partyName) {
        delete party[partyName];
        return {
          success: true,
          message: translateParty2String(`${partyName} 파티가 삭제되었습니다!`),
        }
      }
    }
    return {
      success: false,
      message: '존재하지 않는 파티입니다.',
    }
  }
}