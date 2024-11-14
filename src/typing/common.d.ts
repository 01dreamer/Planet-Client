export declare namespace Common {
  export type PageRequest = {
    page?: number;
    pageSize?: number;
  };
}
export type Response<T> = {
  code: number;
  data: T;
  msg: string;
};

declare module "axios" {
  export interface AxiosResponse<T> {
    code: number;
    message: string;
    data: T;
    [keys: string]: any;
  }
}
