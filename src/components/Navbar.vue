<template>
  <nav>
    <v-app-bar text app color="primary" dark>
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="white--text"
        v-show="isLogged === 'true'"
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
      return this.isLoggedValue;
    },
  },
  methods: {
    logout: function () {
      this.$http
        .post("https://localhost:44308/api/Authentication/logout")
        .then(function () {
          localStorage.setItem("token", "");
          localStorage.setItem("isLogged", false);
          this.$router.push({ name: "Login" });
          location.reload();
        });
    },
    navigationDrawerContent: function () {
      switch (this.userRole) {
        case "Admin":
          this.routes = this.routesAdmin;
          break;
        case "Customer":
          this.routes = this.routesCustomer;
          break;
        case "Employee":
          this.routes = this.routesEmployee;
          break;
        case "Boss":
          this.routes = this.routesBoss;
          break;
        default:
          console.log("Error no roles for this user");
      }
    },
  },
  created() {
    this.navigationDrawerContent();
  },
  data() {
    return {
      userRole: localStorage.getItem("userRole"),
      email: localStorage.getItem("email"),
      isLoggedValue: localStorage.getItem("isLogged"),
      drawer: false,
      routes: [],
      routesAdmin: [
        { text: "Repairs", route: "/repairs" },
        { text: "Add New Repair", route: "/addRepair" },
        { text: "Repairs For Assign", route: "/repairsForAssign" },
        { text: "Register Customer", route: "/registerCustomer" },
        { text: "Repair Types", route: "/repairTypes" },
        { text: "Parts", route: "/parts" },
        { text: "Login", route: "/login" },
        { text: "Register Employee", route: "/registerEmployee" },
        { text: "Customer's Repairs", route: "/customerRepairs" },
        { text: "Create Invoice", route: "/createInvoice" },
        { text: "Users", route: "/users" },
        { text: "Change Password", route: "/changePassword" },
        { text: "Edit Your Data", route: "/editUser" },
      ],
      routesCustomer: [
        { text: "Customer's Repairs", route: "/customerRepairs" },
        { text: "Change Password", route: "/changePassword" },
        { text: "Edit Your Data", route: "/editUser" },
      ],
      routesEmployee: [
        { text: "Repairs", route: "/repairs" },
        { text: "Add New Repair", route: "/addRepair" },
        { text: "Repairs For Assign", route: "/repairsForAssign" },
        { text: "Register Customer", route: "/registerCustomer" },
        { text: "Repair Types", route: "/repairTypes" },
        { text: "Parts", route: "/parts" },
        { text: "Change Password", route: "/changePassword" },
        { text: "Edit Your Data", route: "/editUser" },
      ],
      routesBoss: [
        { text: "Repairs", route: "/repairs" },
        { text: "Add New Repair", route: "/addRepair" },
        { text: "Register Customer", route: "/registerCustomer" },
        { text: "Repair Types", route: "/repairTypes" },
        { text: "Parts", route: "/parts" },
        { text: "Create Invoice", route: "/createInvoice" },
        { text: "Change Password", route: "/changePassword" },
        { text: "Edit Your Data", route: "/editUser" },
      ],

      loginRoute: {
        routeName: "Login",
        route: "/login",
      },
    };
  },
};
</script>