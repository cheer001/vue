//Node导入
// var bar = require("./bar");
// bar();

//ES6  导入默认成员
// import bar from "./bar";
// bar();
// console.log(bar.name);
// console.log(bar);

//ES6  导入非默认成员
//通过解构赋值的方式来加载成员
// x对应的是bar.js中的x成员，y对应的是bar.js中的y成员
// import { x, y, add } from "./bar";
// console.log(x, y, add(10, 20));

//通过解构赋值  按需导入你需要的成员
import { x, y } from "./bar";
console.log(x, y);

//会将默认成员 与 非默认成员 全部导入
import * as bar2 from "./bar";
console.log(bar2, bar2.x, bar2.y, bar2.add(10, 20));
