import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbvue/build/css/mdb.css";

import { CHECK_IS_User_AUTHORIZED } from "./common/constants";
import ServiceBase from "./servics/ServiceBase";
Vue.config.productionTip = false;
ServiceBase.Init();

router.beforeEach((to, from, next) =>
 
  Promise.all([store.dispatch(CHECK_IS_User_AUTHORIZED)]).then(next)
);
var filter = function(text, length, clamp) {
  clamp = clamp || "...";
  var node = document.createElement("div");
  node.innerHTML = text;
  var content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter("truncate", filter);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
