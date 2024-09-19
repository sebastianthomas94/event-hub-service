import { Test, TestingModule } from '@nestjs/testing';
import { JodoService } from './jodo.service';

describe('JodoService', () => {
  let service: JodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JodoService],
    }).compile();

    service = module.get<JodoService>(JodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
