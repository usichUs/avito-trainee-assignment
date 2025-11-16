import { apiClient } from "../../../shared/api";
import type {
  ActivityChartData,
  CategoriesData,
  DecisionsData,
  StatsSummary,
  StatsFilters,
} from "../types";

export async function getStatsSummary(
  filters?: StatsFilters,
  signal?: AbortSignal
) {
  const response = await apiClient.get<StatsSummary>("/stats/summary", {
    params: filters,
    signal,
  });
  return response.data;
}

export async function getActivityChart(
  filters?: StatsFilters,
  signal?: AbortSignal
) {
  const response = await apiClient.get<ActivityChartData>(
    "/stats/chart/activity",
    { params: filters, signal }
  );
  return response.data;
}

export async function getDecisionsChart(
  filters?: StatsFilters,
  signal?: AbortSignal
) {
  const response = await apiClient.get<DecisionsData>(
    "/stats/chart/decisions",
    {
      params: filters,
      signal,
    }
  );
  return response.data;
}

export async function getCategoriesChart(
  filters?: StatsFilters,
  signal?: AbortSignal
) {
  const response = await apiClient.get<CategoriesData>(
    "/stats/chart/categories",
    { params: filters, signal }
  );
  return response.data;
}
