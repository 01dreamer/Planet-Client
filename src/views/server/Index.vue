<script lang="ts" setup>
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
  <div
    class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-24px pt-0"
    style="max-height: calc(100vh - 200px); overflow-y: auto"
  >
    <server-card
      v-for="server in serverStore.state.servers"
      :key="server.instance!.id"
      :data="server"
    />
  </div>
</template>

<style scoped></style>
