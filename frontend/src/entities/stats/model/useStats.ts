import { useQuery } from "@tanstack/react-query";
import {
  getStatsSummary,
  getActivityChart,
  getDecisionsChart,
  getCategoriesChart,
} from "../api/getStats";
import type { StatsFilters } from "../types";

export function useStatsSummary(filters?: StatsFilters) {
  return useQuery({
    queryKey: ["stats", "summary", filters],
    queryFn: () => getStatsSummary(filters),
    staleTime: 5 * 60 * 1000,
  });
}

export function useActivityChart(filters?: StatsFilters) {
  return useQuery({
    queryKey: ["stats", "activity", filters],
    queryFn: () => getActivityChart(filters),
    staleTime: 5 * 60 * 1000,
  });
}

export function useDecisionsChart(filters?: StatsFilters) {
  return useQuery({
    queryKey: ["stats", "decisions", filters],
    queryFn: () => getDecisionsChart(filters),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCategoriesChart(filters?: StatsFilters) {
  return useQuery({
    queryKey: ["stats", "categories", filters],
    queryFn: () => getCategoriesChart(filters),
    staleTime: 5 * 60 * 1000,
  });
}
