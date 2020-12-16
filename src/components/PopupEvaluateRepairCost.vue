<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="green accent-4" dark v-bind="attrs" v-on="on">
          Evaluate Repair Cost
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Evaluate Repair Cost</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Repair cost"
                  v-model="repairCost"
                  value="repairCost"
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
            Evaluate
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
      dialog: false,
      repairCost: "",
      id: this.$route.params.id,
    };
  },
  created() {
    this.$http
      .get("https://localhost:44308/api/Repair/getRepair/" + this.id)
      .then(function (data) {
        this.repairCost = data.body.repairCost;
      });
  },
  methods: {
    post: function () {
      this.$http
        .put("https://localhost:44308/api/Repair/evaluateRepairCost", {
          repairId: this.id,
          repairCost: this.repairCost,
        })
        .then(function () {
          location.reload();
        });
    },
  },
};
</script>