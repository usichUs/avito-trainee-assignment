import {
  Container,
  Title,
  Stack,
  Pagination,
  Text,
  Paper,
  Group,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAdvertisements } from "../../entities/advertisement";
import { AdList } from "../../entities/advertisement/ui/AdList";
import { useState } from "react";
import type { AdStatus } from "../../entities/advertisement";
import { AdFilters } from "../../features/ads-filters/ui";
import type { SortBy, SortOrder } from "../../shared/types/sort";

export function AdvertisementsPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<AdStatus[]>([]);
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sort, setSort] = useState("createdAt-desc");
  const limit = 10;

  const [sortBy, sortOrder] = sort.split("-") as [SortBy, SortOrder];

  const { data, isLoading, error } = useAdvertisements({
    page,
    limit,
    search: search || undefined,
    status: status.length > 0 ? status : undefined,
    categoryId: category ? Number(category) : undefined,
    minPrice: minPrice ?? undefined,
    maxPrice: maxPrice ?? undefined,
    sortBy,
    sortOrder,
  });

  const handleAdClick = (id: number) => {
    navigate(`/item/${id}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: AdStatus[]) => {
    setStatus(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const handleMinPriceChange = (value: number | null) => {
    setMinPrice(value);
    setPage(1);
  };

  const handleMaxPriceChange = (value: number | null) => {
    setMaxPrice(value);
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    setPage(1);
  };

  const handleReset = () => {
    setSearch("");
    setStatus([]);
    setCategory("");
    setMinPrice(null);
    setMaxPrice(null);
    setSort("createdAt-desc");
    setPage(1);
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

        <AdFilters
          search={search}
          status={status}
          category={category}
          minPrice={minPrice}
          maxPrice={maxPrice}
          sort={sort}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          onCategoryChange={handleCategoryChange}
          onMinPriceChange={handleMinPriceChange}
          onMaxPriceChange={handleMaxPriceChange}
          onSortChange={handleSortChange}
          onReset={handleReset}
        />

        <AdList
          ads={data?.ads || []}
          isLoading={isLoading}
          error={error}
          onAdClick={handleAdClick}
        />

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
