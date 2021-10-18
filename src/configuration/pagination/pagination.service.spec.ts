import { getNextPage, getPreviousPage } from './pagination.service';

describe('PaginationService', () => {
  describe('getNextPage', () => {
    it('should be successful', () => {
      const page = getNextPage('', 1, 1, 2);
      expect(page).toEqual('?page=2&size=1');
    });

    it('should be null', () => {
      const page = getNextPage('', 1, 1, 1);
      expect(page).toBeNull();
    });
  });

  describe('getPreviousPage', () => {
    it('should be successful', () => {
      const page = getPreviousPage('', 2, 1);
      expect(page).toEqual('?page=1&size=1');
    });

    it('should be null', () => {
      const page = getPreviousPage('', 1, 1);
      expect(page).toBeNull();
    });
  });
});
