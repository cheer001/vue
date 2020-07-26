<template>
  <div>
    <app-header></app-header>
    <app-navbar></app-navbar>
    <app-main></app-main>
  </div>
</template>

<script>
// 会导入 ./AppHeader 下面的 index.vue 组件
import AppHeader from "./AppHeader";
import AppNavbar from "./AppNavbar";
import AppMain from "./AppMain";
export default {
  data() {
    return {};
  },
  components: {
    AppHeader, //头部
    AppNavbar, //导航栏
    AppMain //主区域
  }
};
</script>

<style scoped>
/* 头部区域 */
.header {
  position: absolute;
  line-height: 51px;
  top: 0px;
  left: 0px;
  right: 0px;
  background-color: #2d3a4b;
}
/* 导航栏区域 */
.navbar {
  position: absolute;
  width: 230px;
  top: 50px;
  left: 0px;
  bottom: 0px;
  overflow-y: auto;
  background-color: #545c64;
}
/* 主区域 */
.main {
  position: absolute;
  top: 50px;
  bottom: 0px;
  left: 230px;
  right: 0px;
  padding: 10px;
  /* background-color: red; */
}
</style>
