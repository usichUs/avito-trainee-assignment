import { Group, Button, Container } from "@mantine/core";
import { useNavigate, useLocation } from "react-router-dom";
import { IconList, IconChartBar } from "@tabler/icons-react";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container size="lg" py="md">
      <Group justify="space-between">
        <Group gap="xs">
          <Button
            variant={location.pathname === "/list" ? "filled" : "light"}
            leftSection={<IconList size={16} />}
            onClick={() => navigate("/list")}
          >
            Список объявлений
          </Button>
          <Button
            variant={location.pathname === "/stats" ? "filled" : "light"}
            leftSection={<IconChartBar size={16} />}
            onClick={() => navigate("/stats")}
          >
            Статистика
          </Button>
        </Group>
      </Group>
    </Container>
  );
}
