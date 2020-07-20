<template>
  <div class="header">
    <a href="#/">
      <img class="logo" src="@/assets/logo.png" width="35px" />
      <span class="company">gerry会员管理系统</span>
    </a>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
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
  </div>
</template>

<script>
import { logout } from "@/api/login";
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    handleCommand(command) {
      console.log(`点击了${command}`);
      const token = localStorage.getItem("gerry-msm-usertoken");
      switch (command) {
        case "editPWD":
          //修改密码
          this.$message("点击修改密码");
          break;
        case "exit":
          //退出系统
          logout(token).then(response => {
            const res = response.data;
            if (res.flag) {
              //退出成功
              //清除本地数据
              localStorage.removeItem("gerry-msm-usertoken");
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
          break;

        default:
          break;
      }
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
