export const SORT_OPTIONS = [
  { value: 'createdAt-desc', label: 'Сначала новые' },
  { value: 'createdAt-asc', label: 'Сначала старые' },
  { value: 'price-asc', label: 'Сначала дешевые' },
  { value: 'price-desc', label: 'Сначала дорогие' },
  { value: 'priority-desc', label: 'Сначала срочные' },
  { value: 'priority-asc', label: 'Сначала обычные' },
] as const;

export const DEFAULT_SORT = 'createdAt-desc';

export type SortValue = (typeof SORT_OPTIONS)[number]['value'];
