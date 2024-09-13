import { Injectable } from '@nestjs/common';
import { CreateEx2Dto } from './dto/create-ex2.dto';
import { UpdateEx2Dto } from './dto/update-ex2.dto';

@Injectable()
export class Ex2Service {
  create(createEx2Dto: CreateEx2Dto) {
    return 'This action adds a new ex2';
  }

  findAll() {
    return `This action returns all ex2`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ex2`;
  }

  update(id: number, updateEx2Dto: UpdateEx2Dto) {
    return `This action updates a #${id} ex2`;
  }

  remove(id: number) {
    return `This action removes a #${id} ex2`;
  }
}
