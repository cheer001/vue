<template>
  <div>
    <h2 v-if="user">欢迎您!---{{ user.name }}</h2>
  </div>
</template>

<script>
export default {
  mounted() {
    if (localStorage.getItem("gerry-msm-user")) {
      this.user = JSON.parse(localStorage.getItem("gerry-msm-user"));
    }
  },
  data() {
    return {
      user: undefined
    };
  }
};
</script>

<style scoped lang="scss"></style>
