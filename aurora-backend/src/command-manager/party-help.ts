import { commandList } from './command/index';

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