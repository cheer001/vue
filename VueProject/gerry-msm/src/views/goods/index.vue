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
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="searchMap.code" placeholder="商品编号"></el-input>
      </el-form-item>
      <el-form-item prop="supplierName">
        <!-- el-input  是组件，要在组件元素监听原生事件，需要使用v-on:原生事件名.native="处理函数" -->
        <el-input
          v-model="searchMap.supplierName"
          placeholder="选择供应商"
          readonly="readonly"
          @click.native="dialogSupplierVisible = true"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData">
          查询
        </el-button>
        <el-button
          icon="el-icon-remove-outline"
          @click="resetForm('searchForm')"
        >
          重置
        </el-button>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="handleAddGoods"
        >
          新增
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 数据列表
        :data  绑定渲染的数据
        border 表格边框
     -->
    <el-table :data="list" height="380" border style="width: 100%">
      <!-- type="index" 获取索引值,从1开始,label显示标题 -->
      <el-table-column type="index" label="序号" align="center">
      </el-table-column>
      <el-table-column prop="name" label="商品名称" align="center">
      </el-table-column>
      <el-table-column prop="code" label="商品编码" align="center">
      </el-table-column>
      <el-table-column prop="spec" label="商品规格" align="center">
      </el-table-column>
      <el-table-column prop="retailPrice" label="零售价" align="center">
      </el-table-column>
      <el-table-column prop="purchasePrice" label="进货价" align="center">
      </el-table-column>
      <el-table-column prop="storageNum" label="库存数量" align="center">
      </el-table-column>
      <el-table-column prop="supplierName" label="供应商" align="center">
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
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 选择商品对话框 -->
    <el-dialog
      title="选择供应商"
      :visible.sync="dialogSupplierVisible"
      width="500px"
    >
      <supplier
        @option-supplier="optionSupplier"
        :isDialog="isDialog"
      ></supplier>
    </el-dialog>
  </div>
</template>

<script>
import goodsApi from "@/api/goods";
import Supplier from "@/views/supplier";
export default {
  //注册 Supplier 作为子组件
  components: {
    Supplier
  },
  data() {
    return {
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      searchMap: {
        name: "",
        code: "",
        supplierId: "",
        supplierName: ""
      },
      dialogSupplierVisible: false, //控制供应商对话框
      isDialog: true
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    optionSupplier(currentRow) {
      this.searchMap.supplierName = currentRow.name;
      this.searchMap.supplierId = currentRow.id;
      this.dialogSupplierVisible = false;
    },
    //新增商品数据
    handleAddGoods() {},
    //重置行内表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //当每页显示条数改变后，被触发，val是最新的每页显示条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    //当页码改变后，被触发，val是最新的页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    //抓取数据
    fetchData() {
      goodsApi
        .getGoodsList(this.currentPage, this.pageSize, this.searchMap)
        .then(response => {
          const res = response.data;
          if (res.flag) {
            this.total = res.data.total;
            this.list = res.data.rows;
          }
        });
    }
  }
};
</script>

<style scoped lang="scss"></style>
