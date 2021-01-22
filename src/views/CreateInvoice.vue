<template>
  <div class="createInvoice">
    <v-card>
      <v-card-title>
        Create Invoice
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="repairs" :search="search">
        <template v-slot:[`item.employeeNames`]="{ item }">
          <div v-for="repairUser in item.repairUsers" :key="repairUser.userId">
            {{ repairUser.userFirstName + " " + repairUser.userLastName }}
          </div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn class="ma-2" color="green" dark v-on:click="post(item.id)">
            <v-icon dark> mdi-wrench </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      repairs: [],
      search: "",
      headers: [
        {
          text: "Customer Name",
          value: "customerName",
        },
        { text: "Customer Email", value: "customerEmail" },
        { text: "Customer Phone Number", value: "customerPhoneNumber" },
        { text: "Employee Name", value: "employeeNames" },
        { text: "Description", value: "description" },
        { text: "Status", value: "status" },
        { text: "Assign", value: "actions", filterable: false },
      ],
    };
  },
  methods: {
    post: function (id) {
      this.$http
        .post("https://localhost:44308/api/Invoice/createInvoice/" + id)
        .then(function () {
          location.reload();
        });
    },
  },
  created() {
    this.$http
      .get("https://localhost:44308/api/Repair/getRepairsForInvoices")
      .then(
        function (data) {
          this.repairs = data.body;
        this.repairs.forEach((repair) => {
          switch (repair.status) {
            case "New":
              break;
            case "ForCustomerApproval":
              repair.status = "For Customer Approval";
              break;
            case "InProgress":
              repair.status = "In Progress";
              break;
            case "Finished":
              break;
            default:
              console.log(`Wrong status ${repair.status}`);
          }
        });
      },
        function (error) {
          console.log(error);
          this.$router.push({ name: "Login" });
        }
      );
    console.log(localStorage.getItem("isLogged"));
  },
};
</script>