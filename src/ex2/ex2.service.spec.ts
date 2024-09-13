import { Test, TestingModule } from '@nestjs/testing';
import { Ex2Service } from './ex2.service';

describe('Ex2Service', () => {
  let service: Ex2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Ex2Service],
    }).compile();

    service = module.get<Ex2Service>(Ex2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
