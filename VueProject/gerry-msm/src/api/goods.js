import request from "@/utils/request";

export default {
  /**
   *商品列表分页搜索方法
   *
   * @param {*} page 当前页码
   * @param {*} size 每页查询条数
   * @param {*} searchMap 条件查询的条件值
   * @returns 商品列表
   */
  getGoodsList(page, size, searchMap) {
    return request({
      url: `/goods/getGoodsList/${page}/${size}`,
      method: "post",
      data: searchMap
    });
  }
};
