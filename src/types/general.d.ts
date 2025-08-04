interface IApiResponse<T> {
  data: T;
}

declare interface IErrorResponse {
  message: string;
}


interface IPaginationMeta {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

interface IPaginatedResponse<T> {
  data: T[];

  meta: IPaginationMeta;
}



interface IErrorResponse {
  data: {
    message: string;
    details?: string[];
  };
}