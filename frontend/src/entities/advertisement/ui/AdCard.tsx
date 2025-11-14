import { Badge, Group, Image, Stack, Text } from "@mantine/core";
import type { Advertisement } from "../types";
import { formatRelativeDate } from "../../../shared/utils";
import { priorityColors, statusColors, statusLabels } from "./config";
import styles from "./styles.module.css";

type AdCardProps = {
  ad: Advertisement;
  onClick?: () => void;
};

export default function AdCard({ ad, onClick }: AdCardProps) {
  return (
    <Group
      onClick={onClick}
      className={styles.card}
      wrap="nowrap"
      align="flex-start"
    >
      <Image
        w={150}
        h={150}
        fit="cover"
        src={ad.images?.[0] || "https://placehold.co/400x400"}
        alt={ad.title}
        radius="md"
      />
      <Stack gap="xs" style={{ flex: 1 }}>
        {" "}
        <Text fw={500} size="lg" lineClamp={2}>
          {" "}
          {ad.title}
        </Text>
        <Text size="xl" fw={700} c="blue">
          {ad.price.toLocaleString("ru-RU")} ₽{" "}
        </Text>
        <Text size="sm" c="dimmed">
          {ad.category} · {formatRelativeDate(ad.createdAt)}
        </Text>
        <Group gap="xs">
          <Badge color={statusColors[ad.status]} size="sm" variant="light">
            {statusLabels[ad.status]}
          </Badge>
          {ad.priority === "urgent" && (
            <Badge
              color={priorityColors[ad.priority]}
              size="sm"
              variant="filled"
            >
              Срочно
            </Badge>
          )}
        </Group>
      </Stack>
    </Group>
  );
}
