<template>
  <v-card>
    <v-card-title>
      Parts
      <v-spacer></v-spacer>
      <PopudAddPart />
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
      :items="parts"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
import PopudAddPart from "../components/PopupAddPart.vue";

export default {
  components: {
    PopudAddPart,
  },

  data() {
    return {
      parts: [],
      search: "",
      headers: [
          { text: "Name", value: "name" },
          { text: "Quantity", value: "quantity" },
          { text: "Part Bought Price(zł)", value: "partBoughtPrice" },],
    };
  },

  created() {
    this.$http
      .get("https://localhost:44308/api/Part/getParts")
      .then(function (data) {
        this.parts = data.body;
      });
  },
};
</script>