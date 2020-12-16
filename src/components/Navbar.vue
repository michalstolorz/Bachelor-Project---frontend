<template>
  <nav>
    <v-app-bar text app color="primary" dark>
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="white--text"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Computer</span>
        <span>Service</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn v-if="isLogged === 'true'" v-on:click="logout">
        {{ "Logout " + email }}
      </v-btn>

      <!--<PopupLogin />

      <v-btn light>
        <router-link to="/login">
          {{ loginRoute.routeName }}
        </router-link>
      </v-btn>-->
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" class="primary">
      <v-list>
        <v-list-item
          v-for="route in routes"
          :key="route.text"
          route
          :to="route.route"
        >
          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              route.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
//import PopupLogin from "./PopupLogin.vue";

export default {
  components: {
    //PopupLogin,
  },
  computed: {
    isLogged() {
      return this.isLoggedValue
    }
  },
  methods: {
    logout: function () {
      this.$http
        .post("https://localhost:44308/api/Authentication/logout")
        .then(function () {
          localStorage.setItem("token", "");
          localStorage.setItem("isLogged", false);
          console.log("wylogowany");
          this.$router.push({ name: "Login" });
          location.reload();
        });
    },
  },
  data() {
    return {
      email: localStorage.getItem("email"),
      isLoggedValue: localStorage.getItem("isLogged"),
      drawer: false,
      routes: [
        { text: "Repairs", route: "/repairs" },
        { text: "Repair types", route: "/repairTypes" },
        { text: "Add new repair", route: "/addRepair" },
        { text: "Login", route: "/login" },
        { text: "Register Employee", route: "/registerEmployee" },
        { text: "Register Customer", route: "/registerCustomer" },
        { text: "Customer Repairs", route: "/customerRepairs" },
      ],
      loginRoute: {
        routeName: "Login",
        route: "/login",
      },
    };
  }
};
</script>