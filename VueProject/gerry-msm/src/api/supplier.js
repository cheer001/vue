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
  },
  /**
   *通过供应商ID查询供应商信息
   *
   * @param {*} id 供应商ID
   * @returns 查询的供应商信息
   */
  getSupplierById(id) {
    return request({
      url: `/supplier/getSupplierById/${id}`,
      method: "get"
    });
  },
  /**
   *更新供应商信息
   *
   * @param {*} pojo 供应商实体
   * @returns 更新成功的验证信息
   */
  updateSupplier(pojo) {
    return request({
      url: `/supplier/updateSupplier/${pojo.id}`,
      method: "put",
      data: pojo
    });
  },
  /**
   *根据汇演ID删除会员
   *
   * @param {*} id 会员ID
   * @returns 删除成功的验证信息
   */
  deleteSupplier(id) {
    return request({
      url: `/supplier/deleteSupplier/${id}`,
      method: "delete"
    });
  }
};
