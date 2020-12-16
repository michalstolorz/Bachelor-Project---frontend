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
            <th class="text-left">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="repair in repairs" :key="repair.id">
            <td>
              {{ repair.customerFirstName + " " + repair.customerLastName }}
            </td>
            <td>{{ repair.customerEmail }}</td>
            <td>{{ repair.customerPhoneNumber }}</td>
            <td
              v-for="repairUser in repair.repairUsers"
              :key="repairUser.userId"
            >
              {{ repairUser.userFirstName + " " + repairUser.userLastName }}
            </td>
            <td>{{ repair.description }}</td>
            <td>{{ repair.status }}</td>
            <td>
              <router-link v-bind:to="'/repair/' + repair.id"
                ><v-icon large color="blue darken-2">
                  mdi-message-text
                </v-icon></router-link
              >
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
    };
  },
  created() {
    this.$http
      .get("https://localhost:44308/api/Repair/getCustomerRepairs")
      .then(function (data) {
        this.repairs = data.body;
      }, function (error) {
        console.log(error);
        this.$router.push({ name: "Login" });
      });
    console.log(localStorage.getItem("isLogged"));
  },
};
</script>