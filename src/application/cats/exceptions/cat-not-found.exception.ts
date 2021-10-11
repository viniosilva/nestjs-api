export class CatNotFoundException extends Error {
  constructor(catId: number) {
    super(`Cat ${catId} not found`);
  }
}
