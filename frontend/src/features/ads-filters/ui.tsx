import {
  Paper,
  TextInput,
  MultiSelect,
  Select,
  Group,
  Button,
  NumberInput,
  Stack,
} from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import type { AdStatus } from "../../entities/advertisement";
import { statusOptions, categoryOptions, sortOptions } from "./config";

type AdFiltersProps = {
  search: string;
  status: AdStatus[];
  category: string;
  minPrice: number | null;
  maxPrice: number | null;
  sort: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: AdStatus[]) => void;
  onCategoryChange: (value: string) => void;
  onMinPriceChange: (value: number | null) => void;
  onMaxPriceChange: (value: number | null) => void;
  onSortChange: (value: string) => void;
  onReset: () => void;
};

export function AdFilters({
  search,
  status,
  category,
  minPrice,
  maxPrice,
  sort,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onSortChange,
  onReset,
}: AdFiltersProps) {
  const hasFilters =
    search ||
    status.length > 0 ||
    category ||
    minPrice !== null ||
    maxPrice !== null ||
    sort !== "createdAt-desc";

  return (
    <Paper p="md" radius="md" withBorder>
      <Stack gap="md">
        {/* Поиск */}
        <TextInput
          placeholder="Поиск по названию объявления..."
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(e) => onSearchChange(e.currentTarget.value)}
        />

        {/* Фильтры и сортировка */}
        <Group align="flex-end">
          <MultiSelect
            placeholder="Статус"
            data={statusOptions}
            value={status}
            onChange={(value) => onStatusChange(value as AdStatus[])}
            clearable
            searchable
            w={250}
          />

          <Select
            placeholder="Категория"
            data={categoryOptions}
            value={category}
            onChange={(value) => onCategoryChange(value || "")}
            clearable
            searchable
            w={200}
          />

          <NumberInput
            placeholder="Цена от"
            value={minPrice ?? undefined}
            onChange={(value) =>
              onMinPriceChange(typeof value === "number" ? value : null)
            }
            min={0}
            w={150}
            suffix=" ₽"
          />

          <NumberInput
            placeholder="Цена до"
            value={maxPrice ?? undefined}
            onChange={(value) =>
              onMaxPriceChange(typeof value === "number" ? value : null)
            }
            min={0}
            w={150}
            suffix=" ₽"
          />

          <Select
            placeholder="Сортировка"
            data={sortOptions}
            value={sort}
            onChange={(value) => onSortChange(value || "createdAt-desc")}
            w={200}
          />

          {hasFilters && (
            <Button
              variant="light"
              color="gray"
              leftSection={<IconX size={16} />}
              onClick={onReset}
            >
              Сбросить
            </Button>
          )}
        </Group>
      </Stack>
    </Paper>
  );
}
