import { Badge, Group, Image, Paper, Stack, Text } from "@mantine/core";
import type { Advertisement } from "../types";
import { formatRelativeDate } from "../../../shared/utils";
import { priorityColors, statusColors, statusLabels } from "./config";

type AdCardProps = {
  ad: Advertisement;
};

export default function AdCard({ ad }: AdCardProps) {
  return (
    <Paper
      component="a"
      href={`/item/${ad.id}`}
      style={{
        padding: "1rem",
        cursor: "pointer",
        textDecoration: "none",
        color: "inherit",
        transition: "all 0.2s ease",
        border: "1px solid #e9ecef",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <Group>
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
    </Paper>
  );
}
