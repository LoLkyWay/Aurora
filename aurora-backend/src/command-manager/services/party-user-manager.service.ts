import { party } from '../../cache-party';
import { ChatBotInput, ChatBotOutput } from '../../common/dtos/chatBot.dto';
import { trimInput } from '../../common/trimInput';

/*
  @author AJu (zoz0312)
  Party 참가 유저 관련 명령어
*/
export class PartyUserManager {
  constructor (
  ) {
  }

  /*
    enterParty
     - 파티에 참여하는 유저
  */
  enterParty(
    chatBotInput :ChatBotInput
  ): ChatBotOutput {
    const { sender } = chatBotInput;
    const [_, partyName] = trimInput(chatBotInput);
    if (!partyName) {
      return {
        success: false,
        message: '참여할 파티를 입력해주세요!',
      }
    }

    if (Object.keys(party).includes(partyName)) {
      if (party[partyName].user.includes(sender)) {
        return {
          success: false,
          message: `이미 참여한 파티입니다!`,
        }
      }
      let maximum = 5;
      if (partyName.includes('내전')) {
        maximum = 10;
      }
      if (party[partyName].user.length >= maximum) {
        return {
          success: false,
          message: '파티가 꽉 찼습니다 ㅠ.ㅠ',
        }
      }
      party[partyName].user.push(sender);

      return {
        success: true,
        message: `${partyName} 파티에 참여하였습니다.`,
      }
    }

    return {
      success: false,
      message: `참여할 파티가 존재하지 않습니다.`,
    }
  }

  /*
    exitParty
     - 파티에 떠나는 유저
  */
  exitParty(
    chatBotInput :ChatBotInput
  ): ChatBotOutput {
    const { sender } = chatBotInput;
    const [_, partyName] = trimInput(chatBotInput);

    if (!partyName) {
      return {
        success: false,
        message: '떠날 파티를 입력해주세요!',
      }
    }

    if (Object.keys(party).includes(partyName)) {
      const idx = party[partyName].user.indexOf(sender);
      if (idx !== -1) {
        party[partyName].user.splice(idx, 1);
        return {
          success: true,
          message: `${partyName} 파티에서 떠났습니다~ :D`,
        }
      }
      return {
        success: false,
        message: '떠날 파티가 없습니다.. ㅜ.ㅜ',
      }
    }
    return {
      success: false,
      message: '존재하지 않는 파티입니다. O_o!',
    }
  }
}