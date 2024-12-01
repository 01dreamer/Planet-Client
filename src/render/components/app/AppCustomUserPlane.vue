<script lang="ts" setup>
import { useWindowStore } from "@/store";

const windowStore = useWindowStore();

const test = () => {
  windowStore.actions.closeWindow();
  windowStore.actions.addWindow({
    title: "Login Window",
    maximizable: false,
    minSize: {
      height: 650,
      width: 1000,
    },
    header: {
      show: false,
    },
    maxSize: {
      height: 650,
      width: 1000,
    },
    router: "/login",
    size: {
      height: 650,
      width: 1000,
    },
    zIndex: 0,
  });
};
</script>

<template>
  <div class="flex flex-col p-16px min-w-250px">
    <n-space align="center" justify="space-between">
      <n-space vertical>
        <n-text class="font-bold text-sm">五个字名字</n-text>
      </n-space>
      <n-avatar round size="medium" src="/src/assets/images.jpg" />
    </n-space>
    <div class="h-300px flex items-center justify-center">
      <div class="text-gray-500">保留区域</div>
    </div>
    <div class="flex flex-col border rounded-5px">
      <n-space
        align="center"
        class="p-5px hover:bg-[#e3eefe] !transition-all !transition-200 cursor-pointer py-10px"
        justify="space-between"
      >
        <n-text>修改头像</n-text>
        <div class="flex items-center">
          <n-avatar round size="small" src="/src/assets/images.jpg" />
          <i class="i-gravity-ui:chevron-right text-20px text-gray-400" />
        </div>
      </n-space>
      <n-space
        align="center"
        class="p-5px hover:bg-[#e3eefe] !transition-all !transition-200 cursor-pointer py-10px"
        justify="space-between"
      >
        <n-text>修改昵称</n-text>
        <div class="flex items-center">
          <n-text class="text-gray-400">五个字名字</n-text>
          <i class="i-gravity-ui:chevron-right text-20px text-gray-400" />
        </div>
      </n-space>
      <n-space
        align="center"
        class="p-5px hover:bg-[#e3eefe] !transition-all !transition-200 cursor-pointer py-10px"
        justify="space-between"
        @click="test"
      >
        <n-text>退出登录</n-text>
        <div class="flex items-center">
          <n-text class="text-gray-400"></n-text>
          <i class="i-gravity-ui:chevron-right text-20px text-gray-400" />
        </div>
      </n-space>
    </div>
  </div>
</template>

<style scoped></style>
