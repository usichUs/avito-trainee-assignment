import { useQuery } from '@tanstack/react-query'
import { getAdById } from '../api/getAdById'

export function useAdvertisement(id: number) {
  return useQuery({
    queryKey: ['advertisement', id],
    queryFn: () => getAdById(id),
    enabled: !!id, // запрос выполнится только если id существует
    staleTime: 1000 * 60 * 5,
  })
}