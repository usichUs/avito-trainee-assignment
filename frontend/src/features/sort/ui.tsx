import { Select } from '@mantine/core';
import { SORT_OPTIONS, type SortValue } from './config';

type SortProps = {
  value: SortValue;
  onChange: (value: SortValue) => void;
};

export const PLACEHOLDER = 'Сортировка';
export const WIDTH = 220;

export function Sort({ value, onChange }: SortProps) {
  return (
    <Select
      placeholder={PLACEHOLDER}
      data={SORT_OPTIONS}
      value={value}
      onChange={(val) => val && onChange(val as SortValue)}
      w={WIDTH}
      allowDeselect={false}
    />
  );
}
