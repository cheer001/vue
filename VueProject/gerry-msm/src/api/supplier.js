import request from "@/utils/request";

export default {
  /**
   *获取供应商列表数据
   *
   * @returns 供应商列表
   */
  //   getSupplierList() {
  //     return request({
  //       url: "/supplier/getSupplierList",
  //       method: "get"
  //     });
  //   },
  /**
   *供应商列表分页搜索方法
   *
   * @param {*} page 当前页码
   * @param {*} size 每页查询条数
   * @param {*} searchMap 条件查询的条件值
   * @returns 供应商列表
   */
  getSupplierList(page, size, searchMap) {
    return request({
      url: `/supplier/getSupplierList/${page}/${size}`,
      method: "post",
      data: searchMap
    });
  },
  /**
   *新增供应商
   *
   * @param {*} pojo 供应商实体
   * @returns 新增成功的验证信息
   */
  addSupplier(pojo) {
    return request({
      url: "/supplier/addSupplier",
      method: "post",
      data: pojo
    });
  }
};
