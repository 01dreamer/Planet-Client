<script lang="ts" setup>
import CustomHeader from "@/render/components/CustomHeader.vue";

function open() {
  window.open();
}
</script>

<template>
  <CustomHeader :show-maximize="false" header="登录" />

  <div class="text-20 text-red-500" @click="open">Hello World</div>
  <div class="i-carbon-add text-20"></div>
</template>

<style scoped></style>
