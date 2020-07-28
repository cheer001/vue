const TOKEN_KEY = "gerry-msm-token";
const USER_KEY = "gerry-msm-user";

/**
 *获取用户token
 *
 * @export
 * @returns 本地缓冲中的token信息
 */
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
/**
 *保存用户token
 *
 * @export
 * @param {*} token token信息
 * @returns 保存token信息到本地缓存
 */
export function setToken(token) {
  return localStorage.setItem(TOKEN_KEY, token);
}
/**
 *获取用户信息
 *
 * @export
 * @returns 本地缓冲中的用户信息
 */
export function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}
/**
 *保存用户信息
 *
 * @export
 * @param {*} user 用户信息对象
 */
export function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}
/**
 *移除用户Token和用户信息
 *
 * @export
 */
export function removeToken(){
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}
