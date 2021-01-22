<template>
  <v-form>
    <v-container>
      <v-row v-show="this.errorFlag">
        <p style="color: red; font-size: 200%; font-weight: 1500">
          Email or password is incorect. Please try again
        </p>
      </v-row>
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
        <v-btn color="green accent-4" dark v-on:click="post"> Login </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
    errorFlag: false,
  }),
  methods: {
    post: function () {
      this.$http
        .post("https://localhost:44308/api/Authentication/login", {
          email: this.email,
          password: this.password,
        })
        .then(
          (data) => {
            localStorage.setItem("loggedUserId", data.body.id);
            localStorage.setItem("token", data.body.token);
            localStorage.setItem("email", data.body.email);
            localStorage.setItem("isLogged", true);
            this.$http
              .get("https://localhost:44308/api/User/checkUserRole")
              .then((data) => {
                if (data.body == "Customer")
                  this.$router.push({ name: "CustomerRepairs" });
                else this.$router.push({ name: "Repairs" });
                localStorage.setItem("userRole", data.body);
                location.reload();
              });
          },
          function (error) {
            this.errorFlag = true;
            console.log(error);
          }
        );
    },
  },
};
</script>