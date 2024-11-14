<script lang="ts" setup>
import { useSideStore } from "@/store";
import { SideType } from "@/typing/side";
import { computed, h } from "vue";

const props = withDefaults(defineProps<SideType.SideOption>(), {
  active: false,
  disabled: false,
  icon: undefined,
  show: true,
  showIcon: true,
  showLabel: true,
  showMask: true,
  actionable: true,
});

const sideStore = useSideStore();

const iconRender = computed(() => {
  const node = h("div");

  if (!props.showIcon) return node;

  if (typeof props.icon === "string") {
    return h("div", { class: `${props.icon} text-6` });
  }

  if (typeof props.icon === "function") {
    return props.icon();
  }

  if (props.icon && typeof props.icon === "object") {
    return props.icon;
  }

  return node;
});

const select = async () => {
  if (props.actionable) {
    await sideStore.actions.select(props.key1);
  }
  if (props.execute) {
    props.execute(props.key1);
  }
};
</script>

<template>
  <n-space
    :class="{
      'hover:bg-[rgba(0,0,0,0.05)]': showMask,
      'text-blue-700': key1 === sideStore.state.side.currentActive,
    }"
    align="center"
    class="!gap-0 px-3 py-2 cursor-pointer rounded-l transition-all select-none min-w-45px"
    justify="center"
    vertical
    @click="select"
  >
    <component :is="iconRender" v-if="showIcon" />
    <div v-if="showLabel" class="mt-[-5px] font-bold">{{ label }}</div>
  </n-space>
</template>

<style scoped></style>
