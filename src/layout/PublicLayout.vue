<script lang="ts" setup>
import CustomHeader from "@/render/components/window/WindowHeader.vue";
import SideMenu from "@/render/components/layout/LayoutSideMenu.vue";
</script>

<template>
  <n-layout has-sider class="h-100vh gradient-background">
    <n-layout-sider width="90" content-class="p-2" class="!bg-transparent">
      <SideMenu />
    </n-layout-sider>
    <n-layout class="mask">
      <n-layout-header class="!bg-transparent">
        <CustomHeader />
      </n-layout-header>
      <n-layout-content
        class="!bg-transparent"
        style="height: calc(100vh - 50px)"
      >
        <RouterView />
      </n-layout-content>
      <n-layout-footer class="!bg-transparent">
        <div class="hidden"></div>
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<style scoped>
.gradient-background {
  background-image: linear-gradient(315deg, #a1c4fd 0%, #c2e9fb 100%);
}

.mask {
  background-color: rgba(255, 255, 255, 0.37);
}
</style>
