<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{ status: string }>(), {
  status: "unknown",
});

const statusMap = {
  running: {
    color: "#67c23a",
    text: "运行中",
  },
  stopped: {
    color: "#909399",
    text: "已停止",
  },
  starting: {
    color: "#e6a23c",
    text: "启动中",
  },
  stopping: {
    color: "#f56c6c",
    text: "停止中",
  },
  error: {
    color: "#f56c6c",
    text: "异常",
  },
  unknown: {
    color: "#909399",
    text: "加载中",
  },
};

const statusOption = computed(() => {
  if (!props.status) {
    return statusMap.unknown;
  }
  return statusMap[props.status];
});
</script>

<template>
  <n-space align="center" class="!gap-2">
    <div
      :style="{ backgroundColor: statusOption.color }"
      class="w-2 h-2 rounded-full border-2 border-white"
    />
    <div>{{ statusOption.text }}</div>
  </n-space>
</template>

<style scoped></style>
