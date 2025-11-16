import type { AdStatus } from '../../entities/advertisement';

export const STATUS_OPTIONS = [
  { value: 'pending', label: 'На модерации' },
  { value: 'approved', label: 'Одобрено' },
  { value: 'rejected', label: 'Отклонено' },
  { value: 'draft', label: 'Черновик' },
] as const;

export const CATEGORY_OPTIONS = [
  { value: '0', label: 'Электроника' },
  { value: '1', label: 'Недвижимость' },
  { value: '2', label: 'Транспорт' },
  { value: '3', label: 'Работа' },
  { value: '4', label: 'Услуги' },
  { value: '5', label: 'Животные' },
  { value: '6', label: 'Мода' },
  { value: '7', label: 'Детское' },
] as const;

export type AdFiltersState = {
  status: AdStatus[];
  categoryId: string;
  priceFrom: number | null;
  priceTo: number | null;
};

export const DEFAULT_FILTERS: AdFiltersState = {
  status: [],
  categoryId: '',
  priceFrom: null,
  priceTo: null,
};
