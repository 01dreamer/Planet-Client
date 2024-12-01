<script lang="ts" setup>
import PublicLayout from "@/layout/PublicLayout.vue";
import AppCustomUserPlane from "@/render/components/app/AppCustomUserPlane.vue";
import { useWindowStore } from "@/store/module/window.ts";

const windowStore = useWindowStore();
</script>

<template>
  <PublicLayout />
</template>

<style scoped></style>
