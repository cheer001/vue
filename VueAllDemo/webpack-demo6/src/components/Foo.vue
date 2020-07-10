<template>
  <div id="container">
    <h1>我是Foo子组件</h1>
    <h2>我是Foo子组件 h2---</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
};
</script>

<style scoped>
/* scoped 作用是将样式只作用到当前组件中，不然会传递到其他 父子组件中 */
h2 {
  color: blue;
}
</style>
