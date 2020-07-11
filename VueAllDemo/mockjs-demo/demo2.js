const Mock = require("mockjs");
const data = Mock.mock({
  //定义数据生成规则
  "empList|6-8": [
    {
      "id|+1": 1,
      name: "@cname",//"@string",
      price: "@float",
      status: "@boolean",
      birthday: "@date('yyyy/MM/dd')",
      createDate:"@datetime('yyyy/MM/dd hh:mm:ss')",
      pic:"@image('200x200','#ff6600','hello')",
      title:"@title",
      ctitle:"@ctitle",
      content:"@csentence(100,500)",
      first:"@cfirst",
      last:"@clast",
      url:"@url('https','gerry.com')",
      domain:"@domain",
      ip:"@ip",
      area:"@region",
      address:"@county(true)",
      zipCode:"@zip",
      "phone|11":"@integer(1,9)"
    },
  ],
});
console.log(JSON.stringify(data, null, 2));
