<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="green accent-4" dark v-bind="attrs" v-on="on">
          Add Repair Types
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Repair Types</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12"
                ><v-select
                  v-model="choosenRepairTypes"
                  :items="selectRepairType"
                  label="Repair Types"
                  multiple
                  chips
                  hint="What are the repair types"
                  persistent-hint
                ></v-select>
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
      repairTypes: [],
      choosenRepairTypes: [],
    };
  },
  created() {
    this.$http
      .get("https://localhost:44308/api/RepairType/getRepairTypes")
      .then((data) => {
        this.repairTypes = data.body;
      });
  },
  computed: {
    selectRepairType() {
      return this.repairTypes.map((repairType) => ({
        text: repairType.name,
        value: repairType.id,
      }));
    },
  },
  methods: {
    post: function () {
      this.$http
        .post(
          "https://localhost:44308/api/RequiredRepairType/assignRepairTypeToRepair",
          {
            repairId: this.repairId,
            repairTypeIds: this.choosenRepairTypes,
          }
        )
        .then(function () {
          location.reload();
        });
    },
  },
};
</script>