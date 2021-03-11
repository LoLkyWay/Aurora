
import { ChatBotInput } from './dtos/chatBot.dto';

export const trimInput = ({
  room,
  msg,
  sender,
  isGroupChat,
  image,
}: ChatBotInput) => {
  const totalCommand = msg.slice(1);
  const splitMsg = totalCommand.split(' ');
  const command = splitMsg[0];
  const argument = splitMsg.slice(1).join(' ');

  return [command, argument];
}