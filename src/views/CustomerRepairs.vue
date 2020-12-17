<template>
  <div class="repairs">
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Customer Name</th>
            <th class="text-left">Create Date</th>
            <th class="text-left">Finish Date</th>
            <th class="text-left">Users Name</th>
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
            <td>{{ repair.createDateTime | formatDate }}</td>
            <td v-if="repair.finishDateTime === '0001-01-01T00:00:00'">Not finished yet</td>
            <td v-else>{{ repair.finishDateTime | formatDate }}</td>
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
      //createDateTime: {}, 
    };
  },
  created() {
    this.$http
      .get("https://localhost:44308/api/Repair/getRepairs?CustomerId=" + localStorage.getItem("loggedUserId"))
      .then(function (data) {
        this.repairs = data.body;
        //this.createDateTime = String(this.repair.createDateTime).format('MM/DD/YYYY hh:mm');
      }, function (error) {
        console.log(error);
        this.$router.push({ name: "Login" });
      });
    console.log(localStorage.getItem("isLogged"));
  },
};
</script>