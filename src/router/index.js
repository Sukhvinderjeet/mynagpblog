import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: () => import("../views/Home"),
      children: [
        {
          path: "",
          name: "home",
          component: () => import("../views/HomeGlobal")
        },
        {
          path: "tag/:tag",
          name: "home-tag",
          component: () => import("../views/FilterWithTag")
        },
        {
          path: "favorited",
          name: "home-favorite",
          component: () => import("../views/FilterWithFavorited")
        }
      ]
    },
    {
      name: "login",
      path: "/login",
      component: () => import("../views/Login")
    },
    {
      name: "register",
      path: "/register",
      component: () => import("../views/Register")
    },
    {
      name: "article-edit",
      path: "/editor",
      props: true,
      component: () => import("../views/Article")
    },
    {
      name: "article-update",
      path: "/editor/:slug?",
      props: true,
      component: () => import("../views/UpdateArticle")
    }
  ]
});
