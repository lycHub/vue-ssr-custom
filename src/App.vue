<template>
  <div class="main">
    <header>
      <ul>
        <li v-for="item of channels" :key="item.id">{{ item.name }}</li>
      </ul>
    </header>
    <router-view />
  </div>
</template>
<script>
  import axios from "axios";
  export default {
    name: 'App',
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
