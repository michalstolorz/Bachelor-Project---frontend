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
          v-model="firstName"
          :error-messages="firstNameErrors"
          label="First Name"
          required
          @input="$v.firstName.$touch()"
          @blur="$v.firstName.$touch()"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          v-model="lastName"
          :error-messages="lastNameErrors"
          label="Last Name"
          required
          @input="$v.lastName.$touch()"
          @blur="$v.lastName.$touch()"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          v-model="phoneNumber"
          :error-messages="phoneNumberErrors"
          label="Phone Number (+48 ...)"
          required
          @input="$v.phoneNumber.$touch()"
          @blur="$v.phoneNumber.$touch()"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-btn color="green accent-4" dark v-on:click="post"> Edit </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    firstName: { required },
    lastName: { required },
    phoneNumber: {
      required,
      phoneNumberRegex(phoneNumber) {
        return /^\+[0-9]{1,3} ?\d{4,12}$/.test(phoneNumber);
      },
    },
  },

  data: () => ({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    emptyErrorFlag: false,
    errorList: [],
  }),
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("E-mail is not valid");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.required && errors.push("First Name is required");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.required && errors.push("Last Name is required");
      return errors;
    },
    phoneNumberErrors() {
      const errors = [];
      if (!this.$v.phoneNumber.$dirty) return errors;
      !this.$v.phoneNumber.required && errors.push("Phone Number is required");
      !this.$v.phoneNumber.phoneNumberRegex &&
        errors.push("Phone Number is not valid");
      return errors;
    },
  },
  methods: {
    fillEmailErrors: function () {
      let errors = "";
      if (!this.$v.email.$dirty) return errors;
      if (!this.$v.email.required) return (errors = "E-mail is required");
      if (!this.$v.email.email) return (errors = "E-mail is not valid");
      return errors;
    },
    fillFirstNameErrors: function () {
      let errors = "";
      if (!this.$v.firstName.$dirty) return errors;
      if (!this.$v.firstName.required)
        return (errors = "First Name is required");
      return errors;
    },
    fillLastNameErrors: function () {
      let errors = "";
      if (!this.$v.lastName.$dirty) return errors;
      if (!this.$v.lastName.required) return (errors = "Last Name is required");
      return errors;
    },
    fillPhoneNumberErrors: function () {
      let errors = "";
      if (!this.$v.phoneNumber.$dirty) return errors;
      if (!this.$v.phoneNumber.required)
        return (errors = "Phone Number is required");
      if (!this.$v.phoneNumber.phoneNumberRegex)
        return (errors = "Phone Number is not valid");
      return errors;
    },
    fillErrorList: function () {
      this.errorList = [];
      if (this.fillEmailErrors() !== "")
        this.errorList.push({ id: 1, name: this.fillEmailErrors() });
      if (this.fillFirstNameErrors() !== "")
        this.errorList.push({ id: 2, name: this.fillFirstNameErrors() });
      if (this.fillLastNameErrors() !== "")
        this.errorList.push({ id: 3, name: this.fillLastNameErrors() });
      if (this.fillPhoneNumberErrors() !== "")
        this.errorList.push({ id: 4, name: this.fillPhoneNumberErrors() });
      this.emptyErrorFlag = true;
    },

    post: function () {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.fillErrorList();
      } else {
        this.$http
          .put("https://localhost:44308/api/User/updateUserInfo", {
            userId: localStorage.getItem("loggedUserId"),
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phoneNumber: this.phoneNumber,
          })
          .then(function () {
            if (localStorage.getItem("userRole") == "Customer")
              this.$router.push({ name: "CustomerRepairs" });
            else this.$router.push({ name: "Repairs" });
          });
      }
    },
  },
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
};
</script>