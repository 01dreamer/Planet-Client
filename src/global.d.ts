import { AxiosInstance } from "axios";

declare global {
  interface Window {
    $request: AxiosInstance;
    $message: any;
  }
}

declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

export {};
