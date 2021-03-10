import { Module } from '@nestjs/common';
import { UserCustomCommandController } from './user-custom-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commands } from './entities/commands.entitiy';
import { Keyword } from './entities/keyword.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([
    Commands,
    Keyword,
  ])],
  controllers: [UserCustomCommandController]
})
export class UserCustomCommandModule {}
