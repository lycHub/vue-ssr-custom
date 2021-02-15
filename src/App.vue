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
<style scoped lang="scss">
  .main {
    color: #e234a7;
  }
</style>
