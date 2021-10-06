import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsService],
    }).compile();

    service = module.get(CatsService);
  });

  describe('createCat', () => {
    it('should be defined', () => {
      const request = { birthday: '2000-11-20', name: 'Mimo' };
      const cat = service.createCat(request);
      expect(cat).toEqual({ ...request, id: 1 });
    });
  });
});
