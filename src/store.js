import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);
const trans = {
  namespaced: true,
  state: {
    testData: ""
  },
  mutations: {
    saveState(state, payload) {
      state[payload.attr] = payload.value;
    }
  }
};
export default new Vuex.Store({
  modules: {
    trans: trans
  }
});
