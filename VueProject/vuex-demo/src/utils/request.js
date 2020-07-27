import axios from "axios";

// axios.get("/db.json").then(response => {
//   const data = response.data;
//   console.log(data);
// });

const request = axios.create({
  //   baseURL: "/dev-api", //
  baseURL: "/", //
  timeout: 5000 //请求超时.5000毫秒
});

request.get("/db.json").then(response => {
  const data = response.data;
  console.log(data);
});

//请求拦截器
request.interceptors.request.use(
  config => {
    //请求的拦截
    return config;
  },
  error => {
    //出现异常的时候
    return Promise.reject(error);
  }
);
//响应拦截器
request.interceptors.response.use(
  response => {
    //   response.data
    return response;
  },
  error => {
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
