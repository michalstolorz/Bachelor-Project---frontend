<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="green accent-4" dark v-bind="attrs" v-on="on">
          Add Used Part
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Used Part</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="choosenPartName"
                  :items="selectPartsName"
                  label="Part Name"
                  required
                ></v-select>
                <v-text-field
                  label="Quantity"
                  v-model="quantity"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = !dialog">
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = !dialog"
            v-on:click="post"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      repairId: this.$route.params.id,
      dialog: false,
      partNames: [],
      choosenPartName: "",
      quantity: 0,
    };
  },
  created() {
    this.$http.get("https://localhost:44308/api/Part/getParts").then((data) => {
      this.partNames = data.body;
    });
  },
  computed: {
    selectPartsName() {
      return this.partNames.map((partName) => ({
        text: partName.name,
        value: partName.id,
      }));
    },
  },
  methods: {
    post: function () {
      this.$http
        .put("https://localhost:44308/api/UsedPart/updateRepairUsedParts", {
          repairId: this.repairId,
          partId: this.choosenPartName,
          usedPartQuantity: this.quantity,
        })
        .then(function () {
          location.reload();
        });
    },
  },
};
</script>