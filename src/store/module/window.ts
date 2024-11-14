import { ElectronChannel } from "@/constants/electron.ts";
import { WindowType } from "@/typing/window";

import { defineStore } from "pinia";
import { ref } from "vue";

type WindowState = {
  windows?: WindowType.Window;
};

export const useWindowStore = defineStore("window", () => {
  const state = ref<WindowState>({
    windows: undefined,
  });

  window.ipcRenderer.on(ElectronChannel.window.maximize, () => {
    state.value.windows!.isMaximized = true;
  });

  window.ipcRenderer.on(ElectronChannel.window.unMaximize, () => {
    state.value.windows!.isMaximized = false;
  });

  const addWindow = async (windowOption: WindowType.Window) => {
    await window.ipcRenderer.invoke(
      ElectronChannel.window.create,
      windowOption,
    );
  };

  const closeWindow = async (id?: number) => {
    await window.ipcRenderer.invoke(
      ElectronChannel.window.close,
      id ?? state.value.windows?.id,
    );
  };

  const minimizeWindow = async (id?: number) => {
    await window.ipcRenderer.invoke(
      ElectronChannel.window.minimize,
      id ?? state.value.windows?.id,
    );
  };

  const unMaximizeWindow = async (id?: number) => {
    await window.ipcRenderer.invoke(
      ElectronChannel.window.unMaximize,
      id ?? state.value.windows?.id,
    );
    state.value.windows!.isMaximized = false;
  };

  const maximizeWindow = async (id?: number) => {
    await window.ipcRenderer.invoke(
      ElectronChannel.window.maximize,
      id ?? state.value.windows?.id,
    );
    state.value.windows!.isMaximized = true;
  };

  return {
    state,
    actions: {
      addWindow,
      closeWindow,
      minimizeWindow,
      unMaximizeWindow,
      maximizeWindow,
    },
  };
});
