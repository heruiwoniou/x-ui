import Vue from "vue";
import App from "./App.vue";

import xui from "../packages";

Vue.use(xui);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
