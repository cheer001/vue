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
        <el-input v-model="searchMap.name" placeholder="供应商名称"></el-input>
      </el-form-item>
      <el-form-item prop="linkman">
        <el-input v-model="searchMap.linkman" placeholder="联系人"></el-input>
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input v-model="searchMap.mobile" placeholder="联系电话"></el-input>
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
          @click="handleAddMember"
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
      <el-table-column type="index" label="序号" width="50" align="center">
      </el-table-column>
      <el-table-column
        prop="name"
        label="供应商名称"
        width="170"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="linkman" label="联系人" align="center">
      </el-table-column>
      <el-table-column prop="mobile" label="联系电话" align="center">
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="120" align="center">
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

    <!-- 对话框表单 -->
    <el-dialog title="会员编辑" :visible.sync="dialogFormVisible" width="500">
      <!-- status-icon  当表单效验不通过时，输入框右侧有个x小图标 -->
      <el-form
        status-icon
        ref="pojoForm"
        :model="pojo"
        :rules="rules"
        label-width="100px"
        label-position="right"
        style="width:400px"
      >
        <!-- 
          添加一个隐藏的id值,每次打开编辑窗口会先被清空,
          如果是新增操作id则为null,如果是更新操作id则会被查询出来的供应商ID覆盖(就不为null),
          用于编辑供应商信息的时候来标识当前属于哪种窗口
        -->
        <el-form-item label="供应商ID" prop="id" v-show="false"> </el-form-item>
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="pojo.name"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="linkman">
          <el-input v-model="pojo.linkman"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile">
          <el-input v-model="pojo.mobile"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="pojo.remark"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            pojo.id === null
              ? addSupplier('pojoForm')
              : updateSupplier('pojoForm')
          "
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import supplierApi from "@/api/supplier";
export default {
  data() {
    return {
      list: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      searchMap: {
        name: "",
        linkman: "",
        mobile: ""
      }, //条件查询的绑定字段值
      dialogFormVisible: false, //控制编辑框显示
      pojo: {
        id: null,
        name: "",
        linkman: "",
        mobile: "",
        remark: ""
      }, //供应商实体
      rules: {
        name: [{ required: true, message: "供应商不能为空", trigger: "blur" }],
        linkman: [
          { required: true, message: "联系人不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    //更新供应商
    updateSupplier(formName) {
      console.log(formName);
    },
    //添加供应商
    addSupplier(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //提交表单
          supplierApi.addSupplier(this.pojo).then(response => {
            const res = response.data;
            this.$message({
              message: res.message,
              type: res.flag ? "success" : "warning"
            });
            if (res.flag) {
              //新增成功，刷新列表数据
              this.fetchData();
              this.dialogFormVisible = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    //弹出新增窗口
    handleAddMember() {
      this.dialogFormVisible = true;
      /*
        this.$nextTick() 是一个异步事件，当Dom全部渲染结束之后，它的回调函数才会被执行
         弹出窗口打开之后，需要加载Dom，就需要花费一点时间，我们就应该等待它加载完dom之后，
         再进行调用resetFields，重置表单和清除样式，如果在不使用$nextTick的情况下，
         使用表单中的方法就会报错，因为在dom渲染过程中这些方法还没有定义出来
      */
      this.$nextTick(() => {
        this.$refs["pojoForm"].resetFields();
      });
    },
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
      supplierApi
        .getSupplierList(this.currentPage, this.pageSize, this.searchMap)
        .then(response => {
          const res = response.data;
          if (res.flag) {
            this.total = res.data.total;
            this.list = res.data.rows;
          }
        });
    },
    //根据Id编辑供应商
    handleEdit(id) {
      console.log("编辑", id);
    },
    //根据Id删除供应商
    handleDelete(id) {
      console.log("删除", id);
    }
  }
};
</script>

<style scoped lang="scss"></style>
