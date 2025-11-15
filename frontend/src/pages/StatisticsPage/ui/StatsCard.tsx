import { Paper, Text, Group, Stack } from "@mantine/core";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";

interface StatsCardProps {
  title: string;
  value: number;
  subtitle?: string;
  trend?: "up" | "down";
  format?: "number" | "percentage" | "time";
}

export function StatsCard({
  title,
  value,
  subtitle,
  trend,
  format = "number",
}: StatsCardProps) {
  const formatValue = () => {
    switch (format) {
      case "percentage":
        return `${value.toFixed(1)}%`;
      case "time": {
        const seconds = value / 1000;
        if (seconds < 60) {
          return `${seconds.toFixed(1)} сек`;
        }
        const minutes = seconds / 60;
        if (minutes < 60) {
          return `${minutes.toFixed(1)} мин`;
        }
        const hours = minutes / 60;
        return `${hours.toFixed(1)} ч`;
      }
      default:
        return value.toLocaleString("ru-RU");
    }
  };

  return (
    <Paper p="md" radius="md" withBorder>
      <Stack gap="xs">
        <Text size="sm" c="dimmed" tt="uppercase" fw={700}>
          {title}
        </Text>
        <Group align="flex-end" gap="xs">
          <Text size="32px" fw={700}>
            {formatValue()}
          </Text>
          {trend &&
            (trend === "up" ? (
              <IconTrendingUp size={24} color="green" />
            ) : (
              <IconTrendingDown size={24} color="red" />
            ))}
        </Group>
        {subtitle && (
          <Text size="xs" c="dimmed">
            {subtitle}
          </Text>
        )}
      </Stack>
    </Paper>
  );
}
