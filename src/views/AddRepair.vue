<template>
  <form align="center">
    <v-col cols="12">
      <v-row
        v-show="emptyErrorFlag"
        v-for="error in errorList"
        :key="error.id"
        style="color: red; font-size: 150%; font-weight: 1500"
      >
        {{ error.name }}
      </v-row>
      <v-text-field
        v-model="description"
        :error-messages="descriptionErrors"
        label="Description"
        required
        @input="$v.description.$touch()"
        @blur="$v.description.$touch()"
      ></v-text-field>
      <v-select
        v-model="choosenCustomer"
        :items="selectCustomersName"
        :error-messages="selectCustomersNameErrors"
        label="Customer"
        required
        @input="$v.choosenCustomer.$touch()"
        @blur="$v.choosenCustomer.$touch()"
      ></v-select>
      <v-select
        v-model="choosenRepairTypes"
        :items="selectRepairType"
        :error-messages="selectRepairTypeErrors"
        label="Repair Types"
        multiple
        chips
        hint="What are the repair types"
        persistent-hint
        @input="$v.choosenRepairTypes.$touch()"
        @blur="$v.choosenRepairTypes.$touch()"
      ></v-select>
    </v-col>
    <v-btn color="green accent-4" dark v-on:click="post"> Add repair </v-btn>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    description: { required },
    choosenCustomer: { required },
    choosenRepairTypes: { required },
  },

  data: () => ({
    customers: [],
    choosenCustomer: "",
    repairTypes: [],
    choosenRepairTypes: [],
    description: "",
    emptyErrorFlag: false,
    errorList: [],
  }),
  computed: {
    selectCustomersName() {
      return this.customers.map((customer) => ({
        text: `${customer.customerFirstName} ${customer.customerLastName}`,
        value: customer.id,
      }));
    },

    selectRepairType() {
      return this.repairTypes.map((repairType) => ({
        text: repairType.name,
        value: repairType.id,
      }));
    },

    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.required && errors.push("Description is required");
      return errors;
    },

    selectCustomersNameErrors() {
      const errors = [];
      if (!this.$v.choosenCustomer.$dirty) return errors;
      !this.$v.choosenCustomer.required && errors.push("Customer is required");
      return errors;
    },

    selectRepairTypeErrors() {
      const errors = [];
      if (!this.$v.choosenRepairTypes.$dirty) return errors;
      !this.$v.choosenRepairTypes.required &&
        errors.push("Repair Type is required");
      return errors;
    },
  },
  methods: {
    fillDescriptionErrors: function () {
      let errors = "";
      if (!this.$v.description.$dirty) return errors;
      if (!this.$v.description.required)
        return (errors = "Description is required");
    },
    fillSelectCustomersNameErrors: function () {
      let errors = "";
      if (!this.$v.choosenCustomer.$dirty) return errors;
      if (!this.$v.choosenCustomer.required)
        return (errors = "Customer is required");
    },
    fillSelectRepairTypeErrors: function () {
      let errors = "";
      if (!this.$v.choosenRepairTypes.$dirty) return errors;
      if (!this.$v.choosenRepairTypes.required)
        return (errors = "Repair Type is required");
    },
    fillErrorList: function () {
      this.errorList = [];
      if (this.fillDescriptionErrors() !== "")
        this.errorList.push({ id: 1, name: this.fillDescriptionErrors() });
      if (this.fillSelectCustomersNameErrors() !== "")
        this.errorList.push({
          id: 2,
          name: this.fillSelectCustomersNameErrors(),
        });
      if (this.fillSelectRepairTypeErrors() !== "")
        this.errorList.push({ id: 3, name: this.fillSelectRepairTypeErrors() });
      this.emptyErrorFlag = true;
    },
    post: function () {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.fillErrorList();
      } else {
        this.$http
          .post("https://localhost:44308/api/Repair/addRepair", {
            customerId: this.choosenCustomer,
            description: this.description,
            repairTypeIds: this.choosenRepairTypes,
          })
          .then(
            function () {
              this.$router.push({ name: "Repairs" });
            },
            function (error) {
              console.log(error);
            }
          );
      }
    },
  },
  created() {
    this.$http
      .get("https://localhost:44308/api/User/getUsersFromRole?role=Customer")
      .then((data) => {
        this.customers = data.body;
      });

    this.$http
      .get("https://localhost:44308/api/RepairType/getRepairTypes")
      .then(function (data) {
        this.repairTypes = data.body;
      });
  },
};
</script>