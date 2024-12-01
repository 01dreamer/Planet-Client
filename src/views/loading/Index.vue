<script setup lang="ts"></script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-[#cee6fd]"
  >
    <div class="i-svg-spinners:ring-resize h-12 w-12 animate-spin text-primary mb-4 text-gray-500" />
    <h1 class="text-2xl font-bold mb-4">加载中...</h1>
    <div class="w-full max-w-md space-y-4">
      <n-skeleton class="h-4 w-3/4 mx-auto" />
      <n-skeleton class="h-4 w-5/6 mx-auto" />
      <n-skeleton class="h-4 w-2/3 mx-auto" />
    </div>
    <p class="text-muted-foreground mt-4">请稍候，我们正在准备您的内容</p>
  </div>
</template>

<style scoped></style>
