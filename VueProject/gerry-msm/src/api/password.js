import request from "@/utils/request";

export default {
  /**
   *检查用户密码
   *
   * @param {*} userId 用户ID
   * @param {*} password 旧密码
   * @returns
   */
  checkPassword(userId, password) {
    return request({
      url: "/user/getPassword",
      method: "post",
      data: {
        userId,
        password
      }
    });
  },
  /**
   *修改用户密码
   *
   * @param {*} userId 用户ID
   * @param {*} password 新密码
   * @returns
   */
  changePassword(userId, password) {
    return request({
      url: "/user/changePassword",
      method: "put",
      data: {
        userId,
        password
      }
    });
  }
};
