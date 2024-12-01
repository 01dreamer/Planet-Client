import { BrowserWindow, IpcMainInvokeEvent, session } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ElectronChannel } from "../../src/constants/electron.ts";
import { WindowType } from "../../src/typing/window";
import { RENDERER_DIST, VITE_DEV_SERVER_URL } from "../main.ts";

const windowMap = new Map<number, BrowserWindow>();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const getWindow = (_: IpcMainInvokeEvent, id: number) => {
  return windowMap.get(id);
};

export function closeWindow(_: IpcMainInvokeEvent, id: number) {
  const win = windowMap.get(id);
  if (win) {
    win.close();
  }
}

export function showWindow(_: IpcMainInvokeEvent, id: number) {
  const win = windowMap.get(id);
  win?.show();
}

export function minimizeWindow(_: IpcMainInvokeEvent, id: number) {
  const win = windowMap.get(id);
  win?.minimize();
}

export function hideWindow(_: IpcMainInvokeEvent, id: number) {
  const win = windowMap.get(id);
  win?.hide();
}

export function maximizeWindow(_: IpcMainInvokeEvent, id: number) {
  const win = windowMap.get(id);
  win?.maximize();
}

export function unMaximizeWindow(_: IpcMainInvokeEvent, id: number) {
  const win = windowMap.get(id);
  win?.unmaximize();
}

export function resizeWindow(
  _: IpcMainInvokeEvent,
  id: number,
  width: number,
  height: number,
) {
  const win = windowMap.get(id);
  win?.setSize(width, height);
}

export function getWindowSize(id: number): WindowType.WindowSize {
  const win = windowMap.get(id);
  return {
    width: win?.getSize()[0] || 0,
    height: win?.getSize()[1] || 0,
  };
}

export function createWindow(
  _: IpcMainInvokeEvent | null,
  option: WindowType.Window,
) {
  const {
    isMaximized = false,
    size,
    frame = false,
    fullscreen = false,
    maximizable = true,
    resizable = true,
    closable = true,
    focusable = true,
    show = true,
    title = "Electron Window",
    icon = path.join(process.env.VITE_PUBLIC, "logo_planet.png"),
    modal = false,
    alwaysOnTop = false,
    webPreferences = {
      preload: path.join(__dirname, "preload.mjs"),
    },
  } = option;

  const win = new BrowserWindow({
    width: size.width,
    height: size.height,
    frame,
    fullscreen,
    maximizable,
    resizable,
    show: false,
    closable,
    focusable,
    title,
    icon,
    modal,
    alwaysOnTop,
    webPreferences,
  });

  if (isMaximized) {
    win.maximize();
  }

  // 可以根据其他传入的参数来设置窗口的最小/最大尺寸
  if (option.minSize) {
    win.setMinimumSize(option.minSize.width, option.minSize.height);
  }
  if (option.maxSize) {
    win.setMaximumSize(option.maxSize.width, option.maxSize.height);
  }
  win.on("maximize", () => {
    win.webContents.send(ElectronChannel.window.maximize);
  });

  win.on("unmaximize", () => {
    win.webContents.send(ElectronChannel.window.unMaximize);
  });
  // 可以根据router加载页面
  // if (option.router) {
  //   const winURL = `file://${__dirname}/dist/index.html#${option.router}`;
  //   win.loadURL(winURL);
  // }

  option.id = win.webContents.id;
  //TODO 未完成
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(
      VITE_DEV_SERVER_URL +
        "#" +
        option.router +
        (option.router.includes("?") ? "&" : "?") +
        "data=" +
        encodeURIComponent(JSON.stringify(option)),
    );
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }

  // 在创建时显示窗口

  win.once("ready-to-show", () => {
    if (show) {
      win.show();
    }
  });

  // 设置允许加载图标资源的 CSP
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [
          "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;",
        ],
      },
    });
  });

  win.webContents.openDevTools();
  windowMap.set(win.webContents.id, win);
}
