import {
  getToken,
  setToken,
  setUser,
  getUser,
  removeToken,
} from "@/utils/auth";
import { login, getUserInfo, logout } from "../../api/login";

const user = {
  state: {
    token: getToken(),//getToken() 作为token的初始值，解决刷新之后token为空的问题
    user: null,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      setToken(token);
    },
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    Login({ commit }, form) {
      // resolve 触发成功处理
      return new Promise((resolve, reject) => {
        //login 函数返回的也是Promise对象
        login(form.user, form.password)
          .then((response) => {
            const res = response.data; //拿到响应的数据
            if (res.flag) {
              commit("SET_TOKEN", res.data.token);
              //通过组件已经将token更新成功
              resolve(res);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};

export default user;
