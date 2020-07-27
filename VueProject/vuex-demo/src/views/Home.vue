<template>
  <div>
    <!-- count:{{ $store.state.count }} -->
    count:{{ $store.state.home.count }}
    <button @click="addCount">加法</button>
    <button @click="decrement">减法</button>
    派生属性desc:{{$store.getters.desc}}
  </div>
</template>
<script>
export default {
  methods: {
    addCount() {
      //获取状态值
      console.log(this.$store.state.home.count);
      // this.$store.commit("increment",10);
      this.$store.dispatch("add", 10);
    },
    decrement() {
      console.log(this.$store.state.home.count);
      // this.$store.commit("decrement");
      this.$store.dispatch("decrement")
    },
  },
};
</script>
