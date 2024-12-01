<script lang="ts" setup>
import BaseMaskPointButton from "@/render/components/base/BaseMaskPointButton.vue";
import BaseStatusRound from "@/render/components/base/BaseStatusRound.vue";
import { useServerStore } from "@/store/module/server.ts";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const serverStore = useServerStore();
const route = useRoute();

const server = ref<any>({});

onMounted(() => {
  const id = route.params.id as unknown as number;
  server.value = serverStore.state.servers.find(
    (item) => item.instance?.id == id,
  );
});
</script>

<template>
  <n-space class="px-24px" vertical>
    <div class="grid cols-2 gap-2">
      <n-space vertical class="p-16px bg-white bg-opacity-30! shadow-sm">
        <!-------------------------------------------------------服务器信息--------------------------------------------------------->
        <n-space align="center" justify="space-between">
          <n-text class="font-bold text-lg">服务器信息</n-text>
          <BaseMaskPointButton
            icon="i-gravity-ui:pencil-to-square"
            text="修改服务器信息"
          />
        </n-space>
        <n-space align="center">
          <div class="text-gray-400 min-w-100px">服务器ID</div>
          <div>{{ server.instance?.id }}</div>
        </n-space>
        <n-space align="center">
          <div class="text-gray-400 min-w-100px">服务器名称</div>
          <div>{{ server.instance?.name }}</div>
        </n-space>
        <n-space align="start">
          <div class="text-gray-400 min-w-100px">服务器IP</div>
          <n-space vertical>
            <div>(公) {{ server.instance?.ip }}</div>
            <div>(内) {{ server.instance?.ip }}</div>
          </n-space>
        </n-space>
        <n-space align="center">
          <div class="text-gray-400 min-w-100px">服务器状态</div>
          <BaseStatusRound :status="server.status?.status" />
        </n-space>

        <n-space align="start">
          <div class="text-gray-400 min-w-100px">服务器规格</div>
          <n-space vertical>
            <div>CPU - {{ server.instance?.cpuCores }}核</div>
            <div>内存 - {{ server.instance?.memory }}MB</div>
            <div>磁盘 - {{ server.instance?.disk }}GB</div>
          </n-space>
        </n-space>
        <n-space align="center">
          <div class="text-gray-400 min-w-100px">密钥</div>
          <div>暂无密钥</div>
        </n-space>
        <n-space align="center">
          <div class="text-gray-400 min-w-100px">标签</div>
          <!--          <div>{{ server.instance?.tags }}</div>-->
          <n-tag type="info" size="small">Docker</n-tag>
          <n-tag type="success" size="small">Planet</n-tag>
          <n-tag type="info" size="small">SpringCloud</n-tag>
        </n-space>
        <n-space align="center">
          <div class="text-gray-400 min-w-100px">创建时间</div>
          <n-time :time="server.instance?.createdAt" type="datetime" />
        </n-space>
        <n-space align="center">
          <div class="text-gray-400 min-w-100px">更新时间</div>
          <n-time :time="server.instance?.updatedAt" type="datetime" />
        </n-space>
      </n-space>
      <!-------------------------------------------------------服务器监控--------------------------------------------------------->
      <n-space class="p-16px bg-white bg-opacity-30! shadow-sm" vertical>
        <n-space justify="space-between" align="center">
          <n-text class="font-bold text-lg">服务器监控</n-text>
          <BaseMaskPointButton icon="i-gravity-ui:gear" text="设置" />
        </n-space>
      </n-space>
      <!-------------------------------------------------------登录信息--------------------------------------------------------->
      <n-space class="p-16px bg-white bg-opacity-30! shadow-sm" vertical>
        <n-space align="center" justify="space-between">
          <n-text class="font-bold text-lg">登录信息</n-text>
          <BaseMaskPointButton
            icon="i-gravity-ui:pencil-to-square"
            text="修改登录信息"
          />
        </n-space>
        <n-space align="center">
          <div class="text-gray-400 min-w-100px">登录用户</div>
          <div>forest</div>
        </n-space>
        <n-space align="center">
          <div class="text-gray-400 min-w-100px">登录方式</div>
          <div>用户名-密码 / 密钥</div>
        </n-space>
        <n-space align="center">
          <div class="text-gray-400 min-w-100px">登录凭证</div>
          <div>*************</div>
        </n-space>
      </n-space>
      <!-------------------------------------------------------系统信息--------------------------------------------------------->
      <n-space class="p-16px bg-white bg-opacity-30! shadow-sm" vertical>
        <n-text class="font-bold text-lg">系统信息</n-text>
        <n-space align="center">
          <div class="text-gray-400 min-w-100px">系统名称</div>
          <div>{{ server.instance?.os }}</div>
        </n-space>
      </n-space>
      <!-------------------------------------------------------系统信息--------------------------------------------------------->
      <n-space class="p-16px bg-white bg-opacity-30! shadow-sm" vertical>
        <n-text class="font-bold text-lg">源数据-调试</n-text>
        {{ server }}
      </n-space>
    </div>
  </n-space>
</template>

<style scoped></style>
