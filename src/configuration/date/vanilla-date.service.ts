export function yyyyMMddToDate(date: string): Date {
  const [yyyy, mm, dd] = date.split('-');
  return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
}

export function dateToyyyyMMdd(date: Date): string {
  return date.toISOString().split('T')[0];
}
