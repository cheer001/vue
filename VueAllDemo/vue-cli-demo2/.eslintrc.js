module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint", //用来 指定eslint 解析器
  },
  rules: {
    // 配置检查规则
    semi: [2, "always"], //总是需要分号
  },
};
