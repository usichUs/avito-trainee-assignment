import { useState } from 'react';
import { DEFAULT_SORT, type SortValue } from './config';

export function useSort() {
  const [sort, setSort] = useState<SortValue>(DEFAULT_SORT);

  const onChange = (value: SortValue) => setSort(value);
  const reset = () => setSort(DEFAULT_SORT);

  const isDefault = sort === DEFAULT_SORT;

  return {
    value: sort,
    onChange,
    reset,
    isDefault,
  };
}
