<template>
  <div class="login-container">
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-width="80px"
      class="login-form"
    >
      <h2 class="login-title">gerry会员管理系统</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login, getUserInfo } from "@/api/login";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      }, //表单数据
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      }, //表单数据验证
    };
  },
  methods: {
    //提交表单信息 进行用户登录
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid); //
        //提交表单给后台进行验证是否正确
        if (valid) {
          this.$store
            .dispatch("Login", this.form)
            .then((response) => {
              //response 是 后台响应回来的数据对象
              if (response.flag) {
                this.$router.push("/");
              } else {
                this.$message({
                  message: response.message,
                  type: "warning",
                });
              }
            })
            .catch((error) => {});
        } else {
          //
          console.log("验证失败");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.login-form {
  width: 350px;
  /* 上下间隙 160px,左右自动居中 */
  margin: 160px auto;
  background-color: rgb(255, 255, 255, 0.8);
  padding: 28px;
  border-radius: 20px;
}
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/login.jpg");
}
.login-title {
  color: #303133;
  text-align: center;
}
</style>
