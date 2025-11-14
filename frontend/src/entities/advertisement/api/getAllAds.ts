import { apiClient } from "../../../shared/api";
import type { PaginatedResponse } from "../../../shared/types/pagination";
import type { AdStatus } from "../types";

export type SortBy = "createdAt" | "price" | "priority";
export type SortOrder = "asc" | "desc";

export type GetAllAdsParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: AdStatus[];
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
};

export async function getAllAds(params?: GetAllAdsParams) {
  const response = await apiClient.get<PaginatedResponse>("/ads", { params });
  return response.data;
}
