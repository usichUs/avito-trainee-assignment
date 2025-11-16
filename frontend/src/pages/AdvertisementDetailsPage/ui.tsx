import {
  Container,
  Stack,
  Title,
  Text,
  Image,
  Group,
  Badge,
  Paper,
  Button,
  Loader,
  Table,
  Box,
} from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";
import {
  IconArrowLeft,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { useAdvertisement } from "../../entities/advertisement";
import { formatRelativeDate, formatTimeOnSite } from "../../shared/utils";
import {
  statusColors,
  statusLabels,
} from "../../entities/advertisement/ui/config";
import { ModerationHistoryList } from "../../entities/moderationHistory/ui/ModerationHistoryList";
import { Carousel } from "@mantine/carousel";
import { ModerationPanel } from "../../features/moderation-panel/ui";

export function AdvertisementDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const currentId = Number(id);
  const { data: ad, isLoading, error } = useAdvertisement(Number(id));

  if (isLoading) {
    return (
      <Container size="md" py="xl">
        <Stack align="center" gap="md">
          <Loader size="lg" />
          <Text c="dimmed">Загрузка объявления...</Text>
        </Stack>
      </Container>
    );
  }

  if (error || !ad) {
    return (
      <Container size="md" py="xl">
        <Stack align="center" gap="md">
          <Text c="red" size="lg">
            Объявление не найдено
          </Text>
          <Button
            variant="light"
            onClick={() => navigate("/list")}
            component="a"
          >
            Вернуться к списку
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Group justify="space-between" align="center">
          <Button
            variant="subtle"
            leftSection={<IconArrowLeft size={16} />}
            onClick={() => navigate("/list/")}
            component="a"
          >
            Назад
          </Button>

          <Group gap="xs">
            <Button
              variant="default"
              leftSection={<IconChevronLeft size={16} />}
              disabled={currentId <= 1}
              component="a"
              href={`/item/${currentId - 1}`}
            >
              Предыдущее
            </Button>
            <Button
              variant="default"
              rightSection={<IconChevronRight size={16} />}
              component="a"
              href={`/item/${currentId + 1}`}
            >
              Следующее
            </Button>
          </Group>
        </Group>

        <ModerationPanel adId={ad.id} />

        <Group align="flex-start" gap="md">
          <Box style={{ flex: "1 1 45%", minWidth: "300px" }}>
            <Carousel withIndicators>
              {ad.images.map((image, index) => (
                <Carousel.Slide key={index}>
                  <Image
                    src={image || "https://placehold.co/600x600"}
                    alt={ad.title}
                    radius="md"
                    h={400}
                    fit="cover"
                  />
                </Carousel.Slide>
              ))}
            </Carousel>
          </Box>

          <Box style={{ flex: "1 1 45%", minWidth: "300px" }}>
            <ModerationHistoryList modHistory={ad.moderationHistory} />
          </Box>
        </Group>

        {/* Основная информация */}
        <Stack gap="md">
          <Group justify="space-between" align="center" wrap="wrap">
            <Title order={1} style={{ flex: 1 }}>
              {ad.title}
            </Title>
            <Badge color={statusColors[ad.status]} size="lg">
              {statusLabels[ad.status]}
            </Badge>
          </Group>

          <Text size="32px" fw={700} c="blue">
            {ad.price.toLocaleString("ru-RU")} ₽
          </Text>

          <Group gap="xs">
            <Badge variant="light">{ad.category}</Badge>
            {ad.priority === "urgent" && <Badge color="orange">Срочно</Badge>}
          </Group>

          <Text size="sm" c="dimmed">
            Опубликовано: {formatRelativeDate(ad.createdAt)}
          </Text>

          {ad.seller && (
            <Paper p="md" radius="md" withBorder>
              <Stack gap="xs">
                <Title order={4}>Продавец</Title>
                <Text fw={500}>{ad.seller.name}</Text>
                <Group gap="xl">
                  <Text size="sm" c="dimmed">
                    Рейтинг: {ad.seller.rating} ⭐
                  </Text>
                  <Text size="sm" c="dimmed">
                    Объявлений: {ad.seller.totalAds}
                  </Text>
                  <Text size="sm" c="dimmed">
                    На сайте: {formatTimeOnSite(ad.seller.registeredAt)}
                  </Text>
                </Group>
              </Stack>
            </Paper>
          )}
        </Stack>

        <Stack gap="sm">
          <Title order={3}>Описание</Title>
          <Paper p="md" radius="md" withBorder>
            <Text>{ad.description || "Описание отсутствует"}</Text>
          </Paper>
        </Stack>

        {ad.characteristics && Object.keys(ad.characteristics).length > 0 && (
          <Stack gap="sm">
            <Title order={3}>Характеристики</Title>
            <Paper p="md" radius="md" withBorder>
              <Table>
                <Table.Tbody>
                  {Object.entries(ad.characteristics).map(([key, value]) => (
                    <Table.Tr key={key}>
                      <Table.Td fw={500} w="30%">
                        {key}
                      </Table.Td>
                      <Table.Td>{value}</Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Paper>
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
