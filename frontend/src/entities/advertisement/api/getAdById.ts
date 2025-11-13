import { apiClient } from "../../../shared/api";
import type { Advertisement } from "../types";

export async function getAdById(id: number) {
    const response = await apiClient.get<Advertisement>(`/ads/${id}`)
    return response.data
}