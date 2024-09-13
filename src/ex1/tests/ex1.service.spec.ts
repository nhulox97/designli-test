import { Test, TestingModule } from '@nestjs/testing';
import { Ex1Service } from '../ex1.service';
import { parsedSnsEventMock, snsSesEventMock } from './mocks/data.mock';

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

  describe('parseSnsSesEvent', () => {
    describe('when the event did pass all verdicts', () => {
      it('should return dns, spam, and virus as truthy', async () => {
        const result = service.parseSnsSesEvent(snsSesEventMock);

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual(parsedSnsEventMock);
        expect(result[0].dns).toBeTruthy();
        expect(result[0].spam).toBeTruthy();
        expect(result[0].virus).toBeTruthy();
      });
    });
  });
});
