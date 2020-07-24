import request from "@/utils/request";

export default {
  /**
   *获取会员列表数据
   *
   * @returns 会员列表
   */
  getList() {
    return request({
      url: "/member/getMemberList",
      method: "get"
    });
  },

  /**
   *分页搜索方法
   *
   * @param {*} page 当前页码
   * @param {*} size 每页查询条数
   * @param {*} searchMap 条件查询的条件值
   * @returns 会员列表
   */
  getMemberList(page, size, searchMap) {
    return request({
      url: `/member/getMemberList/${page}/${size}`,
      method: "post",
      data: searchMap
    });
  },
  /**
   *新增会员
   *
   * @param {*} pojo 会员实体
   * @returns 新增成功的验证信息
   */
  addMember(pojo) {
    return request({
      url: "/member/addMember",
      method: "post",
      data: pojo
    });
  },
  /**
   *通过会员ID查询会员信息
   *
   * @param {*} id 会员ID
   * @returns 查询的会员信息
   */
  getMemberById(id) {
    return request({
      url: `/member/getMemberById/${id}`,
      method: "get"
    });
  },
  /**
   *更新会员信息
   *
   * @param {*} pojo 会员实体
   * @returns 更新成功的验证信息
   */
  updateMember(pojo) {
    return request({
      url: `/member/updateMember/${pojo.id}`,
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
  deleteMember(id) {
    return request({
      url: `/member/deleteMember/${id}`,
      method: "delete"
    });
  }
};
