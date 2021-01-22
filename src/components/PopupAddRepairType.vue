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
                <v-row
                  v-show="emptyErrorFlag"
                  v-for="error in errorList"
                  :key="error.id"
                  style="color: red; font-size: 100%; font-weight: 1500"
                >
                  {{ error.name }}
                </v-row>
                <v-row
                  v-show="error500Flag"
                  style="color: red; font-size: 100%; font-weight: 1500"
                >
                  Repair type with given name already exist.
                </v-row>
                <v-text-field
                  v-model="repairType"
                  :error-messages="repairTypeErrors"
                  label="Repair Type Name"
                  required
                  @input="$v.repairType.$touch()"
                  @blur="$v.repairType.$touch()"
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
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    repairType: { required },
  },

  data() {
    return {
      dialog: false,
      repairType: "",
      repairTypeList: [],
      error500Flag: false,
      emptyErrorFlag: false,
      errorList: [],
    };
  },
  computed: {
    repairTypeErrors() {
      const errors = [];
      if (!this.$v.repairType.$dirty) return errors;
      !this.$v.repairType.required && errors.push("Repair type is required");
      return errors;
    },
  },
  methods: {
    fillRepairTypeErrors: function () {
      let errors = "";
      if (!this.$v.repairType.$dirty) return errors;
      if (!this.$v.repairType.required)
        return (errors = "Repair type is required");
      return errors;
    },
    fillErrorList: function () {
      this.errorList = [];
      if (this.fillRepairTypeErrors() !== "")
        this.errorList.push({ id: 1, name: this.fillRepairTypeErrors() });
      this.emptyErrorFlag = true;
      this.error500Flag = false;
    },
    post: function () {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.dialog = true;
        this.fillErrorList();
      } else {
        console.log(" a teraz tu tu tu");
        this.repairTypeList.push(this.repairType);
        this.$http
          .post("https://localhost:44308/api/RepairType/addRepairType", {
            repairTypeNames: this.repairTypeList,
          })
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
};
</script>