<template>
  <n-carousel
    effect="card"
    prev-slide-style="transform: translateX(-150%) translateZ(-800px);"
    next-slide-style="transform: translateX(50%) translateZ(-800px);"
    style="height: 100px"
    :show-dots="false"
  >
    <n-carousel-item :style="{ width: '30%' }" v-for="avatar in avatars">
      <n-avatar class="carousel-img" round :src="avatar" />
    </n-carousel-item>
  </n-carousel>
</template>

<script setup>
const avatars = [
  "/src/assets/images.jpg",
  "/src/assets/images.jpg",
  "/src/assets/images.jpg",
  "/src/assets/images.jpg",
  "/src/assets/images.jpg",
];
</script>

<style scoped>
.carousel-img {
  margin: 0 auto;
  width: 100%;
  height: 91px;
  object-fit: cover;
}
</style>
