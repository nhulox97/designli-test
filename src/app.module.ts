import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Ex1Module } from './ex1/ex1.module';
import { Ex2Module } from './ex2/ex2.module';

@Module({
  imports: [Ex1Module, Ex2Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
