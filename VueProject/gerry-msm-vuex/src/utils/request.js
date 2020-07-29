import axios from "axios";
import { Loading, Message } from "element-ui";

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
        background: "rgba(0, 0, 0, 0.5)",
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
  },
};
// axios.get("/db.json").then(response => {
//   const data = response.data;
//   console.log(data);
// });

const request = axios.create({
  // baseURL: "/dev-api2", //
  // baseURL: "/", //
  // /db.json  > 通过 axios> /dev-api/db.json >  通过代理转发(vue.config.js)  >> http://localhost:8001/db.json
  // baseURL: "/dev-api", //
  baseURL: process.env.VUE_APP_BASE_API, //请求路径的基础URL(也就是前缀)
  timeout: 5000, //请求超时.5000毫秒
});

// request.get("/db.json").then(response => {
//   const data = response.data;
//   console.log(data);
// });

//请求拦截器
request.interceptors.request.use(
  (config) => {
    //请求的拦截

    //打开加载窗口
    loading.open();
    return config;
  },
  (error) => {
    loading.close();
    //出现异常的时候
    return Promise.reject(error);
  }
);
//响应拦截器
request.interceptors.response.use(
  (response) => {
    //关闭加载窗口
    loading.close();

    const res = response.data;
    if (res.code !== 2000) {
      Message({
        message: res.message,
        type: "warning",
        duration: 5 * 1000,
      });
    }
    return response;
  },
  (error) => {
    loading.close();
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default request; //导出自定义创建的 axios 对象
