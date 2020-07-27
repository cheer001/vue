//存放状态(共享属性)
const state = {
  count: 1,
};

const getters = {
  desc(state) {
    if (state.count > 50 && state.count < 100) {
      return "吃饭";
    } else if (state.count > 100) {
      return "睡觉";
    } else {
      return "打豆豆";
    }
  },
};

const mutations = {
  //n  为载荷
  increment(state, n) {
    //   state.count++;
    state.count += n;
  },
  decrement(state) {
    state.count--;
  },
};

const actions = {
  //触发mutations中的increment 来改变state
  add(context, n) {
    context.commit("increment", n);
  },
  decrement({ commit, state }) {
    console.log("actions", state.count);
    commit("decrement");
  },
};

export default{
    state,
    getters,
    mutations,
    actions
}