// Manger Parameters
import { CoreOutput } from './output.dto';
export class ChatBotInput {
  room: string; // 방 이름
  msg: string; // 메시지
  sender: string; // 보낸이
  isGroupChat: boolean; // 단체/오픈채팅 여부
  image: string; // Profile Image base64
};

export class ChatBotOutput extends CoreOutput {

}