<template>
  <div class="header">
    <a href="#/">
      <img class="logo" src="@/assets/logo.png" width="35px" />
      <span class="company">gerry会员管理系统</span>
    </a>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ user.name }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-edit" command="editPWD"
          >修改密码</el-dropdown-item
        >
        <el-dropdown-item icon="el-icon-circle-close" command="exit"
          >退出系统</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>

    <!-- 修改密码弹出框 -->
    <el-dialog title="更改密码" :visible.sync="dialogFormVisible" width="380px">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        style="width:280px;"
      >
        <el-form-item label="原密码" prop="oldPass">
          <el-input type="password" v-model="ruleForm.oldPass"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { logout } from "@/api/login";
import passwordApi from "@/api/password";
export default {
  data() {
    //在return上面声明自定义校验
    const validateOldPass = (rule, value, callback) => {
      passwordApi.checkPassword(this.user.id, value).then(response => {
        const res = response.data;
        if (res.flag) {
          //验证通过
          callback();
        } else {
          callback(new Error(res.message));
        }
      });
    };
    //校验新密码时候一致
    const validatePass = (rule, value, callback) => {
      //value 代表  checkPass   确认密码不等于新密码的情况下
      if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      token: localStorage.getItem("gerry-msm-token"),
      dialogFormVisible: false, //控制修改密码弹出框
      ruleForm: { oldPass: "", pass: "", checkPass: "" },
      rules: {
        oldPass: [
          { required: true, message: "原密码不能为空", trigger: "blur" },
          { validator: validateOldPass, trigger: "blur" }
        ],
        pass: [
          { required: true, message: "新密码密码不能为空", trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { validator: validatePass, trigger: "change" }
        ]
      },
      user: JSON.parse(localStorage.getItem("gerry-msm-user"))
    };
  },
  components: {},
  methods: {
    //处理首页右上角 下拉菜单
    handleCommand(command) {
      switch (command) {
        case "editPWD":
          //修改密码
          this.handleChangePwd();
          break;
        case "exit":
          this.handleLogout();
          break;
      }
    },
    //修改密码
    handleChangePwd() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["ruleForm"].resetFields();
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          passwordApi
            .changePassword(this.user.id, this.ruleForm.checkPass)
            .then(response => {
              const res = response.data;
              this.$message({
                message: res.message,
                type: res.flag ? "success" : "warning"
              });
              if (res.flag) {
                //修改密码成功 关闭弹出框  回到登录页面
                this.dialogFormVisible = false;
                this.handleLogout();
              }
            });
        } else {
          return false;
        }
      });
    },
    //退出系统
    handleLogout() {
      logout(this.token).then(response => {
        const res = response.data;
        if (res.flag) {
          //退出成功
          //清除本地数据
          localStorage.removeItem("gerry-msm-token");
          localStorage.removeItem("gerry-msm-user");
          //回到登录页面
          this.$router.push("/login");
        } else {
          this.$message({
            message: res.message,
            type: "warning",
            duration: 1000 //弹出停留时间
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.logo {
  vertical-align: middle;
  padding: 0px 10px 0px 40px;
}
.company {
  position: absolute;
  color: white;
}

/* 下拉菜单  */
.el-dropdown {
  float: right;
  margin-right: 40px;
}
.el-dropdown-link {
  color: white;
  cursor: pointer;
}
</style>
