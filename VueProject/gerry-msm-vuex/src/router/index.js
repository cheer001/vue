import Vue from "vue";
import VueRouter from "vue-router";
// import Login from "../views/login/index.vue";
//下面情况,默认的会导入 ../views/login  目录下的index.vue组件
import Login from "../views/login";
import Layout from "@/components/Layout.vue";
import Home from "../views/home";
import Member from "../views/member";
import Supplier from "../views/supplier";
import Goods from "../views/goods";
import Staff from "../views/staff";

Vue.use(VueRouter);

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export default new VueRouter({
  routes: [
    {
      path: "/login",
      name: "login", //路由名称
      component: Login //组件对象
    },
    {
      path: "/",
      name: "layout",
      component: Layout,
      redirect: "/home",
      children: [
        {
          path: "/home",
          component: Home,
          meta: { title: "首页" }
        }
        // {
        //   path: "/member",
        //   component: Member
        // }
      ]
    },
    {
      path: "/member",
      component: Layout,
      children: [
        {
          path: "/",
          component: Member,
          meta: { title: "会员管理" }
        }
      ]
    },
    {
      path: "/supplier",
      component: Layout,
      children: [
        {
          path: "/",
          component: Supplier,
          meta: { title: "供应商管理" }
        }
      ]
    },
    {
      path: "/goods",
      component: Layout,
      children: [
        {
          path: "/",
          component: Goods,
          meta: { title: "商品管理" }
        }
      ]
    },
    {
      path: "/staff",
      component: Layout,
      children: [
        {
          path: "/",
          component: Staff,
          meta: { title: "员工管理" }
        }
      ]
    }
  ]
});
