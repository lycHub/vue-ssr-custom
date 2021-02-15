<template>
  <div class="main">
    App -- {{ title }}
    <router-view />
  </div>
</template>
<script>
  export default {
    name: 'App',
    data() {
      return {
        title: 'abc'
      }
    }
  }
</script>
<style scoped>
  .main {
    color: #e234a7;
  }
</style>
