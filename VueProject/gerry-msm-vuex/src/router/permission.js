/**
 * 权限效验:
 *  Vue router 中的  前置钩子函数:beforeEach(to,from,next)
 * 当进行路由跳转之前,进行判断 是否已经登陆过,登陆过则允许访问非登录页面,否则 回到登录页
 *
 * to: 即将要进入的目标路由对象
 * from: 即将要离开的路由对象
 * next: 是一个方法,可以指定路由地址,进行路由跳转
 */

import router from "../router";
import { getUserInfo } from "../api/login";
import store from "../store";

router.beforeEach((to, from, next) => {
  //1.获取token
  // const token = localStorage.getItem("gerry-msm-token");
  const token = store.state.user.token;
  console.log("token", token);
  //没有token
  if (!token) {
    //想走login之外的页面则强制去login页
    if (to.path !== "/login") {
      next({ path: "/login" });
    }
    //想走login页则放行
    else {
      //请求登录页面
      next();
    }
  }
  //有token
  else {
    //想走login页,放行
    if (to.path === "/login") {
      next();
    }
    //想走login之外的页面
    else {
      const userInfo = localStorage.getItem("gerry-msm-user");
      //有用户信息
      if (userInfo) {
        //则直接到目标路由,
        next();
      }
      //如果本地没有用户信息
      else {
        //就通过token去获取用户信息
        getUserInfo(token).then((response) => {
          const res = response.data;
          if (res.flag) {
            //如果获取到用户信息,则进行非登录页面,否则回到登录页面
            //保存到本地
            localStorage.setItem("gerry-msm-user", JSON.stringify(res.data));
            next();
          } else {
            //未获取到用户信息,重新登录
            next({ path: "/login" });
          }
        });
      }
    }
  }
});
