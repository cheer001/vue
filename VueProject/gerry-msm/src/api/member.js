import request from "@/utils/request";

export default {
  /**
   *获取会员列表数据
   *
   * @returns 会员列表
   */
  getList() {
    return request({
      url: "/member/list",
      method: "get"
    });
  },

  /**
   *分页搜索方法
   *
   * @param {*} page 当前页码
   * @param {*} size 每页查询条数
   * @param {*} searchMap 条件查询的条件值
   */
  search(page, size, searchMap) {
    return request({
      url: `/member/list/search/${page}/${size}`,
      method: "post",
      data: searchMap
    });
  }
};
