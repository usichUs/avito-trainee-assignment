import { useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';

const DEBOUNCE_MS = 300;

export function useSearch() {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebouncedValue(search, DEBOUNCE_MS);

  const reset = () => setSearch('');

  return {
    value: search,
    debouncedValue: debouncedSearch,
    setValue: setSearch,
    reset,
  };
}
