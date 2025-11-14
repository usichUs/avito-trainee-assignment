import { Stack, Loader, Text } from "@mantine/core";
import type { Advertisement } from "../types";
import AdCard from "./AdCard";

type AdListProps = {
  ads: Advertisement[];
  isLoading?: boolean;
  error?: Error | null;
  onAdClick?: (id: number) => void;
};

export function AdList({ ads, isLoading, error, onAdClick }: AdListProps) {
  if (isLoading) {
    return (
      <Stack align="center" py="xl">
        <Loader size="lg" />
        <Text c="dimmed">Загрузка объявлений...</Text>
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack align="center" py="xl">
        <Text c="red" size="lg">
          Ошибка загрузки
        </Text>
        <Text c="dimmed">{error.message}</Text>
      </Stack>
    );
  }

  if (ads.length === 0) {
    return (
      <Stack align="center" py="xl">
        <Text c="dimmed" size="lg">
          Объявления не найдены
        </Text>
      </Stack>
    );
  }

  return (
    <Stack gap="md">
      {ads.map((ad) => (
        <AdCard key={ad.id} ad={ad} onClick={() => onAdClick?.(ad.id)} />
      ))}
    </Stack>
  );
}
