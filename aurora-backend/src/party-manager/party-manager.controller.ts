import { Controller, Post, Get, Param } from '@nestjs/common';

/*
*/

@Controller('party-manager')
export class PartyManagerController {
  @Get()
  findParty(): string {
    return 'Nothing';
  }

  @Post(':user')
  enterParty(@Param('user') user: string): string {
    return 'asd';
  }
}
