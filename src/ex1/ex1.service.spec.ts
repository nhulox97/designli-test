import { Test, TestingModule } from '@nestjs/testing';
import { Ex1Service } from './ex1.service';

describe('Ex1Service', () => {
  let service: Ex1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Ex1Service],
    }).compile();

    service = module.get<Ex1Service>(Ex1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
