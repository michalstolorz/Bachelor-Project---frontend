<template>
  <v-form>
    <v-container>
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
        <v-text-field v-model="email" label="E-mail" required></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          v-model="phoneNumber"
          label="Phone Number (+48 ...)"
          required
        ></v-text-field>
      </v-row>
      <v-row>
        <v-btn color="green accent-4" dark v-on:click="post"> Edit </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  }),
  created() {
    this.$http
      .get("https://localhost:44308/api/User/getCurrentLoggedUser")
      .then(function (data) {
        this.firstName = data.body.firstName;
        this.lastName = data.body.lastName;
        this.email = data.body.email;
        this.phoneNumber = data.body.phoneNumber;
      });
  },
  methods: {},
};
</script>