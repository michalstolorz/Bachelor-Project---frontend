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
        <v-btn color="green accent-4" v-on:click="post"> Login </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    post: function () {
      this.$http
        .post("https://localhost:44308/api/Authentication/login", {
          email: this.email,
          password: this.password,
        })
        .then((data) => {
          localStorage.setItem("token", data.body.token);
          localStorage.setItem("email", data.body.email);
          localStorage.setItem("isLogged", true);
          console.log("zalogowany");
          location.reload();
        });
    },
  },
};
</script>