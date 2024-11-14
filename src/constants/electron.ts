//统一管理 electron通信通道
export const ElectronChannel = {
  window: {
    create: "window:create",
    close: "window:close",
    minimize: "window:minimize",
    maximize: "window:maximize",
    unMaximize: "window:unMaximize",
    resize: "window:resize",
    show: "window:show",
  },
};
