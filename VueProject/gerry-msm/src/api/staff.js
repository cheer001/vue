import request from "@/utils/request";

export default {
  /**
   *查询员工列表
   *
   * @param {*} page 当前页码
   * @param {*} size 每页查询条数
   * @param {*} searchMap 搜索条件对象
   * @returns 员工列表
   */
  getStaffList(page, size, searchMap) {
    return request({
      url: `/staff/getStaffList/${page}/${size}`,
      method: "post",
      data: searchMap
    });
  },
  /**
   *添加员工
   *
   * @param {*} pojo 员工实体
   * @returns 添加成功后的验证信息
   */
  addStaff(pojo) {
    return request({
      url: "/staff/addStaff",
      method: "post",
      data: pojo
    });
  },

  /**
   *根据员工ID查询员工信息
   *
   * @param {*} id 员工ID
   * @returns 查询到的员工信息
   */
  getStaffById(id) {
    return request({
      url: `/staff/getStaffById/${id}`,
      method: "get"
    });
  },
  /**
   *更新员工
   *
   * @param {*} pojo 员工实体
   * @returns 更新成功后的验证信息
   */
  updateStaff(pojo) {
    return request({
      url: `/staff/updateStaff/${pojo.id}`,
      method: "put",
      data: pojo
    });
  },
  /**
   *删除员工
   *
   * @param {*} id 员工ID
   * @returns 删除成功后的验证信息
   */
  deleteStaff(id) {
    return request({
      url: `/staff/deleteStaff/${id}`,
      method: "delete"
    });
  }
};
