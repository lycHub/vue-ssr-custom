<template>
  <div class="main">
    <header>
      <Nav :list="channels" />
    </header>
    <router-view />
  </div>
</template>
<script>
  import axios from "axios";
  import Nav from './components/Nav';

  export default {
    name: 'App',
    components: { Nav },
    data() {
      return {
        title: 'abc',
        channels: []
      }
    },
    created() {
      axios.get('/api/app/v1_0/user/channels').then(({ data }) => {
        this.channels = data.data.channels;
      });
    }
  }
</script>
<style scoped lang="scss">
  .main {
    color: #e234a7;
  }
</style>
