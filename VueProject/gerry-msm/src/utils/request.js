import axios from "axios";
import { Loading } from "element-ui";

const loading = {
  loadindInstance: null, //loading实例
  //打开加载
  open: function() {
    //创建实例,而且会打开加载窗口
    //单例模式 实例为空则创建
    if (this.loadindInstance === null) {
      this.loadindInstance = Loading.service({
        target: ".main",
        text: "拼了老命加载钟...",
        background: "rgba(0, 0, 0, 0.5)"
      });
    }
  },
  //关闭加载
  close: function() {
    if (this.loadindInstance != null) {
      this.loadindInstance.close();
    }
    //关闭加载后实例至为空
    this.loadindInstance = null;
  }
};
// axios.get("/db.json").then(response => {
//   const data = response.data;
//   console.log(data);
// });

const request = axios.create({
  //   baseURL: "/dev-api", //
  // baseURL: "/", //
  // /db.json  > 通过 axios> /dev-api/db.json >  通过代理转发(vue.config.js)  >> http://localhost:8001/db.json
  // baseURL: "/dev-api", //
  baseURL: process.env.VUE_APP_BASE_API, //请求路径的基础URL(也就是前缀)
  timeout: 5000 //请求超时.5000毫秒
});

// request.get("/db.json").then(response => {
//   const data = response.data;
//   console.log(data);
// });

//请求拦截器
request.interceptors.request.use(
  config => {
    //请求的拦截

    //打开加载窗口
    loading.open();
    return config;
  },
  error => {
    loading.close();
    //出现异常的时候
    return Promise.reject(error);
  }
);
//响应拦截器
request.interceptors.response.use(
  response => {
    //关闭加载窗口
    loading.close();
    return response;
  },
  error => {
    loading.close();
    return Promise.reject(error);
  }
);
// Add a request interceptor
// axios.interceptors.request.use(
//   function(config) {
//     // Do something before request is sent
//     return config;
//   },
//   function(error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// axios.interceptors.response.use(
//   function(response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   function(error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );

export default request; //导出自定义创建的 axios 对象
