export function getPreviousPage(
  url: string,
  page: number,
  size: number,
): string {
  if (page <= 1) return null;

  const params = new URLSearchParams();
  params.set('page', String(page - 1));
  params.set('size', String(size));

  return `${url}?${params.toString()}`;
}

export function getNextPage(
  url: string,
  page: number,
  size: number,
  count: number,
): string {
  if (page * size >= count) return null;

  const params = new URLSearchParams();
  params.set('page', String(page + 1));
  params.set('size', String(size));

  return `${url}?${params.toString()}`;
}

export function getStart(page: number, size: number): number {
  return (page - 1) * size;
}

export function getEnd(page: number, size: number): number {
  return getStart(page, size) + size;
}
