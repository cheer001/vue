/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
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

console.log(_bar__WEBPACK_IMPORTED_MODULE_0__["x"], _bar__WEBPACK_IMPORTED_MODULE_0__["y"]);

//会将默认成员 与 非默认成员 全部导入

console.log(_bar__WEBPACK_IMPORTED_MODULE_0__, _bar__WEBPACK_IMPORTED_MODULE_0__["x"], _bar__WEBPACK_IMPORTED_MODULE_0__["y"], _bar__WEBPACK_IMPORTED_MODULE_0__["add"](10, 20));


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return x; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return y; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
// module.exports = function () {
//   console.log("我是bar 文件");
// };

//ES6 注意 一个模块文件中，只能导出一个默认成员
// export default function () {
//   console.log("我是bar 文件--ES6");
// }

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "gerry",
});
// export default "hello";

//导出非默认成员
//Node 导出非默认成员
// exports.x ="xxxx"
// exports.y ="yyyy"

//ES6  可以导出多个非默认成员
const x = "xxx";
const y = "yyy";

function add(a, b) {
  return a + b;
}

// export z = "zzz";  错误的，没有数据类型
// export function(x,y){ 错误的，没有函数名
//     return x+y;
// }


/***/ })
/******/ ]);