import { commandList } from './commands/index';

/*
  @author AJu (zoz0312)
  Party 도움말 관련 명령어
*/
export class PartyHelp {
  constructor() {}

  printHelp() {
    let commandDesc = '';
    commandList.map(({
      command,
      name,
      desc,
      argumentDesc = [],
    }) => {
      commandDesc += `[${desc}]\n`;
      command.map(item => {
        commandDesc += `/${item}`;
        if (argumentDesc.length !== 0) {
          argumentDesc.map(arg => {
            commandDesc += ` {${arg}}`;
          });
        }
        commandDesc += '\n';
      });
      commandDesc += '\n';
    });
    return commandDesc;
  }
}