import { apiClient } from "../../../shared/api";

type ModerateParams = {
  reason?: string;
  comment?: string;
};

export async function approveAd(adId: number, params?: ModerateParams) {
  const response = await apiClient.post(`/ads/${adId}/approve`, params);
  return response.data;
}

export async function rejectAd(adId: number, params: ModerateParams) {
  const response = await apiClient.post(`/ads/${adId}/reject`, params);
  return response.data;
}

export async function requestChanges(adId: number, params: ModerateParams) {
  const response = await apiClient.post(`/ads/${adId}/request-changes`, params);
  return response.data;
}
