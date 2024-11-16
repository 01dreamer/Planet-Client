<script lang="ts" setup>
import { useWindowStore } from "@/store";
import { WindowType } from "@/typing/window";
import { onMounted, VNode } from "vue";

const props = withDefaults(defineProps<WindowType.WindowHeaderOptions>(), {
  show: true,
  showMinimize: true,
  showMaximize: true,
  showClose: true,
});
const windowStore = useWindowStore();

const onClose = () => {
  return props.onClose ?? windowStore.actions.closeWindow();
};

const onMinimize = () => {
  return props.onMinimize ?? windowStore.actions.minimizeWindow();
};

const onMaximize = () => {
  const isMaximized = windowStore.state.windows?.isMaximized;
  if (isMaximized) {
    return props.onUnMaximize ?? windowStore.actions.unMaximizeWindow();
  } else {
    return props.onMaximize ?? windowStore.actions.maximizeWindow();
  }
};
const renderSlot = (slot: string | VNode | (() => VNode)) => {
  return typeof slot === "function" ? slot() : slot;
};

onMounted(async () => {});
</script>

<template>
  <div
      v-if="props.show"
      :class="props.headerClass"
      :style="{ height: props.height, width: props.width, ...props.headerStyle }"
      class="header flex items-center justify-between px-2 py-2 cursor-pointer font-bold mb-3"
  >
    <div class="header-title text-x">
      <span v-if="props.header">{{ renderSlot(props.header) }}</span>
    </div>

    <div v-if="props.toolbar" class="header-toolbar text-center flex-1">
      {{ renderSlot(props.toolbar) }}
    </div>

    <NText class="text-gray-500">
      保留区域{{ windowStore.state.windows?.isMaximized }}
    </NText>

    <div class="header-operation flex gap-2 text-lg">
      <button
          v-if="showMinimize"
          class="i-gravity-ui:minus cursor-pointer transition-all duration-200 transform hover:scale-110"
          @click="onMinimize"
      />
      <button
          v-if="showMaximize"
          class="i-gravity-ui:square-dashed cursor-pointer transition-all duration-200 transform hover:scale-110"
          @click="onMaximize"
      />
      <button
          v-if="showClose"
          class="i-gravity-ui:xmark cursor-pointer transition-all duration-200 transform hover:scale-110"
          @click="onClose"
      />
    </div>
  </div>
</template>

<style scoped>
.header {
  -webkit-user-select: none;
  user-select: none;
  -webkit-app-region: drag;
}

.header-operation > button {
  -webkit-app-region: no-drag;
}
</style>
