import request from "@/utils/request";

const BASE_URL= "/dev-api";
// request.get("/db.json").then(response => {
//   console.log(response.data);
// });

//测试2, 以对象配置的方式进行指定请求方式
request({
  method: "get",
  url: BASE_URL+"/db.json"
}).then(response => {
  console.log("get2", response.data);
});

export default {
  getList() {
    const req = request({
      method: "get",
      url: BASE_URL+"/db.json"
    });
    console.log(req); //Promise.then()

    return req;
  }
};
