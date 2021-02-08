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
<style>
  .main {
    color: blueviolet;
  }
</style>
