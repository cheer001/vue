<template>
  <div>
    <!-- 数据列表
        :data  绑定渲染的数据
        border 表格边框
     -->
    <el-table :data="list" height="380" border style="width: 100%">
      <!-- type="index" 获取索引值,从1开始,label显示标题 -->
      <el-table-column type="index" label="序号" width="50" align="center">
      </el-table-column>
      <el-table-column
        prop="cardNum"
        label="会员卡号"
        width="170"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="name" label="会员姓名" align="center">
      </el-table-column>
      <el-table-column prop="birthday" label="会员生日" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="手机号码" width="120" align="center">
      </el-table-column>
      <el-table-column prop="integral" label="可用积分" align="center">
      </el-table-column>
      <el-table-column prop="money" label="开卡金额" align="center">
      </el-table-column>
      <el-table-column prop="payType" label="支付类型" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.payType | payTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址" align="center">
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import memberApi from "@/api/member";

//字符类型
const payTypeOptions = [
  { type: "1", name: "现金" },
  { type: "2", name: "微信" },
  { type: "3", name: "支付宝" },
  { type: "4", name: "银行卡" }
];
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      memberApi.getList().then(response => {
        const res = response.data;
        console.log(res);
        this.list = res.data;
      });
    },
    handleEdit(id) {
      console.log("编辑", id);
    },
    handleDelete(id) {
      console.log("删除", id);
    }
  },
  filters: {
    //在过滤器中 不能引用当前实例 this,所以payTypeOptions要定义在全局中
    payTypeFilter(type) {
      const payObj = payTypeOptions.find(obj => obj.type == type);
      return payObj ? payObj.name : null;
    }
  }
};
</script>

<style scoped lang="scss"></style>
