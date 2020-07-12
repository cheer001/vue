<template>
  <div class="row placeholders">
    <div
      v-for="(hobby, index) in hobbies"
      :key="index"
      class="col-xs-6 col-sm-3 placeholder"
    >
      <img
        src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
        width="200"
        height="200"
        class="img-responsive"
        alt="Generic placeholder thumbnail"
      />
      <h4>{{ hobby }}</h4>
      <span class="text-muted">
        <a href="#" @click="deleteHobby(index)">删除</a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  //声明当前子组件接受父组件的属性
  props: ["hobbies"],
  methods: {
    //删除喜好
    deleteHobby(index) {
      //触发父组件中 delete_hobby 事件进行删除操作
      this.$emit("delete_hobby", index);
    },
  },
  template,
};
</script>

<style scoped lang="scss"></style>
