import { Module } from '@nestjs/common';
import { Ex1Service } from './ex1.service';
import { Ex1Controller } from './ex1.controller';

@Module({
  controllers: [Ex1Controller],
  providers: [Ex1Service],
})
export class Ex1Module {}
