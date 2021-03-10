import { Module } from '@nestjs/common';
import { UserCustomCommandController } from './user-custom-command.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commands } from './entities/commands.entitiy';
import { Keywords } from './entities/keywords.entitiy';

@Module({
  imports: [TypeOrmModule.forFeature([
    Commands,
    Keywords,
  ])],
  controllers: [UserCustomCommandController]
})
export class PartyManagerModule {}
