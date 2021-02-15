<template>
  <div class="home">
    <h2>this is home</h2>
    <router-link to="/about">to about</router-link>
    <div class="test" @click="onClick">test</div>
  </div>
</template>

<script>
  export default {
    name: "Home",
    metaInfo: {
      title: 'Home us'
    },
    methods: {
      onClick() {
        alert('aaa');
      }
    }
  }
</script>

<style scoped lang="scss">
  .home {
    .test {
      color: aqua;
    }
  }
</style>
