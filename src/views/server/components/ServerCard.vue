<script lang="ts" setup>
import MaskPointButton from "@/render/components/base/BaseMaskPointButton.vue";
import BaseStatusRound from "@/render/components/base/BaseStatusRound.vue";
import { ServerType } from "@/typing/server";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

withDefaults(
  defineProps<{
    data: ServerType.Server;
  }>(),
  {},
);

const router = useRouter();

const favorite = ref(false);

const options = [
  {
    label: "查看详情",
    key: "detail",
  },
];

const toDetail = (id: number) => {
  // 阻止事件冒泡
  //@ts-ignore
  if (event.target.tagName == "I") return;
  router.push({
    name: "server-detail-summary",
    params: {
      id,
    },
  });
};
</script>

<template>
  <n-card
    id="card"
    class="!relative cursor-pointer transition-all hover:shadow !bg-[rgba(255,255,255,0.3)]"
    embedded
    @click="() => toDetail(data.instance?.id!!)"
  >
    <MaskPointButton
      :icon="
        favorite
          ? 'i-gravity-ui:star-fill bg-yellow hover:bg-yellow'
          : 'i-gravity-ui:star hover:bg-yellow'
      "
      :text="favorite ? '取消收藏' : '收藏'"
      class="!absolute !top-0 !right-0"
      @click="favorite = !favorite"
    />
    <n-space justify="space-between">
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
          <BaseStatusRound
            :status="data.status ? data.status.status : undefined"
          />
        </n-space>
      </n-space>
      <n-space class="!gap-0" justify="start">
        <n-dropdown
          :options="options"
          placement="bottom-start"
          size="small"
          trigger="click"
        >
          <MaskPointButton
            icon="i-line-md:close-to-menu-alt-transition"
            text=""
          />
        </n-dropdown>
      </n-space>
    </n-space>
    <template #footer>
      <n-space align="start" class="text-12px text-gray-600" vertical>
        <div>
          CPU-{{ data.instance?.cpuCores }}核
          <n-divider class="!bg-gray-300" vertical />
          内存-{{ data.status?.memTotal }}
          <n-divider class="!bg-gray-300" vertical />
          磁盘-{{ data.status?.diskTotal }}
        </div>
        <div>{{ data.instance?.os }}</div>
        <div>(公) {{ data.instance?.ip }}</div>
      </n-space>
    </template>
    <!--      <template #action> #action</template>-->
  </n-card>
</template>

<style scoped></style>
