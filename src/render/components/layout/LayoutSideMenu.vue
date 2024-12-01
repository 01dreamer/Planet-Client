<script lang="ts" setup>
import SideMenuItem from "@/render/components/layout/LayoutSideMenuItem.vue";
import { useSideStore, useWindowStore } from "@/store";

const sideStore = useSideStore();
const windowStore = useWindowStore();

const test = () => {
  windowStore.actions.closeWindow();
  windowStore.actions.addWindow({
    title: "Main Window",
    header: {
      show: false,
    },
    minSize: {
      height: 600,
      width: 800,
    },
    router: "/home",
    size: {
      height: 800,
      width: 1200,
    },
    zIndex: 0,
  });
};
</script>

<template>
  <n-space align="center" class="h-100%" justify="space-between" vertical>
    <div class="!gap-0 flex flex-col justify-center items-center" @click="test">
      <img
        alt="logo"
        class="w-8 h-8"
        src="../../../../public/logo_planet.png"
      />
      <n-text class="font-bold text-5 mt-[-10px]">Planet</n-text>
    </div>
    <n-space align="center" justify="space-between" vertical>
      <SideMenuItem
        v-for="item in sideStore.state.side.options"
        :key="item.key1"
        v-bind="item"
      />
    </n-space>
    <n-space align="center" justify="space-between" vertical>
      <SideMenuItem
        v-for="item in sideStore.state.sysSide.options"
        :key="item.key1"
        class="text-gray-600 hover:text-gray-800"
        v-bind="item"
      />
    </n-space>
  </n-space>
</template>

<style scoped></style>
