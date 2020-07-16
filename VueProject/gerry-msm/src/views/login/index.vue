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
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        console.log(valid); //
        if (valid) {
          //提交表单给后台进行验证时候正确
          //   console.log(valid);
          login(this.form.username, this.form.password).then(respose => {
            console.log(respose.data);
            const res = respose.data;
            if (res.flag) {
              //验证成功,通过token去获取用户信息
              getUserInfo(res.data.token).then(response => {
                const resUser = response.data;
                if (resUser.flag) {
                  //获取到了用户的数据
                  console.log("userInfo", resUser.data);
                  //1.保存token ,用户信息
                  localStorage.setItem(
                    "gerry-msm-user",
                    JSON.stringify(resUser.data)
                  );
                  localStorage.setItem("gerry-msm-usertoken", res.data.token);
                  //前往首页
                  this.$router.push("/");
                } else {
                  this.$message({
                    message: resUser.message,
                    type: "warning"
                  });
                }
              });
            } else {
              // 未通过登录,弹出警告
              //   alert(res.message);
              this.$message({
                message: res.message,
                type: "warning"
              });
            }
          });
        } else {
          //
          console.log("验证失败");
          return false;
        }
      });
    }
  }
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
