<template>
  <div class="repairs">
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Customer Name</th>
            <th class="text-left">Customer Email</th>
            <th class="text-left">Customer Phone Number</th>
            <th class="text-left">User Name</th>
            <th class="text-left">Description</th>
            <th class="text-left">Status</th>
            <th class="text-left">Assign</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="repair in newRepairs" :key="repair.id">
            <td>
              {{ repair.customerFirstName + " " + repair.customerLastName }}
            </td>
            <td>{{ repair.customerEmail }}</td>
            <td>{{ repair.customerPhoneNumber }}</td>
            <td>
              <div
                v-for="repairUser in repair.repairUsers"
                :key="repairUser.userId"
              >
                {{ repairUser.userFirstName + " " + repairUser.userLastName }}
              </div>
            </td>
            <td>{{ repair.description }}</td>
            <td> New</td>
            <td>
              <v-btn
                class="ma-2"
                color="green"
                dark
                v-on:click="post(repair.id)"
              >
                <v-icon dark> mdi-wrench </v-icon>
              </v-btn>
            </td>
          </tr>
          <tr v-for="repair in forCustomerApprovalRepairs" :key="repair.id">
            <td>
              {{ repair.customerFirstName + " " + repair.customerLastName }}
            </td>
            <td>{{ repair.customerEmail }}</td>
            <td>{{ repair.customerPhoneNumber }}</td>
            <td>
              <div
                v-for="repairUser in repair.repairUsers"
                :key="repairUser.userId"
              >
                {{ repairUser.userFirstName + " " + repairUser.userLastName }}
              </div>
            </td>
            <td>{{ repair.description }}</td>
            <td> For Customer Approval </td>
            <td>
              <v-btn
                class="ma-2"
                color="green"
                dark
                v-on:click="post(repair.id)"
              >
                <v-icon dark> mdi-wrench </v-icon>
              </v-btn>
            </td>
          </tr>
          <tr v-for="repair in inProgressRepairs" :key="repair.id">
            <td>
              {{ repair.customerFirstName + " " + repair.customerLastName }}
            </td>
            <td>{{ repair.customerEmail }}</td>
            <td>{{ repair.customerPhoneNumber }}</td>
            <td>
              <div
                v-for="repairUser in repair.repairUsers"
                :key="repairUser.userId"
              >
                {{ repairUser.userFirstName + " " + repairUser.userLastName }}
              </div>
            </td>
            <td>{{ repair.description }}</td>
            <td> In Progress </td>
            <td>
              <v-btn
                class="ma-2"
                color="green"
                dark
                v-on:click="post(repair.id)"
              >
                <v-icon dark> mdi-wrench </v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      repairs: [],
      newRepairs: [],
      inProgressRepairs: [],
      forCustomerApprovalRepairs: [],
    };
  },
  methods: {
    post: function (id) {
      this.$http
        .post(
          "https://localhost:44308/api/EmployeeRepair/assignEmployeeToRepair/" +
            id
        )
        .then(function () {
          location.reload();
        });
    },
  },
  created() {
    this.$http
      .get("https://localhost:44308/api/Repair/getRepairsForAssign")
      .then(
        function (data) {
          this.newRepairs = data.body[0];
          this.inProgressRepairs = data.body[1];
          this.forCustomerApprovalRepairs = data.body[2];
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