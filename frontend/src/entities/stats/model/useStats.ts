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
    queryFn: ({ signal }) => getStatsSummary(filters, signal),
    staleTime: 5 * 60 * 1000,
  });
}

export function useActivityChart(filters?: StatsFilters) {
  return useQuery({
    queryKey: ["stats", "activity", filters],
    queryFn: ({ signal }) => getActivityChart(filters, signal),
    staleTime: 5 * 60 * 1000,
  });
}

export function useDecisionsChart(filters?: StatsFilters) {
  return useQuery({
    queryKey: ["stats", "decisions", filters],
    queryFn: ({ signal }) => getDecisionsChart(filters, signal),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCategoriesChart(filters?: StatsFilters) {
  return useQuery({
    queryKey: ["stats", "categories", filters],
    queryFn: ({ signal }) => getCategoriesChart(filters, signal),
    staleTime: 5 * 60 * 1000,
  });
}
