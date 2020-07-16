import Vue from "vue";
import VueRouter from "vue-router";
// import Login from "../views/login/index.vue";
//下面情况,默认的会导入 ../views/login  目录下的index.vue组件
import Login from "../views/login";

import Home from "../views/home";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login", //路由名称
      component: Login //组件对象
    }
  ]
});
