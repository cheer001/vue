(function () {
  window.router = new VueRouter({
    //全局配置 router-link 生成的CSS 类名
    linkActiveClass: "active",
    routes: [
      {
        path: "/",
        component: AppHome,
      },
      {
        path: "/news",
        component: News,
        children: [
          {
            //当匹配到 /news/sport时
            //组件 Sport 会被渲染在 N热水组件中的 <router-view>组件中
            path: "/news/sport",
            component: Sport,
          },
          {
            //简写方式，等价于 /news/tech,前面不要有/,有/就是根目录了
            path: "tech",
            component: Tech,
          },
          {
            //默认选择的路由： /news 后面没有子路径时,redirect 就是重定向到指定路径
            path: "",
            redirect: "/news/sport",
          },
        ],
      },
      {
        path: "/about",
        component: About,
      },
    ],
  });
})();
