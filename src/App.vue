<script lang="ts" setup>
import CustomHeader from "@/render/components/window/WindowHeader.vue";
import router from "@/router";
import { useRouterStore } from "@/store";
import { useWindowStore } from "@/store/module/window.ts";
import { onMounted, watch } from "vue";
import { GlobalThemeOverrides } from "naive-ui";

import { useRoute } from "vue-router";

const routerStore = useRouterStore();
const windowStore = useWindowStore();
const route = useRoute();

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: "#35394f",
    primaryColorHover: "#1f2026",
    primaryColorPressed: "#1f2026",
  },
  Button: {
    borderRadiusSmall: "8px",
    borderRadiusMedium: "10px",
  },
  Input: {
    borderRadius: "8px",
    border: "1px solid #1f202650",
    boxShadowFocus: "",
  },
};

watch(
  () => route.query.data,
  (option) => {
    if (!option) return;
    windowStore.state.windows = JSON.parse(option as string);
  },
);

onMounted(() => {
  routerStore.actions.initRouter(router);
});
</script>

<template>
  <NConfigProvider :themeOverrides="themeOverrides">
    <NMessageProvider>
      <CustomHeader v-bind="windowStore.state.windows?.header" />
      <RouterView />
    </NMessageProvider>
  </NConfigProvider>
</template>

<style scoped></style>
