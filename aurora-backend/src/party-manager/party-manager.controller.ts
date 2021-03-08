import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { PartyManagerDto } from './dtos/party-manager.dto';

/*
*/

@Controller('party-manager')
export class PartyManagerController {
  @Get()
  findParty(): string {
    return 'Nothing';
  }

  @Post('')
  enterParty(@Body() partyManagerDto: PartyManagerDto): string {
    return 'asd';
  }
}
