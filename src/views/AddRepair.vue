<template>
  <form align="center">
    <v-col cols="12">
      <v-text-field v-model="description" label="Description"></v-text-field>
      <v-select
        v-model="choosenCustomer"
        :items="selectCustomersName"
        label="Customer"
        required
      ></v-select>
      <v-select
        v-model="choosenRepairTypes"
        :items="selectRepairType"
        label="Repair Types"
        multiple
        chips
        hint="What are the repair types"
        persistent-hint
      ></v-select>
    </v-col>
    <v-btn color="green accent-4" v-on:click="post"> Add repair </v-btn>
  </form>
</template>

<script>
export default {
  data: () => ({
    customers: [],
    choosenCustomer: "",
    repairTypes: [],
    choosenRepairTypes: [],
    description: "",
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
  },
  methods: {
    post: function () {
      this.$http
        .post("https://localhost:44308/api/Repair/addRepair", {
          customerId: this.choosenCustomer,
          description: this.description,
          repairTypeIds: this.choosenRepairTypes,
        })
        .then(function () {
          this.$router.push({ name: "Repairs" });
        });
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