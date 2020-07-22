<template>
  <div>
    <!-- :inline="true" 行内表单 -->
    <el-form
      ref="searchForm"
      :inline="true"
      :model="searchMap"
      class="demo-form-inline"
      style="margin-top:20px"
    >
      <el-form-item>
        <el-input v-model="searchMap.cardNum" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchMap.name" placeholder="会员名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchMap.payType" placeholder="支付类型">
          <el-option
            v-for="option in payTypeOptions"
            :key="option.type"
            :label="option.name"
            :value="option.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <!-- value-format="yyyy-MM-dd"  : 指定绑定值的格式 -->
        <el-date-picker
          v-model="searchMap.birthday"
          type="date"
          placeholder="出生日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
      </el-form-item>
    </el-form>
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
    <!-- 分页组件 -->
    <el-pagination
      @size-change="fetchData"
      @current-change="fetchData"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
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
      list: [],
      total: 0, //总记录数
      currentPage: 1, //页码
      pageSize: 10, //每页显示10条数据
      searchMap: {}, //查询条件绑定的条件值
      payTypeOptions //将全局变量绑定到vue实例中
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      //调用分页查询数据
      memberApi
        .search(this.currentPage, this.pageSize, this.searchMap)
        .then(response => {
          const res = response.data;
          console.log(res);
          this.list = res.data.rows;
          this.total = res.data.total;
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
