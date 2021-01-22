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
                <v-row
                  v-show="emptyErrorFlag"
                  v-for="error in errorList"
                  :key="error.id"
                  style="color: red; font-size: 100%; font-weight: 1500"
                >
                  {{ error.name }}
                </v-row>
                <v-text-field
                  label="Repair cost"
                  v-model="repairCost"
                  :error-messages="repairCostErrors"
                  value="repairCost"
                  required
                  @input="$v.repairCost.$touch()"
                  @blur="$v.repairCost.$touch()"
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
            v-on:click="put"
          >
            Evaluate
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minValue } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    repairCost: { required, minValue: minValue(1) },
  },
  data() {
    return {
      dialog: false,
      repairCost: "",
      id: this.$route.params.id,
      emptyErrorFlag: false,
      errorList: [],
    };
  },
  computed: {
    repairCostErrors() {
      const errors = [];
      if (!this.$v.repairCost.$dirty) return errors;
      !this.$v.repairCost.required && errors.push("Repair cost is required");
      !this.$v.repairCost.minValue &&
        errors.push("Repair cost can not be 0 or less");
      return errors;
    },
  },
  methods: {
    fillRepairCostErrors: function () {
      let errors = "";
      if (!this.$v.repairCost.$dirty) return errors;
      if (!this.$v.repairCost.required)
        return (errors = "Repair cost is required");
      if (!this.$v.repairCost.minValue)
        return (errors = "Repair cost can not be 0 or less");
      return errors;
    },
    fillErrorList: function () {
      this.errorList = [];
      if (this.fillRepairCostErrors() !== "")
        this.errorList.push({ id: 1, name: this.fillRepairCostErrors() });
      this.emptyErrorFlag = true;
    },
    put: function () {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.dialog = true;
        this.fillErrorList();
      } else {
      this.$http
        .put("https://localhost:44308/api/Repair/evaluateRepairCost", {
          repairId: this.id,
          repairCost: this.repairCost,
        })
        .then(function () {
          location.reload();
        });}
    },
  },
  created() {
    this.$http
      .get("https://localhost:44308/api/Repair/getRepair/" + this.id)
      .then(function (data) {
        this.repairCost = data.body.repairCost;
      });
  },
};
</script>