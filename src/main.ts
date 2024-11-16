import request from "@/utils/request";
import { createDiscreteApi } from "naive-ui";
import { createPinia } from "pinia";
import { createApp } from "vue";
import "./assets/font/font.css";
import "./style.css";
import App from "./App.vue";
import router from "./router";

import "virtual:uno.css";

const pinia = createPinia();
const { message } = createDiscreteApi([
  "message",
  "dialog",
  "notification",
  "loadingBar",
  "modal",
]);

const app = createApp(App);
app.use(pinia);
app.use(router);

window.$request = request;
window.$message = message;

app.mount("#app").$nextTick(() => {
  // Use contextBridge
  window.ipcRenderer.on("main-process-message", (_event, message) => {
    console.log(message);
  });
});
