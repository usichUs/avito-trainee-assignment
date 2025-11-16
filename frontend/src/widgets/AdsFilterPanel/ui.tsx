import { Paper, Stack, Group, Button } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { Search, useSearch } from "../../features/search";
import { Sort, useSort } from "../../features/sort";
import { Filters, useFilters } from "../../features/filter";

type AdsFilterPanelProps = {
  searchModel: ReturnType<typeof useSearch>;
  sortModel: ReturnType<typeof useSort>;
  filtersModel: ReturnType<typeof useFilters>;
  onFilterChange: () => void;
};

export function AdsFilterPanel({
  searchModel,
  sortModel,
  filtersModel,
  onFilterChange,
}: AdsFilterPanelProps) {
  const hasAnyFilters =
    searchModel.value || filtersModel.hasActiveFilters || !sortModel.isDefault;

  const handleReset = () => {
    searchModel.reset();
    sortModel.reset();
    filtersModel.reset();
    onFilterChange();
  };

  return (
    <Paper p="md" radius="md" withBorder>
      <Stack gap="md">
        <Search
          value={searchModel.value}
          onChange={(value) => {
            searchModel.setValue(value);
            onFilterChange();
          }}
        />

        <Group align="flex-end" wrap="wrap">
          <Filters
            filters={filtersModel.filters}
            onChange={(key, value) => {
              filtersModel.updateFilter(key, value);
              onFilterChange();
            }}
          />

          <Sort
            value={sortModel.value}
            onChange={(value) => {
              sortModel.onChange(value);
              onFilterChange();
            }}
          />

          {hasAnyFilters && (
            <Button
              variant="light"
              color="gray"
              leftSection={<IconX size={16} />}
              onClick={handleReset}
            >
              Сбросить
            </Button>
          )}
        </Group>
      </Stack>
    </Paper>
  );
}
