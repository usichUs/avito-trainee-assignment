import type { Advertisement } from "../../../entities/advertisement"

export interface Pagination {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export interface PaginatedResponse {
  ads: Advertisement[]
  pagination: Pagination
}