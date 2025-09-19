export type Page<I> = {
  content: I[];
  pagination: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
};
