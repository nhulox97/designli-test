import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Ex2Service } from './ex2.service';
import { CreateEx2Dto } from './dto/create-ex2.dto';
import { UpdateEx2Dto } from './dto/update-ex2.dto';

@Controller('ex2')
export class Ex2Controller {
  constructor(private readonly ex2Service: Ex2Service) {}

  @Post()
  create(@Body() createEx2Dto: CreateEx2Dto) {
    return this.ex2Service.create(createEx2Dto);
  }

  @Get()
  findAll() {
    return this.ex2Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ex2Service.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEx2Dto: UpdateEx2Dto) {
    return this.ex2Service.update(+id, updateEx2Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ex2Service.remove(+id);
  }
}
