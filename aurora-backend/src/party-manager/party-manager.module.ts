import { Module } from '@nestjs/common';
import { PartyManagerController } from './party-manager.controller';

@Module({
  controllers: [PartyManagerController]
})
export class PartyManagerModule {}
