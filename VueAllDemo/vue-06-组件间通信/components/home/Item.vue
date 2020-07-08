<template>
  <tr>
    <td>{{ emp.id }}</td>
    <td>{{ emp.name }}</td>
    <td>{{ emp.salary }}</td>
    <td>
      <a href="#" @click="deleteItem">删除</a>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    //指定属性名/数据类型/时候必须
    emp: {
      type: Object,
      required: true,
    },
    deleteEmp: Function,
    index: Number,
  },
  methods: {
    deleteItem() {
      if (window.confirm(`确定删除${this.emp.name}的记录吗?`)) {
        //移除索引为index的一条记录，
        //注意：不要少了this
        this.deleteEmp(this.index);
      }
    },
  },
  template,
};
</script>

<style scoped lang="scss"></style>
