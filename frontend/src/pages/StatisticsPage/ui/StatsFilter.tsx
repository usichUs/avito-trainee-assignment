import { Paper, SegmentedControl, Group, Stack } from "@mantine/core";
import { DatePickerInput, type DatesRangeValue } from "@mantine/dates";
import type { StatsPeriod, StatsFilters } from "../../../entities/stats";

type StatsFilterProps = {
  filters: StatsFilters;
  onChange: (filters: StatsFilters) => void;
};

export function StatsFilter({ filters, onChange }: StatsFilterProps) {
  const handlePeriodChange = (period: string) => {
    onChange({
      period: period as StatsPeriod,
      startDate: undefined,
      endDate: undefined,
    });
  };

  const handleDateChange = (value: DatesRangeValue) => {
    const [start, end] = value;

    const startDate =
      start instanceof Date ? start.toISOString().split("T")[0] : start;

    const endDate = end instanceof Date ? end.toISOString().split("T")[0] : end;

    onChange({
      period: "custom",
      startDate: startDate || undefined,
      endDate: endDate || undefined,
    });
  };

  return (
    <Paper p="md" radius="md" withBorder>
      <Stack gap="md">
        <SegmentedControl
          value={filters.period}
          onChange={handlePeriodChange}
          data={[
            { label: "Сегодня", value: "today" },
            { label: "Неделя", value: "week" },
            { label: "Месяц", value: "month" },
            { label: "Произвольный", value: "custom" },
          ]}
        />

        {filters.period === "custom" && (
          <Group grow>
            <DatePickerInput
              type="range"
              label="Выберите период"
              placeholder="Начало - Конец"
              value={[
                filters.startDate ? new Date(filters.startDate) : null,
                filters.endDate ? new Date(filters.endDate) : null,
              ]}
              onChange={handleDateChange}
              valueFormat="DD.MM.YYYY"
              clearable
            />
          </Group>
        )}
      </Stack>
    </Paper>
  );
}
