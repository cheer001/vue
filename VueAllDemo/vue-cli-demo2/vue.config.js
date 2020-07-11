// vue.config.js
module.exports = {
  // 选项...
  //   publicPath:"demo2",
  devServer: {
    port: 8001, //端口号,如果端口号被占用，会自动提升1
    host: "localhost", //主机名，127.0.0.1  真机 0.0.0.0
    https: false, //协议
    open: true, //启动服务时自动打开浏览器访问
  },
  lintOnSave: true, //关闭格式检查
  outputDir: "dist2", //打包之后所在目录
  assetsDir: "assets", //静态资源打包之后 存放路径，（相对于outputDir指定的路径），默认值“”
  indexPath: "out/index.html", //index.html 主页面打包之后存放的目录(相对于outputDir指定的路径)
  productionSourceMap: false, //打包时不会 生成 .map 文件，加快打包速度
  //   filenameHashing: false,//打包时静态文件不会生成hash值
};
