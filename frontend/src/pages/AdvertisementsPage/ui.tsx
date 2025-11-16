import {
  Container,
  Title,
  Stack,
  Pagination,
  Text,
  Paper,
  Group,
} from '@mantine/core';
import { useState } from 'react';
import { useAdvertisements } from '../../entities/advertisement';
import { AdList } from '../../entities/advertisement/ui/AdList';
import type { SortBy, SortOrder } from '../../shared/types/sort';
import { useSearch } from '../../features/search';
import { useSort } from '../../features/sort';
import { useFilters } from '../../features/filter';
import { AdsFilterPanel } from '../../widgets/AdsFilterPanel';

const LIMIT_POSTS_PER_PAGE = 10;

export function AdvertisementsPage() {
  const [page, setPage] = useState(1);

  const searchModel = useSearch();
  const sortModel = useSort();
  const filtersModel = useFilters();

  const [sortBy, sortOrder] = sortModel.value.split('-') as [SortBy, SortOrder];

  const { data, isLoading, error } = useAdvertisements({
    page,
    limit: LIMIT_POSTS_PER_PAGE,
    search: searchModel.debouncedValue || undefined,
    status:
      filtersModel.filters.status.length > 0
        ? filtersModel.filters.status
        : undefined,
    categoryId: filtersModel.filters.categoryId
      ? Number(filtersModel.filters.categoryId)
      : undefined,
    minPrice: filtersModel.filters.priceFrom ?? undefined,
    maxPrice: filtersModel.filters.priceTo ?? undefined,
    sortBy,
    sortOrder,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Group justify="space-between" align="center">
          <Title order={1}>Все объявления</Title>
          {data?.pagination && (
            <Text size="sm" c="dimmed">
              Найдено {data.pagination.totalItems} объявлений
            </Text>
          )}
        </Group>

        <AdsFilterPanel
          searchModel={searchModel}
          sortModel={sortModel}
          filtersModel={filtersModel}
          onFilterChange={() => setPage(1)}
        />

        <AdList ads={data?.ads || []} isLoading={isLoading} error={error} />

        {data?.pagination && data.pagination.totalPages > 1 && (
          <Paper p="md" radius="md" withBorder>
            <Stack gap="md" align="center">
              <Pagination
                value={page}
                onChange={handlePageChange}
                total={data.pagination.totalPages}
                size="lg"
                radius="md"
              />
              <Text size="sm" c="dimmed">
                Страница {page} из {data.pagination.totalPages}
              </Text>
            </Stack>
          </Paper>
        )}
      </Stack>
    </Container>
  );
}
