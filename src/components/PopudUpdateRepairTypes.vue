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
              <v-col cols="12">
                <v-row
                  v-show="emptyErrorFlag"
                  v-for="error in errorList"
                  :key="error.id"
                  style="color: red; font-size: 150%; font-weight: 1500"
                >
                  {{ error.name }}
                </v-row>
                <v-row
                  v-show="error500Flag"
                  style="color: red; font-size: 100%; font-weight: 1500"
                >
                  Repair type already assign to your repair.
                </v-row>
                <v-select
                  v-model="choosenRepairTypes"
                  :items="selectRepairType"
                  :error-messages="selectRepairTypeErrors"
                  label="Repair Types"
                  multiple
                  chips
                  hint="What are the repair types"
                  persistent-hint
                  @input="$v.choosenRepairTypes.$touch()"
                  @blur="$v.choosenRepairTypes.$touch()"
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
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    choosenRepairTypes: { required },
  },

  data() {
    return {
      repairId: this.$route.params.id,
      dialog: false,
      repairTypes: [],
      choosenRepairTypes: [],
      error500Flag: false,
      emptyErrorFlag: false,
      errorList: [],
    };
  },
  computed: {
    selectRepairType() {
      return this.repairTypes.map((repairType) => ({
        text: repairType.name,
        value: repairType.id,
      }));
    },
    selectRepairTypeErrors() {
      const errors = [];
      if (!this.$v.choosenRepairTypes.$dirty) return errors;
      !this.$v.choosenRepairTypes.required &&
        errors.push("Repair Type is required");
      return errors;
    },
  },
  methods: {
    fillSelectRepairTypeErrors: function () {
      let errors = "";
      if (!this.$v.choosenRepairTypes.$dirty) return errors;
      if (!this.$v.choosenRepairTypes.required)
        return (errors = "Repair Type is required");
    },
    fillErrorList: function () {
      this.errorList = [];
      if (this.fillSelectRepairTypeErrors() !== "")
        this.errorList.push({ id: 1, name: this.fillSelectRepairTypeErrors() });
      this.emptyErrorFlag = true;
      this.error500Flag = false;
    },
    post: function () {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.dialog = true;
        this.fillErrorList();
      } else {
        this.$http
          .post(
            "https://localhost:44308/api/RequiredRepairType/assignRepairTypeToRepair",
            {
              repairId: this.repairId,
              repairTypeIds: this.choosenRepairTypes,
            }
          )
          .then(
            function () {
              location.reload();
            },
            function (error) {
              console.log(error);
              this.dialog = true;
              this.error500Flag = true;
              this.emptyErrorFlag = false;
            }
          );
      }
    },
  },
  created() {
    this.$http
      .get("https://localhost:44308/api/RepairType/getRepairTypes")
      .then((data) => {
        this.repairTypes = data.body;
      });
  },
};
</script>