import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

const PLACEHOLDER = 'Поиск по названию объявления...';

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function Search({ value, onChange }: SearchProps) {
  return (
    <TextInput
      placeholder={PLACEHOLDER}
      leftSection={<IconSearch size={16} />}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
}
