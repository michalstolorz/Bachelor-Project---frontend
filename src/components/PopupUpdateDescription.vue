<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="green accent-4" dark v-bind="attrs" v-on="on">
          Change description
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Change description</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-row
                v-show="emptyErrorFlag"
                v-for="error in errorList"
                :key="error.id"
                style="color: red; font-size: 100%; font-weight: 1500"
              >
                {{ error.name }}
              </v-row>
              <v-col cols="12">
                <v-text-field
                  label="Description"
                  v-model="description"
                  :error-messages="descriptionErrors"
                  value="description"
                  required
                  @input="$v.description.$touch()"
                  @blur="$v.description.$touch()"
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
            Save
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
    description: { required },
  },
  data() {
    return {
      dialog: false,
      description: "",
      id: this.$route.params.id,
      emptyErrorFlag: false,
      errorList: [],
    };
  },
  computed: {
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.required && errors.push("Description is required");
      return errors;
    },
  },
  methods: {
    fillDescriptionErrors: function () {
      let errors = "";
      if (!this.$v.description.$dirty) return errors;
      if (!this.$v.description.required)
        return (errors = "Description is required");
      return errors;
    },
    fillErrorList: function () {
      this.errorList = [];
      if (this.fillDescriptionErrors() !== "")
        this.errorList.push({ id: 1, name: this.fillDescriptionErrors() });
      this.emptyErrorFlag = true;
    },
    put: function () {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.dialog = true;
        this.fillErrorList();
      } else {
        this.$http
          .put("https://localhost:44308/api/Repair/updateRepairDescription", {
            repairId: this.id,
            newDescription: this.description,
          })
          .then(function () {
            location.reload();
          });
      }
    },
  },
  created() {
    this.$http
      .get("https://localhost:44308/api/Repair/getRepair/" + this.id)
      .then(function (data) {
        this.description = data.body.description;
      });
  },
};
</script>