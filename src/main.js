import Vue from "vue";
import App from "./App.vue";
import router from "./router/Router";
import vuetify from "./plugins/vuetify";
import VueResource from "vue-resource";
import moment from "moment";
import Vuelidate from "vuelidate";

Vue.use(VueResource);
Vue.use(Vuelidate);

Vue.http.interceptors.push((request, next) => {
  request.headers.set(
    "Authorization",
    "Bearer " + localStorage.getItem("token")
  );
  request.headers.set("Accept", "application/json");
  next(function(response) {
    let path = "";
    console.log(response);
    switch (response.status) {
      case 403:
        path = "Forbidden";
        break;
      case 404:
        path = "NotFound";
        break;
    }
    router.push({ name: path }).catch(() => {});
    next();
  });
});

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("DD/MM/YYYY HH:mm");
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
