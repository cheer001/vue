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
      <el-form-item prop="username">
        <el-input v-model="searchMap.username" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="姓名"></el-input>
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
          @click="handleAddStaff"
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
      <el-table-column prop="username" label="账号" align="center">
      </el-table-column>
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="age" label="年龄" align="center">
      </el-table-column>
      <el-table-column prop="mobile" label="电话" width="120" align="center">
      </el-table-column>
      <el-table-column prop="salary" label="薪酬" align="center">
      </el-table-column>
      <el-table-column prop="entryDate" label="入职时间" align="center">
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
          如果是新增操作id则为null,如果是更新操作id则会被查询出来的员工ID覆盖(就不为null),
          用于编辑员工信息的时候来标识当前属于哪种窗口
        -->
        <el-form-item label="员工ID" prop="id" v-show="false"> </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="pojo.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="pojo.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input type="number" v-model="pojo.age"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="pojo.mobile"></el-input>
        </el-form-item>
        <el-form-item label="薪酬" prop="salary">
          <el-input v-model="pojo.salary"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="entryDate">
          <el-date-picker
            v-model="pojo.entryDate"
            type="date"
            placeholder="请点击选择"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            pojo.id === null ? addStaff('pojoForm') : updateStaff('pojoForm')
          "
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import staffApi from "@/api/staff";
export default {
  data() {
    return {
      list: [], //员工列表
      pageSize: 10,
      currentPage: 1,
      total: 0,
      searchMap: {
        username: "",
        name: ""
      }, //查询员工的条件对象
      pojo: {
        id: null,
        username: "",
        name: "",
        age: 18,
        mobile: "",
        salary: 0,
        entryDate: ""
      }, //员工实体
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }]
      }, //表单校验
      dialogFormVisible: false //控制编辑框显示
    };
  },
  //在data数据获取到后，模板渲染前  ， 进行抓取数据
  created() {
    this.fetchData();
  },
  methods: {
    //抓取数据
    fetchData() {
      staffApi
        .getStaffList(this.currentPage, this.pageSize, this.searchMap)
        .then(response => {
          const res = response.data;
          if (res.flag) {
            this.total = res.data.total;
            this.list = res.data.rows;
          } else {
            this.$message({
              message: res.message,
              type: "warning"
            });
          }
        });
    },
    //当前页面的显示条数改变后被触发
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    //当前页面的页码改变后被触发
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //处理新增员工窗口
    handleAddStaff() {
      this.dialogFormVisible = true;
      //异步更新Dom
      this.$nextTick(() => {
        this.$refs["pojoForm"].resetFields();
      });
    },
    //新增员工
    addStaff(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          staffApi.addStaff(this.pojo).then(response => {
            const res = response.data;
            this.$message({
              message: res.flag ? "添加成功，初始密码为:123456" : res.message,
              type: res.flag ? "success" : "warning"
            });
            if (res.flag) {
              //添加成功 属性列表数据
              this.fetchData();
              this.dialogFormVisible = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    //根据id回显员工信息
    handleEdit(id) {
      this.handleAddStaff();
      staffApi.getStaffById(id).then(response => {
        const res = response.data;
        if (res) {
          this.pojo = res.data;
        } else {
          this.$message({
            message: res.message,
            type: "warning"
          });
        }
      });
    },
    //更新员工信息
    updateStaff(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          staffApi.updateStaff(this.pojo).then(response => {
            const res = response.data;
            this.$message({
              message: res.message,
              type: res.flag ? "success" : "warning"
            });
            if (res.flag) {
              //更新成功 属性列表数据
              this.fetchData();
              this.dialogFormVisible = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    //根据id删除员工
    handleDelete(id) {
      console.log("handleDelete", id);
      this.$confirm("是否删除该员工?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //确认
          staffApi.deleteStaff(id).then(response => {
            const res = response.data;
            this.$message({
              type: res.flag ? "success" : "wraning",
              message: res.message
            });
            if (res.flag) {
              //删除成功，刷新列表数据

              this.fetchData();
            }
          });
        })
        .catch(() => {
          //取消
        });
    }
  }
};
</script>

<style scoped lang="scss"></style>
