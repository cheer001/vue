<template>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>姓名</th>
          <th>工资</th>
        </tr>
      </thead>
      <tbody>
        <Item
          v-for="(emp, index) in empList"
          :key="emp.id"
          :emp="emp"
          :deleteEmp="deleteEmp"
          :index="index"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  //声明组件接受父组件传递的属性
  props: {
    empList: Array,
    deleteEmp: Function, //逐层传递
  },
  template,
  components: {
    Item,
  },
};
</script>

<style scoped lang="scss"></style>
