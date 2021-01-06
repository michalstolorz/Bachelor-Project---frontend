<template>
  <v-form>
    <v-container>
      <v-row>
        <v-text-field
          :type="'password'"
          v-model="oldPassword"
          label="Old Password"
          required
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          :type="'password'"
          v-model="newPassword"
          label="New Password"
          required
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          :type="'password'"
          v-model="repeatPassword"
          label="Repeat Password"
          required
        ></v-text-field>
      </v-row>
      <v-row>
        <v-btn color="green accent-4" dark v-on:click="post"> Change Password </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
  }),
  methods: {
  },
};
</script>