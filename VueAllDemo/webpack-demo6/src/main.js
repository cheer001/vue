//通过这种方式引入的vue模块，对应的不是完整版(编译功能，运行功能)
//它默认引入的vue模块中的package.json中main选项中引入的那个 "main": "dist/vue.runtime.common.js"
//而这个默认引入的是运行版，没有编译功能，所以会发出警告
// import Vue from "vue";
//解决方案一：手动的引入指定的版本，引入完整版
// import Vue from "vue/dist/vue";
//解决方案二：采用webpack配置完整版vue.js
import Vue from "vue";
import App from "./App.vue";

// new Vue({
//   el: "#app",
//   template: "<App/>",//template实质上没有编译和渲染功能，而当前编译功能可以直接采用vue-loader进行编译
//   components: { App },
// });
//解决方案三(推荐):使用 render 函数来渲染组件
// new Vue({
//   el: "#app",
//   //   template: "<App/>",//template实质上没有编译和渲染功能，而当前编译功能可以直接采用vue-loader进行编译
//   //而渲染功能实质上是通过render函数来进行渲染组件，所以自炫耀在此处指定render函数渲染组件即可
//   //使用render后，当前可不使用components
//   //h是函数，这个函数用于接收渲染的组件，用来生成DOM元素的，render得到完整Dom后，挂载到根节点上
//   /*
//   render:function(h){
//     return h(App);//函数的返回值就是渲染的结果
//   }
//   */
//   /*
//   箭头函数  简写1.
//   render: h =>{
//    return h(App);
//   } ,
//  */
//   //箭头函数  简写2.
//   render: (h) => h(App), //ES6箭头函数
// });
new Vue({
  render: (h) => h(App), //ES6箭头函数
}).$mount("#app");
