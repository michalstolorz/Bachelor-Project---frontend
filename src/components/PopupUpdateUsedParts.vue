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
                  {{ this.error500Message }}
                </v-row>
                <v-select
                  v-model="choosenPartName"
                  :items="selectPartsName"
                  :error-messages="choosenPartNameErrors"
                  label="Part Name"
                  required
                  @input="$v.choosenPartName.$touch()"
                  @blur="$v.choosenPartName.$touch()"
                ></v-select>
                <v-text-field
                  v-model="quantity"
                  label="Quantity"
                  :error-messages="quantityErrors"
                  required
                  @input="$v.quantity.$touch()"
                  @blur="$v.quantity.$touch()"
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
            Add
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
    choosenPartName: { required },
    quantity: { required, minValue: minValue(1) },
  },

  data() {
    return {
      repairId: this.$route.params.id,
      dialog: false,
      partNames: [],
      choosenPartName: "",
      quantity: 0,
      error500Flag: false,
      error500Message: "",
      emptyErrorFlag: false,
      errorList: [],
    };
  },
  computed: {
    selectPartsName() {
      return this.partNames.map((partName) => ({
        text: partName.name,
        value: partName.id,
      }));
    },
    choosenPartNameErrors() {
      const errors = [];
      if (!this.$v.choosenPartName.$dirty) return errors;
      !this.$v.choosenPartName.required && errors.push("Part name is required");
      return errors;
    },
    quantityErrors() {
      const errors = [];
      if (!this.$v.quantity.$dirty) return errors;
      !this.$v.quantity.required && errors.push("Quantity is required");
      !this.$v.quantity.minValue &&
        errors.push("Quantity can not be 0 or less");
      return errors;
    },
  },
  methods: {
    fillQuantityErrors: function () {
      let errors = "";
      if (!this.$v.quantity.$dirty) return errors;
      if (!this.$v.quantity.required) return (errors = "Quantity is required");
      if (!this.$v.quantity.minValue)
        return (errors = "Quantity can not be 0 or less");
      return errors;
    },
    fillChoosenPartNameErrors: function () {
      let errors = "";
      if (!this.$v.choosenPartName.$dirty) return errors;
      if (!this.$v.choosenPartName.required)
        return (errors = "Part name is required");
      return errors;
    },
    fillErrorList: function () {
      this.errorList = [];
      if (this.fillChoosenPartNameErrors() !== "")
        this.errorList.push({ id: 1, name: this.fillChoosenPartNameErrors() });
      if (this.fillQuantityErrors() !== "")
        this.errorList.push({ id: 2, name: this.fillQuantityErrors() });
      this.emptyErrorFlag = true;
      this.error500Flag = false;
    },
    put: function () {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.dialog = true;
        this.fillErrorList();
      } else {
        this.$http
          .put("https://localhost:44308/api/UsedPart/updateRepairUsedParts", {
            repairId: this.repairId,
            partId: this.choosenPartName,
            usedPartQuantity: this.quantity,
          })
          .then(
            function () {
              location.reload();
            },
            function (error) {
              console.log(error);
              let spaceIndex = error.bodyText.indexOf(" ");
              if (error.bodyText[spaceIndex + 1] === "N")
                this.error500Message = "Not enought parts in warehouse";
              else if (error.bodyText[spaceIndex + 1] === "P")
                this.error500Message = "Part already assign to your repair";
              this.dialog = true;
              this.error500Flag = true;
              this.emptyErrorFlag = false;
            }
          );
      }
    },
  },
  created() {
    this.$http.get("https://localhost:44308/api/Part/getParts").then((data) => {
      this.partNames = data.body;
    });
  },
};
</script>