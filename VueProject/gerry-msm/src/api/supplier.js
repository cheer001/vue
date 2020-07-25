import request from "@/utils/request";

export default {
  //   getSupplierList() {
  //     return request({
  //       url: "/supplier/getSupplierList",
  //       method: "get"
  //     });
  //   },
  getSupplierList(page, size, searchMap) {
    return request({
      url: `/member/getSupplierList/${page}/${size}`,
      method: "post",
      data: searchMap
    });
  }
};
