import { useState } from "react";
import {
  Container,
  Title,
  Stack,
  Grid,
  Paper,
  Text,
  Loader,
} from "@mantine/core";
import { BarChart } from "@mantine/charts";
import { PieChart } from "@mantine/charts";
import {
  useStatsSummary,
  useActivityChart,
  useDecisionsChart,
  useCategoriesChart,
  type StatsFilters,
} from "../../entities/stats";

import { StatsFilter } from "./ui/StatsFilter";
import { StatsCard } from "./ui/StatsCard";

export function StatisticsPage() {
  const [filters, setFilters] = useState<StatsFilters>({ period: "week" });

  const { data: summary, isLoading: summaryLoading } = useStatsSummary(filters);
  const { data: activity, isLoading: activityLoading } =
    useActivityChart(filters);
  const { data: decisions, isLoading: decisionsLoading } =
    useDecisionsChart(filters);
  const { data: categories, isLoading: categoriesLoading } =
    useCategoriesChart(filters);

  if (
    summaryLoading ||
    activityLoading ||
    decisionsLoading ||
    categoriesLoading
  ) {
    return (
      <Container size="xl" py="xl">
        <Stack align="center" gap="md">
          <Loader size="lg" />
          <Text c="dimmed">Загрузка статистики...</Text>
        </Stack>
      </Container>
    );
  }

  const activityChartData =
    activity?.map((item) => ({
      date: new Date(item.date).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "short",
      }),
      Одобрено: item.approved,
      Отклонено: item.rejected,
      "На доработку": item.requestChanges,
    })) || [];

  const decisionsChartData = decisions
    ? [
        { name: "Одобрено", value: decisions.approved, color: "green.6" },
        { name: "Отклонено", value: decisions.rejected, color: "red.6" },
        {
          name: "На доработку",
          value: decisions.requestChanges,
          color: "yellow.6",
        },
      ]
    : [];

  const categoriesChartData = categories
    ? Object.entries(categories).map(([category, count]) => ({
        category,
        Количество: count,
      }))
    : [];

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <Title order={1}>Статистика модерации</Title>

        <StatsFilter filters={filters} onChange={setFilters} />

        {summary && (
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <StatsCard
                title="Всего проверено"
                value={summary.totalReviewed}
                subtitle="За всё время"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <StatsCard
                title="Проверено сегодня"
                value={summary.totalReviewedToday}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <StatsCard
                title="За неделю"
                value={summary.totalReviewedThisWeek}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <StatsCard
                title="За месяц"
                value={summary.totalReviewedThisMonth}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <StatsCard
                title="Одобрено"
                value={summary.approvedPercentage}
                format="percentage"
                trend="up"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <StatsCard
                title="Отклонено"
                value={summary.rejectedPercentage}
                format="percentage"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <StatsCard
                title="На доработку"
                value={summary.requestChangesPercentage}
                format="percentage"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <StatsCard
                title="Среднее время проверки"
                value={summary.averageReviewTime}
                format="time"
              />
            </Grid.Col>
          </Grid>
        )}

        {/* Столбчатая диаграмма активности */}
        {activityChartData.length > 0 && (
          <Paper p="md" radius="md" withBorder>
            <Stack gap="md">
              <Title order={3}>Активность модерации</Title>
              <BarChart
                h={300}
                data={activityChartData}
                dataKey="date"
                series={[
                  { name: "Одобрено", color: "green.6" },
                  { name: "Отклонено", color: "red.6" },
                  { name: "На доработку", color: "yellow.6" },
                ]}
                withLegend
                withTooltip
                withYAxis
              />
            </Stack>
          </Paper>
        )}

        <Grid>
          {decisionsChartData.length > 0 && (
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper p="md" radius="md" withBorder>
                <Stack gap="md">
                  <Title order={3}>Распределение решений</Title>
                  <PieChart
                    h={300}
                    data={decisionsChartData}
                    withLabelsLine
                    labelsPosition="outside"
                    labelsType="percent"
                    withTooltip
                  />
                </Stack>
              </Paper>
            </Grid.Col>
          )}

          {categoriesChartData.length > 0 && (
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper p="md" radius="md" withBorder>
                <Stack gap="md">
                  <Title order={3}>Объявления по категориям</Title>
                  <BarChart
                    h={300}
                    data={categoriesChartData}
                    dataKey="category"
                    series={[{ name: "Количество", color: "blue.6" }]}
                    withTooltip
                    withYAxis
                  />
                </Stack>
              </Paper>
            </Grid.Col>
          )}
        </Grid>
      </Stack>
    </Container>
  );
}
