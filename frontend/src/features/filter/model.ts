import { useState, useMemo } from 'react';
import { DEFAULT_FILTERS, type AdFiltersState } from './config';

export function useFilters() {
  const [filters, setFilters] = useState<AdFiltersState>(DEFAULT_FILTERS);

  const updateFilter = <K extends keyof AdFiltersState>(
    key: K,
    value: AdFiltersState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const reset = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const hasActiveFilters = useMemo(
    () =>
      (Object.keys(filters) as Array<keyof AdFiltersState>).some((key) => {
        const value = filters[key];
        const defaultValue = DEFAULT_FILTERS[key];

        if (Array.isArray(value)) {
          return value.length > 0;
        }
        return value !== defaultValue;
      }),
    [filters]
  );

  return {
    filters,
    updateFilter,
    reset,
    hasActiveFilters,
  };
}
