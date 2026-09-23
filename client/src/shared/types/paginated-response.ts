export interface PaginatedResponse<T> {
  data: Array<T>,
  limit: number,
  total: number,
  page: number,
};