<template>
  <div>
    会员管理
  </div>
</template>

<script>
import memberApi from "@/api/member";
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      memberApi.getList().then(response => {
        const res = response.data;
        console.log(res);
        this.list = res.data;
      });
    }
  },
  components: {}
};
</script>

<style scoped lang="scss"></style>
