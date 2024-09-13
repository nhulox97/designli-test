import { Body, Controller, Post } from '@nestjs/common';
import { Ex1Service } from './ex1.service';
import { SnsEventDto } from './dto/sns-event.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SnsResponseDoc } from './doc/sns-response.doc';

@Controller('ex1')
export class Ex1Controller {
  constructor(private readonly ex1Service: Ex1Service) {}

  @Post()
  @ApiOperation({
    summary: 'SES-SNS event parser',
    description: 'Parse an SES-SNS event into a spcific shape',
  })
  @ApiResponse({ status: 201, type: SnsResponseDoc, isArray: true })
  parseSesSns(@Body() body: SnsEventDto) {
    return this.ex1Service.parseSnsSesEvent(body);
  }
}
