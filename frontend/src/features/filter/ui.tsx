import { MultiSelect, Select, NumberInput, Group } from '@mantine/core';
import {
  STATUS_OPTIONS,
  CATEGORY_OPTIONS,
  type AdFiltersState,
} from './config';
import type { AdStatus } from '../../entities/advertisement';

type AdFiltersProps = {
  filters: AdFiltersState;
  onChange: <K extends keyof AdFiltersState>(
    key: K,
    value: AdFiltersState[K]
  ) => void;
};

export function Filters({ filters, onChange }: AdFiltersProps) {
  return (
    <Group align="flex-end" gap="md">
      <MultiSelect
        placeholder="Статус"
        data={STATUS_OPTIONS}
        value={filters.status}
        onChange={(value) => onChange('status', value as AdStatus[])}
        clearable
        searchable
        w={250}
      />

      <Select
        placeholder="Категория"
        data={CATEGORY_OPTIONS}
        value={filters.categoryId}
        onChange={(value) => onChange('categoryId', value || '')}
        clearable
        searchable
        w={200}
      />

      <NumberInput
        placeholder="Цена от"
        value={filters.priceFrom ?? undefined}
        onChange={(value) =>
          onChange('priceFrom', typeof value === 'number' ? value : null)
        }
        min={0}
        w={150}
        suffix=" ₽"
      />

      <NumberInput
        placeholder="Цена до"
        value={filters.priceTo ?? undefined}
        onChange={(value) =>
          onChange('priceTo', typeof value === 'number' ? value : null)
        }
        min={0}
        w={150}
        suffix=" ₽"
      />
    </Group>
  );
}
