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
  },
  /**
   *新增商品
   *
   * @param {*} pojo 商品实体
   * @returns 新增成功的验证信息
   */
  addGoods(pojo) {
    return request({
      url: "/goods/addGoods",
      method: "post",
      data: pojo
    });
  },
  /**
   *通过商品ID查询商品信息
   *
   * @param {*} id 商品ID
   * @returns 查询的商品信息
   */
  getGoodsById(id) {
    return request({
      url: `/goods/getGoodsById/${id}`,
      method: "get"
    });
  },
  /**
   *更新商品信息
   *
   * @param {*} pojo 商品实体
   * @returns 更新成功的验证信息
   */
  updateGoods(pojo) {
    return request({
      url: `/goods/updateGoods/${pojo.id}`,
      method: "put",
      data: pojo
    });
  },
  /**
   *根据商品ID删除商品
   *
   * @param {*} id 商品ID
   * @returns 删除成功的验证信息
   */
  deleteGoods(id) {
    return request({
      url: `/goods/deleteGoods/${id}`,
      method: "delete"
    });
  }
};
