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
    it('should be successful', () => {
      const request = { birthday: '2000-11-20', name: 'Mimo' };
      const cat = service.createCat(request);
      expect(cat).toEqual({ ...request, id: 1 });
    });

    it('should be successful when create 2 cats', () => {
      service.createCat({ birthday: '2000-11-20', name: 'Mimo' });

      const request = { birthday: '2021-10-17', name: 'Lola' };
      const cat = service.createCat(request);
      expect(cat).toEqual({ ...request, id: 2 });
    });
  });

  describe('getCatById', () => {
    it('should be successful', () => {
      const request = { birthday: '2000-11-20', name: 'Mimo' };
      const cat = service.createCat(request);

      const catFound = service.getCatById(cat.id);
      expect(catFound).toEqual(cat);
    });

    it('should throw CatNotFoundException', () => {
      const fn = () => service.getCatById(1);
      expect(fn).toThrow('Cat 1 not found');
    });
  });

  describe('getCats', () => {
    it('should be successful', () => {
      const request = { birthday: '2000-11-20', name: 'Mimo' };
      const cat = service.createCat(request);

      const catsFound = service.getCats({});
      expect(catsFound).toEqual({
        count: 1,
        data: [cat],
        next: null,
        previous: null,
      });
    });

    it('should be successful when page is not 1', () => {
      const cats = [];
      [
        { birthday: '2020-11-20', name: 'Mimo' },
        { birthday: '2019-10-17', name: 'Lola' },
        { birthday: '2018-09-13', name: 'Fifi' },
        { birthday: '2021-05-24', name: 'Chuchu' },
        { birthday: '2021-07-04', name: 'Mingau' },
      ].forEach((req) => {
        cats.push(service.createCat(req));
      });

      const catsFound = service.getCats({ page: 2, size: 2, url: '' });
      expect(catsFound).toEqual({
        count: 5,
        data: cats.slice(2, 4),
        next: '?page=3&size=2',
        previous: '?page=1&size=2',
      });
    });

    it('should be successful when list is empty', () => {
      const catsFound = service.getCats({ page: 1, size: 5, url: '' });
      expect(catsFound).toEqual({
        count: 0,
        data: [],
        next: null,
        previous: null,
      });
    });
  });

  describe('updateCat', () => {
    it('should be successful', () => {
      const request = { birthday: '2000-11-20', name: 'Mimo' };
      service.createCat(request);

      const fn = () =>
        service.updateCat(1, { birthday: '2000-11-20', name: 'Lola' });
      expect(fn).not.toThrow();
    });

    it('should throw CatNotFoundException', () => {
      const fn = () =>
        service.updateCat(1, { birthday: '2000-11-20', name: 'Mimo' });
      expect(fn).toThrow('Cat 1 not found');
    });
  });

  describe('removeCat', () => {
    it('should be successful', () => {
      const request = { birthday: '2000-11-20', name: 'Mimo' };
      service.createCat(request);

      const fn = () => service.removeCat(1);
      expect(fn).not.toThrow();
    });
  });
});
