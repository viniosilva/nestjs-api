import { dateToyyyyMMdd, yyyyMMddToDate } from './vanilla-date.service';

describe('VanillaDateService', () => {
  describe('yyyyMMddToDate', () => {
    it('should be successful', () => {
      const date = yyyyMMddToDate('2000-12-31');
      expect(date.getFullYear()).toEqual(2000);
      expect(date.getMonth()).toEqual(11);
      expect(date.getDate()).toEqual(31);
    });
  });

  describe('dateToyyyyMMdd', () => {
    it('should return "request"', () => {
      const date = yyyyMMddToDate('2000-12-31');
      const dateString = dateToyyyyMMdd(date);

      expect(dateString).toEqual('2000-12-31');
    });
  });
});
