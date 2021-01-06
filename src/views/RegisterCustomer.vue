<template>
  <v-form>
    <v-container>
      <v-row>
        <v-text-field v-model="email" label="E-mail" required></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          :type="'password'"
          v-model="password"
          label="Password"
          required
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          v-model="firstName"
          label="First Name"
          required
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          v-model="lastName"
          label="Last Name"
          required
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          v-model="phoneNumber"
          label="Phone Number (+48 ...)"
          required
        ></v-text-field>
      </v-row>
      <v-row>
        <v-btn color="green accent-4" dark v-on:click="post"> Register New Customer </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  }),
  methods: {
    post: function () {
      this.$http
        .post("https://localhost:44308/api/Registration/registerUser", {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          phoneNumber: this.phoneNumber,
        })
        .then((data) => {
          this.$http.put("https://localhost:44308/api/Roles/addUserToRoles", {
            userId: data.data,
            role: "Customer",
          });
        });
      this.$router.push({ name: "Login" });
    },
  },
};
</script>