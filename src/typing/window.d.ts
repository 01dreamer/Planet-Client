import { VNode } from "vue";

export namespace WindowType {
  export type Window = {
    id?: number;
    header: WindowHeaderOptions;
    zIndex: number;
    router: string;
    title: string;

    minSize?: WindowSize;
    maxSize?: WindowSize;
    size: WindowSize;

    isMaximized?: boolean;

    frame?: boolean;
    fullscreen?: boolean;
    maximizable?: boolean;
    resizable?: boolean;
    show?: boolean;
    closable?: boolean;
    focusable?: boolean;
    icon?: string;
    parent?: Window;
    modal?: boolean;
    alwaysOnTop?: boolean;
    webPreferences?: Electron.WebPreferences;
  };

  export type WindowSize = {
    width: number;
    height: number;
  };

  export type WindowHeaderOptions = {
    show?: boolean;
    header?: string | VNode | (() => VNode);
    toolbar?: string | VNode | (() => VNode);

    height?: number | string;
    width?: number | string;
    headerStyle?: object;
    headerClass?: string;

    showClose?: boolean;
    showMinimize?: boolean;
    showMaximize?: boolean;

    onClose?: () => void;
    onMinimize?: () => void;
    onMaximize?: () => void;
    onUnMaximize?: () => void;
    onDrag?: () => void;
    onResize?: () => void;
  };
}

export type global = {
  [key: string]: any;
};
