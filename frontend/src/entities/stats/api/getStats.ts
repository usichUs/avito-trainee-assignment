import { apiClient } from "../../../shared/api";
import type {
  ActivityChartData,
  CategoriesData,
  DecisionsData,
  StatsSummary,
  StatsFilters,
} from "../types";

export async function getStatsSummary(filters?: StatsFilters) {
  const response = await apiClient.get<StatsSummary>("/stats/summary", {
    params: filters,
  });
  return response.data;
}

export async function getActivityChart(filters?: StatsFilters) {
  const response = await apiClient.get<ActivityChartData>(
    "/stats/chart/activity",
    { params: filters }
  );
  return response.data;
}

export async function getDecisionsChart(filters?: StatsFilters) {
  const response = await apiClient.get<DecisionsData>(
    "/stats/chart/decisions",
    {
      params: filters,
    }
  );
  return response.data;
}

export async function getCategoriesChart(filters?: StatsFilters) {
  const response = await apiClient.get<CategoriesData>(
    "/stats/chart/categories",
    { params: filters }
  );
  return response.data;
}
