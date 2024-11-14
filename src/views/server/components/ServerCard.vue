<script lang="ts" setup>
import { useServerStore } from "@/store/module/server.ts";
import { ServerType } from "@/typing/server";
import { computed, onBeforeUnmount, onMounted } from "vue";

const props = withDefaults(
  defineProps<{
    data: ServerType.Server;
  }>(),
  {},
);

let stop: any;
const serverStore = useServerStore();

async function fetchServerState() {
  await serverStore.actions.fetchServerState({
    host: props.data.instance!.ip!,
  });
}

onMounted(() => {
  // 轮询获取服务器状态
  stop = setInterval(fetchServerState, 2000);
});

onBeforeUnmount(() => {
  stop();
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
    text: "未知",
  },
};

const statusOption = computed(() => {
  if (!props.data.status) {
    return statusMap.unknown;
  }
  return statusMap[props.data.status.status];
});
</script>

<template>
  <n-card embedded style="height: max-content">
    <n-space align="center">
      <div>
        <svg
          class="icon"
          fill="#333333"
          height="40"
          viewBox="0 0 1024 1024"
          width="40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M870.4 906.971H153.6c-43.886 0-80.457-29.257-80.457-73.142v-87.772c0-43.886 36.571-73.143 80.457-73.143h724.114c43.886 0 80.457 29.257 80.457 73.143v87.772c-7.314 43.885-43.885 73.142-87.771 73.142z m-87.771-168.228c-29.258 0-58.515 21.943-58.515 58.514 0 29.257 21.943 58.514 58.515 58.514 29.257 0 58.514-21.942 58.514-58.514 0-29.257-21.943-58.514-58.514-58.514zM870.4 629.029H153.6c-43.886 0-80.457-36.572-80.457-73.143v-87.772c0-43.885 36.571-73.143 80.457-73.143h724.114c43.886 0 80.457 29.258 80.457 73.143v87.772c-7.314 36.571-43.885 73.143-87.771 73.143z m-87.771-175.543c-29.258 0-51.2 29.257-51.2 58.514s21.942 58.514 58.514 58.514c29.257 0 58.514-21.943 58.514-58.514-7.314-29.257-29.257-58.514-65.828-58.514zM870.4 343.77H153.6c-43.886 0-80.457-29.257-80.457-73.142v-87.772c0-43.886 36.571-73.143 80.457-73.143h724.114c43.886 0 80.457 29.257 80.457 73.143v87.772c-7.314 43.885-43.885 73.142-87.771 73.142zM731.429 226.743c0 29.257 21.942 58.514 58.514 58.514 29.257 0 58.514-21.943 58.514-58.514 0-29.257-21.943-58.514-58.514-58.514-36.572 7.314-58.514 29.257-58.514 58.514z"
          ></path>
        </svg>
      </div>
      <n-space class="!gap-0" vertical>
        <n-space>
          <span class="text-gray-500 text-3">#{{ data.instance!.id }}</span>
          <span>{{ data.instance!.name }}</span>
        </n-space>
        <n-space align="center" class="!gap-2">
          <div
            :style="{ backgroundColor: statusOption.color }"
            class="w-2 h-2 rounded-full border-2 border-white"
          />
          <div>
            {{ statusOption.text }}
          </div>
        </n-space>
      </n-space>
    </n-space>
    <template #footer>
      <n-space align="start" class="text-12px text-gray-600" vertical>
        <div>
          CPU核心 {{ data.instance?.cpuCores }}
          <n-divider vertical />
          内存 {{ data.status?.memTotal }}
          <n-divider vertical />
          磁盘 {{ data.status?.diskTotal }}
        </div>
        <div>(公) {{ data.instance?.ip }}</div>
      </n-space>
    </template>
    <!--      <template #action> #action</template>-->
  </n-card>
</template>

<style scoped>
/* 卡片的基础样式 */
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 280px;
  height: 380px;
  padding: 16px;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.card:hover {
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
}

.card .server-icon {
  position: relative;
}

.card .status-dot {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 10px;
  height: 10px;
  border: 2px solid white;
  border-radius: 50%;
}

.card-info div {
  margin-bottom: 8px;
}

.card-info {
  padding-top: 16px;
}
</style>
