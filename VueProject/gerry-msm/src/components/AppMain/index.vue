<template>
  <div class="main">
    <!-- 
      注意link 不能使用,因为他是内置的标签
      修改成另一个名字就可以了,一般加上一个前缀
     -->
    <app-link v-show="$route.path !== '/home/'"></app-link>
    <router-view></router-view>
  </div>
</template>

<script>
import AppLink from "./Link.vue";
export default {
  data() {
    return {};
  },
  components: { AppLink }
};
</script>
