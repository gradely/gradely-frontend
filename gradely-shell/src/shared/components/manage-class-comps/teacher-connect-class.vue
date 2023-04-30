<template>
  <div class="teacher-connect-class smooth-transition">
    <div class="form-row mgb-0 pdb-0">
      <div class="form-group compact-row w-100">
        <label for="classCode" class="label-compact label-sm">Class Code</label>
        <input
          type="text"
          id="classCode"
          class="form-control"
          placeholder="e.g. GRD1232-YEC"
          required
          v-model="class_code"
        />

        <!-- VERIFY BUTTON  -->
        <div class="verify-btn btn-link index-1 link-no-underline">
          <div
            @click="verifyClass"
            v-if="!searching"
            :class="class_code ? 'brand-accent' : 'border-grey-dark'"
          >
            VERIFY
          </div>
          <div
            v-if="searching"
            class="icon icon-dotted-spinner animate gfont-15"
          ></div>
        </div>
      </div>

      <!-- SCHOOL DISPLAY BLOCK  -->
      <div
        class="school-display-block rounded-5 border-border-grey mgt-20 mgb-20"
        v-if="class_info"
      >
        <!-- TITLE TEXT  -->
        <div class="title-text font-weight-700 brand-navy">
          <span class="text-capitalize">{{ class_info.class_name }} </span>
          <span class="text-uppercase">({{ class_info.abbreviation }})</span>
        </div>

        <!-- META TEXT  -->
        <div class="meta-text color-grey-dark">
          @{{ class_info.school.name }}
        </div>
      </div>

      <!-- BUTTON ROW -->
      <div class="bottom-row w-100">
        <button
          class="btn btn-accent btn-block mgb-30 mx-auto"
          :disabled="!class_info"
          @click="addToClass"
          ref="connectBtn"
        >
          Continue
        </button>

        <div class="info-text text-center mgb-34">
          School not registered?
          <span
            class="btn-link font-weight-600"
            @click="$bus.$emit('showInviteModal')"
            >Invite your school</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "teacherConectClass",

  data() {
    return {
      class_code: "",
      class_info: null,
      searching: false,
    };
  },

  methods: {
    ...mapActions({
      verifyClassCode: "onboarding/verifyClassCode",
      addTeacherToSchool: "onboarding/addTeacherToSchool",
      updateTeacherClassList: "general/updateTeacherClassList",
    }),

    verifyClass() {
      this.searching = true;

      this.verifyClassCode(this.class_code)
        .then((response) => {
          this.searching = false;

          if (response.code === 200) this.class_info = response.data;
          else this.pushAlert("Invalid class code", "warning");
        })
        .catch(() => {
          this.searching = false;
          this.pushAlert("Failed! Try again", "error");
        });
    },

    addToClass() {
      this.handleClick("connectBtn", "connecting...");

      this.addTeacherToSchool(this.class_info?.class_code)
        .then((response) => {
          this.handleClick("connectBtn", "Connect Class", false);

          if (response.code === 200) {
            this.pushAlert(
              `Connected to ${this.class_info.school.name}`,
              "success"
            );
            this.updateTeacherClassList(response.data);

            this.$bus.$emit("showSubjectModal", {
              class_id: Number(response.data.class_id),
              global_class_id: Number(response.data.global_class_id),
            });

            setTimeout(() => {
              this.$emit("closeTriggered");
            }, 1300);
          } else {
            this.pushAlert(response.message, "warning");
          }
        })
        .catch(() => {
          this.handleClick("connectBtn", "Connect Class", false);
          this.pushAlert("An error occured while connecting to class", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-row {
  .verify-btn {
    @include center-y;
    font-size: toRem(12);
    letter-spacing: 0.045em;
    right: toRem(13);
    font-weight: 700;

    @include breakpoint-down(xs) {
      font-size: toRem(10.5);
    }
  }

  .invite-section {
    @include flex-row-start-nowrap;

    .avatar {
      @include square-shape(26);

      .icon {
        @include center-placement;
        font-size: toRem(14);
      }
    }

    .text {
      @include font-height(12.85, 18);

      @include breakpoint-down(xs) {
        @include font-height(12.5, 17);
      }
    }
  }

  .school-display-block {
    margin-top: toRem(-10) !important;
    padding: toRem(12) toRem(15);

    @include breakpoint-down(xs) {
      padding: toRem(12);
    }

    .title-text {
      @include font-height(13, 20);
      margin-bottom: toRem(2);
    }

    .meta-text {
      @include font-height(12.25, 17);
      margin-bottom: toRem(8);

      @include breakpoint-down(sm) {
        @include font-height(12, 17);
      }
    }
  }

  .bottom-row {
    .btn {
      width: 80%;
      padding: toRem(16.5);
    }

    .info-text {
      @include font-height(13.5, 18);

      @include breakpoint-down(lg) {
        @include font-height(12, 17);
      }
    }
  }
}
</style>