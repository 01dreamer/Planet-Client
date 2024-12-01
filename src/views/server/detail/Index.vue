<script lang="ts" setup>
import BaseMaskPointButton from "@/render/components/base/BaseMaskPointButton.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const tabs = ["概要", "项目", "SSH密钥", "控制台"];

const back = () => {
  router.back();
};
</script>

<template>
  <n-space vertical>
    <n-space justify="space-between" align="center" class="pr-24px">
      <div class="flex items-center">
        <i
          @click="back"
          class="i-gravity-ui:chevron-left text-28px cursor-pointer text-gray-600 hover:text-gray-7"
        />
        <n-text class="text-18px">服务器详情{{ route.params }}</n-text>
      </div>
      <n-space align="center">
        <BaseMaskPointButton
          icon="i-gravity-ui:arrow-rotate-left"
          text="刷新"
        />
      </n-space>
    </n-space>
    <n-tabs class="p-24px py-0">
      <n-tab v-for="tab in tabs" :key="tab" :name="tab" class="!font-bold">
        <!--      <i class="i-gravity-ui:tag text-l bg-gray-700" />-->
        {{ tab }}
      </n-tab>
    </n-tabs>
    <div class="max-h-[calc(100vh-155px)] overflow-y-auto">
      <RouterView />
    </div>
  </n-space>
</template>

<style scoped></style>
