import { Module } from '@nestjs/common';
import { Ex2Service } from './ex2.service';
import { Ex2Controller } from './ex2.controller';

@Module({
  controllers: [Ex2Controller],
  providers: [Ex2Service],
})
export class Ex2Module {}
