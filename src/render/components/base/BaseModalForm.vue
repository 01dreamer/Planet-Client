<script lang="ts" setup>
type Props = {
  title: string;
  icon: string;
  show: boolean;
};

withDefaults(defineProps<Props>(), {
  title: "标题",
  icon: "i-bx:bxs-error",
});

const emit = defineEmits(["update:show"]);

const close = () => {
  emit("update:show", false);
};
</script>

<template>
  <n-modal :show="show">
    <n-card
      class="!rounded-15px md:w-400px lg:w-600px xl:w-800px"
      closable
      @close="close"
    >
      <template #header>
        <div class="flex items-center mb-10px select-none">
          <i :class="icon" />
          <n-text class="text-gray-600 text-14px ml-5px">{{ title }}</n-text>
        </div>
      </template>
      <slot />
    </n-card>
  </n-modal>
</template>

<style scoped></style>
