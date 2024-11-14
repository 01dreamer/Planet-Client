<script lang="ts" setup>
import MaskPointButton from "@/render/components/MaskPointButton.vue";
import { useServerStore } from "@/store/module/server.ts";
import ServerCard from "@/views/server/components/ServerCard.vue";
import { onMounted } from "vue";

const serverStore = useServerStore();

const tabs = ["全部", "运行中", "停止"];

onMounted(() => {
  serverStore.actions.fetchServerList();
});
</script>

<template>
  <n-tabs class="p-24px pb-0">
    <n-tab v-for="tab in tabs" :key="tab" :name="tab" class="!font-bold">
      {{ tab }}
    </n-tab>
  </n-tabs>
  <n-space justify="space-between" align="center" class="px-24px pt-10px">
    <n-space align="center" class="!gap-2">
      <n-button size="small" type="primary" class="!py-18px !text-gray-100">
        <template #icon>
          <i class="i-gravity-ui:plus" />
        </template>
        添加服务器
      </n-button>
    </n-space>
    <n-space align="center" justify="end">
      <MaskPointButton text="刷新" icon="i-gravity-ui:arrows-rotate-right" />
    </n-space>
  </n-space>
  <div
    class="mt-6 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-24px pt-0"
    style="max-height: calc(100vh - 155px); overflow-y: auto"
  >
    <server-card
      v-for="server in serverStore.state.servers"
      :key="server.instance!.id"
      :data="server"
    />
  </div>
</template>

<style scoped></style>
