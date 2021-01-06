<template>
  <v-card>
    <v-card-title>
      Users
      <v-spacer></v-spacer>
      <router-link v-bind:to="'/registerCustomer'"
        ><v-btn color="green accent-4" dark> Register Customer </v-btn>
      </router-link>
      <v-spacer></v-spacer>
      <router-link v-bind:to="'/registerEmployee'"
        ><v-btn color="green accent-4" dark> Register Employee </v-btn>
      </router-link>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
    >
    <template v-slot:[`item.actions`]="{item}">
        <v-icon
        class="mr-2"
        @clicl="item">
            mdi-pencil
        </v-icon>
        <v-icon
        class="mr-2">
            mdi-key-change
        </v-icon>
        <v-icon
        class="mr-2">
            mdi-lock-reset
        </v-icon>
    </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      users: [],
      search: "",
      headers: [
        { text: "User Name", value: "userName" },
        { text: "Email", value: "userEmail" },
        { text: "Phone Number", value: "userPhoneNumber" },
        { text: "Role", value: "roleName" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },

  created() {
    this.$http
      .get("https://localhost:44308/api/User/getUsersWithRoles")
      .then(function (data) {
        this.users = data.body;
      });
  },
};
</script>