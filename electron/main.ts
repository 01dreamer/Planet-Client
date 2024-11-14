import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ElectronChannel } from "../src/constants/electron.ts";

import {
  closeWindow,
  createWindow,
  maximizeWindow,
  minimizeWindow,
  resizeWindow,
  showWindow,
  unMaximizeWindow,
} from "./window";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// executeCommand();
process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

// 注册通信事件
registerHandler();

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    // createWindow();
  }
});

app.whenReady().then(() => {
  createWindow(null, {
    title: "Main Window",
    header: {
      show: false,
    },
    minSize: {
      height: 600,
      width: 800,
    },
    router: "home",
    size: {
      height: 800,
      width: 1200,
    },
    zIndex: 0,
  });
});

function registerHandler() {
  ipcMain.handle(ElectronChannel.window.close, closeWindow);
  ipcMain.handle(ElectronChannel.window.show, showWindow);
  ipcMain.handle(ElectronChannel.window.resize, resizeWindow);
  ipcMain.handle(ElectronChannel.window.minimize, minimizeWindow);
  ipcMain.handle(ElectronChannel.window.create, createWindow);
  ipcMain.handle(ElectronChannel.window.unMaximize, unMaximizeWindow);
  ipcMain.handle(ElectronChannel.window.maximize, maximizeWindow);
}
