<template>
  <div class="error-page">
    <h1>403 - Forbidden</h1>
    <p>You do not have permission to access this page.</p>
    <router-link to="/home">Go back to Home</router-link>
  </div>
</template>

<style scoped>
.error-page {
  text-align: center;
  padding: 50px;
}
</style>
