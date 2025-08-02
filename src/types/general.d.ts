interface IApiResponse<T> {
  data: T;
}

declare interface IErrorResponse {
  message: string;
}