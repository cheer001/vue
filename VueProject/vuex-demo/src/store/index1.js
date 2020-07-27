import Vue from "vue";
import Vuex from "vuex";

//引用 Vuex插件
Vue.use(Vuex);

const store = new Vuex.Store({
  //存放状态(共享属性)
  state: {
    count: 1,
  },
  //改变state 状态值
  mutations: {
    //n  为载荷
    increment(state, n) {
      //   state.count++;
      state.count += n;
    },
    decrement(state) {
      state.count--;
    },
  },
  actions: {
    //触发mutations中的increment 来改变state
    add(context, n) {
      context.commit("increment", n);
    },
    decrement({ commit, state }) {
      console.log("actions", state.count);
      commit("decrement");
    },
  },
  getters: {
    desc(state) {
      if (state.count > 50 && state.count < 100) {
        return "吃饭";
      } else if (state.count > 100) {
        return "睡觉";
      } else {
        return "打豆豆";
      }
    },
  },
});

export default store;
