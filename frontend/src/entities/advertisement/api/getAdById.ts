import { apiClient } from "../../../shared/api";
import type { Advertisement } from "../types";

export async function getAdById(id: number, signal?: AbortSignal) {
  const response = await apiClient.get<Advertisement>(`/ads/${id}`, { signal });
  return response.data;
}
