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
    token: getToken(), //getToken() 作为token的初始值，解决刷新之后token为空的问题
    user: getUser(),
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      setToken(token);
    },
    SET_USER(state, user) {
      console.log("user--SET_USER", user);
      state.user = user;
      setUser(user);
    },
  },
  actions: {
    /**
     *登录获取token
     *
     * @param {*} { commit } 上下文中提交mutation的方法
     * @param {*} form 表单对象(载荷)
     * @returns Promise对象
     */
    Login({ commit }, form) {
      // resolve 触发成功处理
      return new Promise((resolve, reject) => {
        //login 函数返回的也是Promise对象
        login(form.username.trim(), form.password)
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
    /**
     *获取用户信息
     *
     * @param {*} { commit, state } 上下文中提交mutation的方法和状态对象
     * @returns Promise对象
     */
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token)
          .then((response) => {
            const resUser = response.data;
            commit("SET_USER", resUser.data);
            //将后台响应的用户信息传递到使用这个Promise,在任何地方使用这个Promise都可以在响应中拿到传递的数据
            resolve(resUser);
          })
          .catch((error) => {
            //使用这个Promise，如果出现异常就不用处理(空着)，这里已经把错误抛出去了
            reject(error);
          });
      });
    },
  },
};

export default user;
