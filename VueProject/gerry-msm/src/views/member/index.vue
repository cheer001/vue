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
      <el-form-item prop="cardNum">
        <el-input v-model="searchMap.cardNum" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="会员名称"></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select v-model="searchMap.payType" placeholder="支付类型">
          <el-option
            v-for="option in payTypeOptions"
            :key="option.type"
            :label="option.name"
            :value="option.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
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
          如果是新增操作id则为null,如果是更新操作id则会被查询出来的会员ID覆盖(就不为null),
          用于编辑会员信息的时候来标识当前属于哪种窗口
        -->
        <el-form-item label="会员ID" prop="id" v-show="false"> </el-form-item>
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input v-model="pojo.cardNum"></el-input>
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="pojo.name"></el-input>
        </el-form-item>
        <el-form-item label="会员生日" prop="birthday">
          <el-date-picker
            v-model="pojo.birthday"
            type="date"
            placeholder="请点击选择"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="pojo.phone"></el-input>
        </el-form-item>
        <el-form-item label="开卡金额" prop="money">
          <el-input v-model="pojo.money"></el-input>
        </el-form-item>
        <el-form-item label="可用积分" prop="integral">
          <el-input v-model="pojo.integral"></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="payType">
          <el-select v-model="pojo.payType" placeholder="请点击选择">
            <el-option
              v-for="option in payTypeOptions"
              :key="option.type"
              :label="option.name"
              :value="option.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址" prop="address">
          <el-input
            v-model="pojo.address"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入地址"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            pojo.id === null ? addMember('pojoForm') : updateMember('pojoForm')
          "
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
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
      list: [], //会员列表
      total: 0, //总记录数
      currentPage: 1, //页码
      pageSize: 10, //每页显示10条数据
      searchMap: {
        cardNum: "",
        name: "",
        payType: "",
        birthday: ""
      }, //查询条件绑定的条件值
      payTypeOptions, //支付类型   将全局变量绑定到vue实例中
      pojo: {
        id: null,
        cardNum: "",
        name: "",
        birthday: "",
        phone: "",
        money: 0,
        integral: 0,
        payType: "",
        address: ""
      }, //会员实体
      dialogFormVisible: false, //控制新增对话框
      rules: {
        cardNum: [
          { required: true, message: "会员卡号不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "会员姓名不能为空", trigger: "blur" }
        ],
        payType: [
          { required: true, message: "请选择支付类型", trigger: "blur" }
        ]
      } //表单数据校验
    };
  },
  //获取到data中的数据后，模板渲染前 ，进行抓取数据
  created() {
    this.fetchData();
  },
  methods: {
    //抓取数据
    fetchData() {
      //调用分页查询数据
      memberApi
        .getMemberList(this.currentPage, this.pageSize, this.searchMap)
        .then(response => {
          const res = response.data;
          console.log(res);
          this.list = res.data.rows;
          this.total = res.data.total;
        });
    },
    //重置行内表单
    resetForm(formName) {
      console.log("重置", formName);
      this.$refs[formName].resetFields();
    },
    //当每页显示条数改变后，被触发，val是最新的每页显示条数
    handleSizeChange(val) {
      console.log("pageSize", val);
      this.pageSize = val;
      this.fetchData();
    },
    //当页码改变后，被触发，val是最新的页码
    handleCurrentChange(val) {
      console.log("currentPage", val);
      this.currentPage = val;
      this.fetchData();
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
    //新增会员数据
    addMember(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //验证通过，提交添加
          memberApi.addMember(this.pojo).then(response => {
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
          //验证不通过
          return false;
        }
      });
    },
    //根据Id编辑会员
    handleEdit(id) {
      console.log("编辑", id);
      this.handleAddMember();
      memberApi.getMemberById(id).then(response => {
        const res = response.data;
        if (res.flag) {
          this.pojo = res.data;
        }
      });
    },
    //更新会员数据
    updateMember(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //提交更新
          memberApi.updateMember(this.pojo).then(response => {
            const res = response.data;
            this.$message({
              message: res.message,
              type: res.flag ? "success" : "warning"
            });
            if (res.flag) {
              //更新成功，刷新列表数据
              this.fetchData();
              this.dialogFormVisible = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    //根据Id删除会员
    handleDelete(id) {
      console.log("删除", id);
      this.$confirm("是否删除该会员信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //确认
          memberApi.deleteMember(id).then(response => {
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
