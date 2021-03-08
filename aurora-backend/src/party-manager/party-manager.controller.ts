import { Controller, Post, Get } from '@nestjs/common';

@Controller('party-manager')
export class PartyManagerController {
  @Get()
  findParty(): string {
    return 'Nothing';
  }
}
