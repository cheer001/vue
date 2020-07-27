import Vue from "vue";
//默认导入的是 ./store/index.js
import store from "./store";
//注意引入在Vue打的下面
// ElementUI组件库
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import App from "./App.vue";
import router from "./router";

//使用ElementUI
Vue.use(ElementUI);

Vue.config.productionTip = process.env.NODE_ENV === "production";
console.log(process.env.NODE_ENV); //开发环境development  ,生产环境production

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
