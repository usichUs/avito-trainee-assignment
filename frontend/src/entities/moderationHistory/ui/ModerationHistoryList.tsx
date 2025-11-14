import { Group, Paper, Text, Timeline, Title } from "@mantine/core";
import { formatDateTime } from "../../../shared/utils";
import type { ModerationHistory } from "../types";
import { actionConfig } from "./config";

type ModerationHistoryListProps = {
  modHistory: ModerationHistory[];
};

export function ModerationHistoryList({
  modHistory,
}: ModerationHistoryListProps) {
  return (
    <Paper p="md" radius="md" withBorder h="100%">
      <Title order={4} mb="md">
        История модерации
      </Title>
      {modHistory && modHistory.length > 0 ? (
        <Timeline active={modHistory.length - 1} bulletSize={24}>
          {modHistory.map((item) => {
            const config = actionConfig[item.action];
            return (
              <Timeline.Item
                key={item.id}
                bullet={config.icon}
                title={
                  <Group gap="xs">
                    <Text size="sm" fw={500}>
                      {config.label}
                    </Text>
                  </Group>
                }
              >
                <Text size="xs" c="dimmed" mb={4}>
                  {item.moderatorName}
                </Text>
                <Text size="xs" c="dimmed" mb={4}>
                  {formatDateTime(item.timestamp)}
                </Text>
                {item.comment && (
                  <Text size="xs" mt={4}>
                    {item.comment}
                  </Text>
                )}
                {item.reason && (
                  <Text size="xs" c="dimmed" mt={4}>
                    Причина: {item.reason}
                  </Text>
                )}
              </Timeline.Item>
            );
          })}
        </Timeline>
      ) : (
        <Text size="sm" c="dimmed">
          История модерации пуста
        </Text>
      )}
    </Paper>
  );
}
