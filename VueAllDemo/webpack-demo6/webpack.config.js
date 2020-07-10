//引入node中的path模块，处理文件路径 的小工具
const path = require("path");
//引入插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
//1.引入vue-loader插件
const VueLoaderPlugin = require("vue-loader/lib/plugin");

//导出一个webpack具有特殊属性配置的对象
module.exports = {
  mode: "none", //指定模式配置：development|production|none
  //入口
  entry: "./src/main.js", //入口模块文件路径
  //出口
  output: {
    // path: "./dist/", 错误的，要指定绝对路径
    path: path.join(__dirname, "./dist/"), //打包的结果文件生成的目录必须是绝对路径
    filename: "bundle.js",
  },
  //实时重新加载
  devServer: {
    contentBase: "./dist",
  },
  //配置插件
  plugins: [
    new HtmlWebpackPlugin({
      //指定要打包的模板页面
      //就会将index.html 打包到与 bundle.js 同级目录
      //同时在 index.html 中会自动的使用script标签引入bundle.js
      template: "./index.html",
    }),
    //3.请确保引入这个插件
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /.css$/, //正则表达式，匹配 .css文件资源
        use: [
          //根据外国人的习惯来的顺序
          "style-loader", //js识别css
          "css-loader", //css转换为js
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      //解决兼容性问题
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/, //排除的目录
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"], //babel中内置的转换规则工具
          },
        },
      },
      //2.处理.vue单文件组件
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  //解析完整版 vue.js
  // resolve: {
  //   alias: {
  //     vue$: "vue/dist/vue.js",
  //   },
  // },
};
