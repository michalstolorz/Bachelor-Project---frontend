<template>
  <v-card>
    <v-card-title>
      Parts
      <v-spacer></v-spacer>
      <PopupAddPart />
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="parts" :search="search">
      <template v-slot:[`item.actions`]="{ item }">
        <PopupSupplyPart v-bind:item="item" />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import PopupAddPart from "../components/PopupAddPart.vue";
import PopupSupplyPart from "../components/PopupSupplyPart.vue";

export default {
  components: {
    PopupAddPart,
    PopupSupplyPart,
  },
  methods: {
    supply(id, name) {
      this.dialog = true;
      this.partId = id;
      this.partName = name;
    },
  },
  data() {
    return {
      dialog: false,
      partId: 0,
      partName: "",
      quantity: 0,
      parts: [],
      search: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Quantity", value: "quantity" },
        { text: "Part Bought Price(zł)", value: "partBoughtPrice" },
        { text: "Supply Parts", value: "actions" },
      ],
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