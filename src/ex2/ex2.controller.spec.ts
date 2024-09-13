import { Test, TestingModule } from '@nestjs/testing';
import { Ex2Controller } from './ex2.controller';
import { Ex2Service } from './ex2.service';

describe('Ex2Controller', () => {
  let controller: Ex2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Ex2Controller],
      providers: [Ex2Service],
    }).compile();

    controller = module.get<Ex2Controller>(Ex2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
