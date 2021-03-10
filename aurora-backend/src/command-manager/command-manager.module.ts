import { Module } from '@nestjs/common';
import { CommandManagerController } from './command-manager.controller';

@Module({
  controllers: [CommandManagerController]
})
export class CommandManagerModule {}
