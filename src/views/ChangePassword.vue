<template>
  <v-form>
    <v-container>
      <v-row
        v-show="emptyErrorFlag"
        v-for="error in errorList"
        :key="error.id"
        style="color: red; font-size: 150%; font-weight: 1500"
      >
        {{ error.name }}
      </v-row>
      <v-row>
        <v-text-field
          :type="'password'"
          v-model="oldPassword"
          :error-messages="oldPasswordErrors"
          label="Old Password"
          required
          @input="$v.oldPassword.$touch()"
          @blur="$v.oldPassword.$touch()"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          :type="'password'"
          v-model="newPassword"
          :error-messages="newPasswordErrors"
          label="New Password"
          required
          @input="$v.newPassword.$touch()"
          @blur="$v.newPassword.$touch()"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          :type="'password'"
          v-model="newPasswordConfirmation"
          :error-messages="newPasswordConfirmationErrors"
          label="Repeat Password"
          required
          @input="$v.newPasswordConfirmation.$touch()"
          @blur="$v.newPasswordConfirmation.$touch()"
        ></v-text-field>
      </v-row>
      <br/>
      <v-row>
        <v-btn color="green accent-4" dark v-on:click="post">
          Change Password
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, sameAs, not } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    oldPassword: { required },
    newPassword: { required, notSameAsOldPassword: not(sameAs("oldPassword")) },
    newPasswordConfirmation: {
      required,
      sameAsNewPassword: sameAs("newPassword"),
    },
  },

  data: () => ({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
    emptyErrorFlag: false,
    errorList: [],
  }),

  computed: {
    oldPasswordErrors() {
      const errors = [];
      if (!this.$v.oldPassword.$dirty) return errors;
      !this.$v.oldPassword.required && errors.push("Old password is required");
      return errors;
    },
    newPasswordErrors() {
      const errors = [];
      if (!this.$v.newPassword.$dirty) return errors;
      !this.$v.newPassword.required && errors.push("New password is required");
      !this.$v.newPassword.notSameAsOldPassword &&
        errors.push("New password can not be same as old password");
      return errors;
    },
    newPasswordConfirmationErrors() {
      const errors = [];
      if (!this.$v.newPasswordConfirmation.$dirty) return errors;
      !this.$v.newPasswordConfirmation.required &&
        errors.push("New password confirmation is required");
      !this.$v.newPasswordConfirmation.sameAsNewPassword &&
        errors.push("New password confirmation is not the same as above");
      return errors;
    },
  },

  methods: {
    fillOldPasswordErrors: function () {
      let errors = "";
      if (!this.$v.oldPassword.$dirty) return errors;
      if (!this.$v.oldPassword.required)
        return (errors = "Old password is required");
      return errors;
    },
    fillNewPasswordErrors: function () {
      let errors = "";
      if (!this.$v.newPassword.$dirty) return errors;
      if (!this.$v.newPassword.required)
        return (errors = "New password is required");
      if (!this.$v.newPassword.notSameAsOldPassword)
        return (errors = "New password can not be same as old password");
      return errors;
    },
    fillNewPasswordConfirmationErrors: function () {
      let errors = "";
      if (!this.$v.newPasswordConfirmation.$dirty) return errors;
      if (!this.$v.newPasswordConfirmation.required)
        return (errors = "New password confirmation is required");
      if (!this.$v.newPasswordConfirmation.sameAsNewPassword)
        return (errors = "New password confirmation is not the same as above");
      return errors;
    },
    fillErrorList: function () {
      this.errorList = [];
      if (this.fillOldPasswordErrors() !== "")
        this.errorList.push({ id: 1, name: this.fillOldPasswordErrors() });
      if (this.fillNewPasswordErrors() !== "")
        this.errorList.push({ id: 2, name: this.fillNewPasswordErrors() });
      if (this.fillNewPasswordConfirmationErrors() !== "")
        this.errorList.push({
          id: 3,
          name: this.fillNewPasswordConfirmationErrors(),
        });
      this.emptyErrorFlag = true;
    },
    post: function () {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.fillErrorList();
      } else {
        this.$http
          .post("https://localhost:44308/api/Authentication/changePassword", {
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
            newPasswordConfirmation: this.newPasswordConfirmation,
          })
          .then(function () {
            if (localStorage.getItem("userRole") == "Customer")
              this.$router.push({ name: "CustomerRepairs" });
            else this.$router.push({ name: "Repairs" });
          });
      }
    },
  },
};
</script>