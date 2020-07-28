import request from "@/utils/request";

/**
 *
 *
 * @export 用户登录
 * @param {*} username 用户名
 * @param {*} password 密码
 * @returns 用户token信息
 */
export function login(username, password) {
  //返回一个Promise对象,该Promise对象时axios实现的
  return request({
    url: "/user/login",
    method: "post",
    data: {
      username,
      password
    }
  });
}

/**
 *
 *
 * @export 获取用户信息
 * @param {*} token 用户token信息
 * @returns 用户信息
 */
export function getUserInfo(token) {
  return request({
    url: `/user/info/${token}`,
    method: "get"
  });
}

/**
 *
 *
 * @export 退出登录
 * @param {*} token 用户token信息
 * @returns 退出成功的验证信息
 */
export function logout(token) {
  return request({
    url: `/user/logout`,
    method: "post",
    data: {
      token
    }
  });
}
