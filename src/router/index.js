import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "../components/HelloWorld";
import leftMove from "../components/leftMove";
import test from "../components/test";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "leftMove",
      component: leftMove
    },
    {
      path: "/HelloWorld",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/test",
      name: "test",
      component: test
    },
    {
      path: "/swiper",
      name: "swiper",
      component: ()=> import  ("../components/swiper")
    },
  ]
});
