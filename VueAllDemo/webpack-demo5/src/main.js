// 将样式文件css以模块化形式引入
import "./css/style.css";

const a = 1;

const arr = [1, 2, 3];
arr.forEach((item) => {
  console.log(item);
});

//以上代码转换为ES5代码后
// var a = 1;
// var arr = [1, 2, 3];
// arr.forEach(function (item) {
//   console.log(item);
// });
