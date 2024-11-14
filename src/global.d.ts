import { AxiosInstance } from "axios";

declare global {
  interface Window {
    $request: AxiosInstance;
  }
}

export {};
