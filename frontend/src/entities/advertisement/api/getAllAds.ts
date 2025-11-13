import { apiClient } from "../../../shared/api";
import type { PaginatedResponse } from "../../../shared/types/pagination";

export async function getAllAds() {
    const response = await apiClient.get<PaginatedResponse>('/ads')
    return response.data
}