<template>
  <div class="main">
    <header>
      <Nav :list="channels" />
    </header>
    <router-view />
  </div>
</template>
<script>
  import Nav from './components/Nav';
  import { mapState, mapActions } from 'vuex';
  import axios from "axios";
  export default {
    name: 'App',
    components: { Nav },
    data() {
      return {
        title: 'abc',
        // channels: []
      }
    },
    computed: mapState(['channels']),
    methods: mapActions(['fetchChannels']),
    // 2.6新增，任何组件都能用这个钩子, 以前的async只能匹配到路由组件
    serverPrefetch() {
      return this.fetchChannels();
    },
    /*created() {
      axios.get('https://toutiao.m.lipengzhou.com/api/app/v1_0/user/channels').then(({ data }) => {
        console.log('channels>>>>>>>>>>>>', data);
      }).catch(error => {
        console.log('请求失败>>>>>>');
      });
    }*/
  }
</script>
<style scoped lang="scss">
  .main {
    color: #e234a7;
  }
</style>
