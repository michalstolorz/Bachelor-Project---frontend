import Vue from "vue";
import App from "./App.vue";
import router from "./router/Router";
import vuetify from "./plugins/vuetify";
import VueResource from "vue-resource";

Vue.use(VueResource);

Vue.http.interceptors.push((request, next) => {
  request.headers.set(
    "Authorization",
    "Bearer " + localStorage.getItem("token")
  );
  request.headers.set("Accept", "application/json");
  next();
});

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
