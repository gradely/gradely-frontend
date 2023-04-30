<template>
  <div class="create-chlld-class">
    <onboarding-nav-layout>
      <template slot="content">
        <div>
          <!-- IMAGE TOP  -->
          <div class="onboarding-image-top mgt-30">
            <img
              v-lazy="mxStaticImg('ClassSetupAvatar.png', 'onboarding')"
              alt=""
            />
          </div>

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
            What class are you?
          </div>

          <!-- DESCRIPTION  -->
          <div class="onboarding-description color-ash mx-auto text-center">
            Select your class to be able to assess videos, practice and other
            resources tailored to you.
          </div>

          <!-- SCHOOL NAME  -->
          <div class="onboarding-form-wrapper mgt-45 mx-auto">
            <div class="form-group compact-row w-100">
              <label for="className" class="label-compact label-sm"
                >Select Class
              </label>
              <select class="form-control" id="className" v-model="child_class">
                <option disabled selected value="">Select class</option>
                <option
                  v-for="(level, index) in getClassList"
                  :key="index"
                  :value="level.id"
                >
                  {{ level.description }}
                </option>
              </select>
            </div>

            <!-- CONTINUE BUTTON  -->
            <button
              class="btn btn-accent mgb-10"
              :disabled="!child_class"
              ref="cont"
            >
              Continue
            </button>
          </div>
        </div>
      </template>
    </onboarding-nav-layout>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import onboardingNavLayout from "@/modules/onboarding/components/global-comps/onboarding-nav-layout";

export default {
  name: "createChildClass",

  metaInfo: {
    title: "Create Child Class",
  },

  components: {
    onboardingNavLayout,
  },

  computed: {
    ...mapGetters({ getClassList: "general/getClassList" }),
  },

  async mounted() {
    if (!this.getClassList.length) await this.getGlobalClassList();
  },

  data() {
    return {
      child_class: "",
    };
  },

  methods: {
    ...mapActions({
      getGlobalClassList: "general/getGlobalClassList",
    }),
  },
};
</script>

<style lang="scss" scoped>
.onboarding-image-top {
  img {
    @include breakpoint-down(sm) {
      @include square-shape(120);
    }

    @include breakpoint-down(xs) {
      @include square-shape(90);
    }
  }
}
</style>
