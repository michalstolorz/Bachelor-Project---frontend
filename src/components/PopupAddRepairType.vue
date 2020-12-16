<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="green accent-4" dark v-bind="attrs" v-on="on">
          Add Repair Type
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Repair Type</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Repair type"
                  v-model="repairType"
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
      dialog: false,
      repairType: "",
      repairTypeList: [],
    };
  },
  methods: {
    post: function () {
      this.repairTypeList.push(this.repairType);
      console.log(this.repairTypeList);
      this.$http
        .post("https://localhost:44308/api/RepairType/addRepairType", {
          repairTypeNames: this.repairTypeList,
        })
        .then(function () {
          location.reload();
        });
    },
  },
};
</script>