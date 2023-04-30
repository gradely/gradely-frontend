<template>
  <div class="create-class">
    <onboarding-nav-layout>
      <template slot="content">
        <div>
          <!-- TITLE TEXT  -->
          <div
            class="
              onboarding-title-text
              text-center
              font-weight-700
              brand-navy
              mgt-18
              mgb-10
            "
          >
            Create a Class
          </div>

          <!-- DESCRIPTION  -->
          <div class="onboarding-description color-ash mx-auto text-center">
            Create a class you will like to teach with Gradely. You can create
            more classes later.
          </div>

          <!-- SCHOOL NAME  -->
          <div class="onboarding-form-wrapper mgt-45 mx-auto">
            <div class="form-group compact-row w-100">
              <label for="className" class="label-compact label-sm"
                >Class Name
              </label>
              <input
                type="text"
                id="className"
                class="form-control"
                placeholder="Name your class"
                required
                v-model="form.class_name"
              />
            </div>

            <!-- ACADEMIC LEVEL -->
            <div class="form-group compact-row w-100">
              <label for="academicLevel" class="label-compact label-sm"
                >Class Level
              </label>
              <select
                class="form-control"
                id="academicLevel"
                v-model="form.global_class_id"
              >
                <option disabled selected value="">Select class level</option>
                option>
                <option
                  :value="item.id"
                  v-for="(item, index) in class_levels"
                  :key="index"
                >
                  {{ item.description }}
                </option>
              </select>
            </div>

            <!-- CONNECT BUTTON  -->
            <button
              class="btn btn-accent mgb-10"
              :disabled="isDisabled"
              @click="createClass"
              ref="createBtn"
            >
              Create Class
            </button>
          </div>
        </div>
      </template>
    </onboarding-nav-layout>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import onboardingNavLayout from "@/modules/onboarding/components/global-comps/onboarding-nav-layout";

export default {
  name: "createClass",

  metaInfo: {
    title: "Create Class",
  },

  components: {
    onboardingNavLayout,
  },

  computed: {
    isDisabled() {
      return this.form.class_name && this.form.global_class_id ? false : true;
    },
  },

  data() {
    return {
      form: {
        global_class_id: "",
        class_name: "",
      },

      class_levels: [],
    };
  },

  mounted() {
    this.fetchGlobalClassList();
  },

  methods: {
    ...mapActions({
      getGlobalClassList: "general/getGlobalClassList",
      teacherCreateClass: "general/teacherCreateClass",
    }),

    fetchGlobalClassList() {
      this.getGlobalClassList().then(
        (response) => (this.class_levels = response?.data ?? [])
      );
    },

    createClass() {
      this.handleClick("createBtn", "creating...");

      this.teacherCreateClass(this.form)
        .then((response) => {
          this.handleClick("createBtn", "Create Class", false);

          if (response.code === 200) {
            this.pushAlert("Class created successfully", "success");

            setTimeout(() => {
              this.$router.push({
                name: "TeacherSelectSubject",
                params: {
                  global_class_id: +this.form.global_class_id,
                  class_id: +response?.data?.id,
                },
              });
            }, 1500);
          } else {
            this.pushAlert(response.message, "warning");
          }
        })
        .catch(() => {
          this.handleClick("createBtn", "Create Class", false);
          this.pushAlert("An error occured while creating class", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
