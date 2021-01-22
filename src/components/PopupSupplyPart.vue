<template>
  <v-row justify="start">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="green accent-4" dark v-bind="attrs" v-on="on">
          <v-icon dark> mdi-hammer-wrench </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Supply {{ item.name }}</span>
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
                  v-model="quantity"
                  :error-messages="quantityErrors"
                  label="Quantity"
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
            Supply
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
    quantity: { required, minValue: minValue(1) },
  },
  props: ["item"],
  data() {
    return {
      dialog: false,
      quantity: 0,
      emptyErrorFlag: false,
      errorList: [],
    };
  },
  computed: {
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
    fillErrorList: function () {
      this.errorList = [];
      if (this.fillQuantityErrors() !== "")
        this.errorList.push({ id: 1, name: this.fillQuantityErrors() });
      this.emptyErrorFlag = true;
    },
    put: function () {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.dialog = true;
      }
      if (this.fillQuantityErrors() !== "") {
        this.fillErrorList();
      } else {
        this.$http
          .put("https://localhost:44308/api/Part/supplyPart", {
            partId: this.item.id,
            quantity: this.quantity,
          })
          .then(
            function () {
              location.reload();
            },
            function (error) {
              console.log(error);
              this.dialog = true;
              this.emptyErrorFlag = false;
            }
          );
      }
    },
  },
};
</script>