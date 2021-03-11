import { Module } from '@nestjs/common';
import { CommandManagerController } from './command-manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commands } from '../user-custom-command/entities/commands.entitiy';
import { Keyword } from '../user-custom-command/entities/keyword.entitiy';
import { CustomUserCommand } from './commands/custom-user-command.service';

@Module({
  imports: [TypeOrmModule.forFeature([Commands, Keyword])],
  controllers: [CommandManagerController],
  providers: [CustomUserCommand],
})
export class CommandManagerModule {}
