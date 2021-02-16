<template>
  <div class="nav">
    <ul>
      <li v-for="item of list" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Nav",
    props: {
      list: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style scoped lang="scss">
 .nav ul {
   display: flex;
 }
</style>
