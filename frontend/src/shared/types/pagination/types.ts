import type { Advertisement } from "../../../entities/advertisement"

export type Pagination = {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export type PaginatedResponse = {
  ads: Advertisement[]
  pagination: Pagination
}