import { useQuery } from '@tanstack/react-query'
import { getAllAds } from '../api/getAllAds'

export function useAdvertisements() {
  return useQuery({
    queryKey: ['advertisements'],
    queryFn: getAllAds,
    staleTime: 1000 * 60 * 5,
  })
}