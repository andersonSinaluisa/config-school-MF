import { DEFAULT_DATE_FORMAT } from './constants';

type DateInput = string | number | Date;

const parseDate = (value: DateInput): Date => {
  if (value instanceof Date) {
    return value;
  }

  return new Date(value);
};

export const formatDate = (
  value: DateInput,
  locale: string = 'es-ES',
  options?: Intl.DateTimeFormatOptions,
): string => {
  const date = parseDate(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  if (options) {
    return new Intl.DateTimeFormat(locale, options).format(date);
  }

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};

export const formatDateRange = (
  start: DateInput,
  end: DateInput,
  locale: string = 'es-ES',
  options?: Intl.DateTimeFormatOptions,
): string => {
  const startDate = formatDate(start, locale, options);
  const endDate = formatDate(end, locale, options);

  if (!startDate && !endDate) {
    return '';
  }

  if (!startDate) {
    return endDate;
  }

  if (!endDate) {
    return startDate;
  }

  return `${startDate} - ${endDate}`;
};

export const toISODate = (value: DateInput): string => {
  const date = parseDate(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toISOString().split('T')[0] ?? DEFAULT_DATE_FORMAT;
};

export const sortByName = <T extends { name: string }>(items: T[]): T[] =>
  [...items].sort((a, b) => a.name.localeCompare(b.name, 'es'));
