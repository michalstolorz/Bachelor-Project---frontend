import Vue from "vue";
import App from "./App.vue";
import router from "./router/Router";
import vuetify from "./plugins/vuetify";
import VueResource from "vue-resource";
import moment from "moment";

Vue.use(VueResource);

Vue.http.interceptors.push((request, next) => {
  request.headers.set(
    "Authorization",
    "Bearer " + localStorage.getItem("token")
  );
  request.headers.set("Accept", "application/json");
  next();
});

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY hh:mm");
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
