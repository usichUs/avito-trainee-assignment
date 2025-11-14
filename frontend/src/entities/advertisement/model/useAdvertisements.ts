import { useQuery } from "@tanstack/react-query";
import { getAllAds, type GetAllAdsParams } from "../api/getAllAds";

export function useAdvertisements(params?: GetAllAdsParams) {
  return useQuery({
    queryKey: ["advertisements", params],
    queryFn: () => getAllAds(params),
    staleTime: 1000 * 60 * 5,
  });
}
