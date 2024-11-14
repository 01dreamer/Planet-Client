import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import request from "@/utils/request";

import "virtual:uno.css";

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(router);

window.$request = request;

app.mount("#app").$nextTick(() => {
  // Use contextBridge
  window.ipcRenderer.on("main-process-message", (_event, message) => {
    console.log(message);
  });
});
