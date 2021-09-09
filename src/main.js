// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)
Vue.use(Vuex)
import App from './App'
import router from './router'
import store from './store'
// import * as filters from "@/js/filters.js";
// console.log(filters);
// Object.keys(filters.default).forEach(key => {
//   Vue.filter(key, filters.default[key]); //插入过滤器名和对应方法
// });
// import smalltoBIG from "@/js/filters.js";
// console.log(smalltoBIG);
import filters from '@/js/filters.js'
console.log(filters)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]) //插入过滤器名和对应方法
})
import directives from './directives'
console.log(directives)
//阻止启动生产消息，常用作指令。
Vue.config.productionTip = false
directives.init(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // store, //使用store
  router,
  components: { App },
  template: '<App/>'
})
