<script lang="ts" setup>
import { ref, withDefaults } from "vue";

type Props = {
  text: string;
  icon: string;
};

const show = ref(false);

withDefaults(defineProps<Props>(), {
  icon: "i-gravity-ui:circle-question",
  text: "无",
});
</script>

<template>
  <div class="flex justify-center items-center relative !transition-all">
    <div
      class="hover:bg-[rgba(0,0,0,0.05)] flex justify-center items-center p-5px rounded-lg cursor-pointer"
      @mouseenter="show = true"
      @mouseleave="show = false"
    >
      <i :class="`${icon} text-xl  bg-gray-600 hover:bg-gray-800  `" />
    </div>

    <transition name="fade">
      <div
        v-if="show"
        class="absolute bottom--25px bg-gray-600 text-white px-10px rounded-sm ws-nowrap z-99"
      >
        {{ text }}
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
