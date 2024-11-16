import { AxiosInstance } from "axios";

declare global {
  interface Window {
    $request: AxiosInstance;
    $message: any;
  }
}

export {};
