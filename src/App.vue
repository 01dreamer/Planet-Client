<script lang="ts" setup>
import CustomHeader from "@/render/components/CustomHeader.vue";
import router from "@/router";
import { useRouterStore } from "@/store";
import { useWindowStore } from "@/store/module/window.ts";
import { onMounted, watch } from "vue";

import { useRoute } from "vue-router";

const routerStore = useRouterStore();
const windowStore = useWindowStore();
const route = useRoute();

const themeOverrides = {
  common: {
    primaryColor: "#2b7bb4",
    primaryColorHover: "#266da0",
    primaryColorPressed: "#266da0",
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
    <CustomHeader v-bind="windowStore.state.windows?.header" />
    <RouterView />
  </NConfigProvider>
</template>

<style scoped></style>
