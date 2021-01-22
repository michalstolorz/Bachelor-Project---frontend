<template>
  <div class="repairs">
    <v-card>
      <v-card-title>
        Repairs
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
          <router-link v-bind:to="'/repair/' + item.id"
            ><v-icon large color="blue darken-2">
              mdi-message-text
            </v-icon></router-link
          >
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
        { text: "Details", value: "actions", filterable: false },
      ],
    };
  },
  created() {
    this.$http.get("https://localhost:44308/api/Repair/getRepairs").then(
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
      }
    );
    console.log(localStorage.getItem("isLogged"));
  },
};
</script>
