<template>
  <!-- 一个vue文件中有且仅有一个template -->
  <div>
    <h1>App 根组件</h1>
    <h2>{{ msg }}</h2>
    <Foo />
  </div>
</template>

<script>
import Foo from "./components/Foo.vue";
//导出一个默认的成员对象，它就是当前的组件对象， 可以直接在对象中使用 Vue中的选项，如data、methods等
export default {
  data() {
    return {
      msg: "hello gerry",
    };
  },
  // template,此选项不用写，因为上面template标签代表的就是当前的组件模板
  components: {
    Foo,
  },
};
</script>

<style scoped>
/* scoped 作用是将样式只作用到当前组件中，不然会传递到其他 父子组件中 */
h1 {
  color: red;
}
</style>
