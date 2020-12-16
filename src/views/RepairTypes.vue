<template>
  <v-card>
    <v-card-title>
      Repair Types
      <v-spacer></v-spacer>
      <PopudAddRepairType />
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="repairTypes"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
import PopudAddRepairType from "../components/PopupAddRepairType.vue";

export default {
  components: {
    PopudAddRepairType,
  },

  data() {
    return {
      repairTypes: [],
      search: "",
      headers: [{ text: "Name", value: "name" }],
    };
  },

  created() {
    this.$http
      .get("https://localhost:44308/api/RepairType/getRepairTypes")
      .then(function (data) {
        this.repairTypes = data.body;
      });
  },
};
</script>
