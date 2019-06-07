export interface IPaginationResponse<T> {
  docs: T[]
  total: number
  limit: number //nebitan
  offset: number //nebitan
}
