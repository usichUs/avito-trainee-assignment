import { useQuery } from "@tanstack/react-query";
import { getAdById } from "../api/getAdById";

export function useAdvertisement(id: number) {
  return useQuery({
    queryKey: ["advertisement", id],
    queryFn: ({ signal }) => getAdById(id, signal),
    enabled: !!id && !isNaN(id),
    staleTime: 1000 * 60 * 5,
  });
}
