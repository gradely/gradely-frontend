<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-small' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">
          MODIFY SUBSCRIPTION
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body mgt--5">
        <child-info-modal-card
          :child="{
            image: student.student_image,
            fullname: getStudentFullname,
            class_name: student.class_name,
          }"
        />

        <div class="subscription-list">
          <!-- DISABLE ACCOUNT  -->
          <label
            for="disable"
            class="sub-item"
            :class="form.sub_type === 'disable' ? 'border-brand-accent' : null"
          >
            <input
              type="radio"
              value="disable"
              v-model="form.sub_type"
              id="disable"
            />

            <!-- INFO  -->
            <div class="info">
              <div class="title-text">Disable Account</div>
              <div class="description">
                Revoke the student’s access to all schoolwork on Gradely.
              </div>
            </div>
          </label>

          <!-- BASIC LMS  -->
          <label
            for="basic"
            class="sub-item"
            :class="form.sub_type === 'basic' ? 'border-brand-accent' : null"
          >
            <input
              type="radio"
              value="basic"
              v-model="form.sub_type"
              id="basic"
            />

            <!-- INFO  -->
            <div class="info">
              <div class="title-text">
                Basic LMS <span class="font-weight-400">(LMS Only)</span>
              </div>
              <div class="description">
                Gives access to schools works like Homework, Lesson Notes, Live
                Classes and Class Feed.
              </div>
            </div>
          </label>

          <!-- PREMIUM LMS  -->
          <label
            for="premium"
            class="sub-item"
            :class="form.sub_type === 'premium' ? 'border-brand-accent' : null"
          >
            <input
              type="radio"
              value="premium"
              v-model="form.sub_type"
              id="premium"
            />

            <!-- INFO  -->
            <div class="info">
              <div class="title-text">
                Premium LMS <span class="font-weight-400">(LMS + Content)</span>
              </div>
              <div class="description">
                Access to all of Gradely’s CatchUp! library, including
                everything in the Basic (LMS) plan.
              </div>
            </div>
          </label>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-end">
        <button
          class="btn no-shadow bg-transparent brand-navy modal-btn"
          @click="$emit('closeTriggered')"
        >
          Cancel
        </button>

        <button
          class="btn btn-accent mgl-10 modal-btn"
          @click="updatesubscriptionStatus"
          ref="updateSub"
        >
          Save Changes
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";
import childInfoModalCard from "@/modules/dashboard/modals/child-info-modal-card";
import { mapActions } from "vuex";

export default {
  name: "modifySubscriptionModal",

  components: {
    modalCover,
    childInfoModalCard,
  },

  computed: {
    getStudentFullname() {
      return this.student.student_firstname
        ? `${this.student.student_firstname} ${this.student.student_lastname}`
        : false;
    },

    subscriptionStatus() {
      return {
        student_id: [Number(this.student.id)],
        status: this.form.sub_type,
      };
    },
  },

  props: {
    student: Object,
    default: () => ({
      id: 1,
      student_image: "",
      student_firstname: "Femi",
      student_lastname: "Ibiwoye",
      class_name: "Year 1 - Gold",
      subscription_status: null,
    }),
  },

  data() {
    return {
      form: {
        sub_type: this.student.subscription_status,
      },
    };
  },

  methods: {
    ...mapActions({
      updateStudentSubscription: "dbStudent/updateStudentSubscription",
    }),

    updatesubscriptionStatus() {
      this.handleClick("updateSub", "saving...");

      this.updateStudentSubscription(this.subscriptionStatus)
        .then((response) => {
          this.handleClick("updateSub", "Save Changes", false);

          response.code === 200
            ? this.pushAlert("Subscription updated", "success")
            : this.pushAlert("Subscription update failed", "warning");

          this.$bus.$emit("reloadSchoolStudents");
          setTimeout(() => this.$emit("closeTriggered"), 2000);
        })
        .catch(() => {
          this.handleClick("updateSub", "Save Changes", false);
          this.pushAlert("Error updating subscription", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.subscription-list {
  .sub-item {
    @include flex-row-start-nowrap;
    @include transition(0.4s);
    align-items: flex-start;
    border: toRem(1) solid $border-grey;
    padding: toRem(14) toRem(15);
    border-radius: toRem(5);
    margin-bottom: toRem(6);
    cursor: pointer;

    @include breakpoint-down(xs) {
      padding: toRem(12);
    }

    @include breakpoint-custom-down(380) {
      padding: toRem(10);
    }

    &:hover {
      border: toRem(1) solid $brand-accent;
    }

    input {
      position: relative;
      top: toRem(1);
      margin-right: toRem(15);

      @include breakpoint-down(xs) {
        margin-right: toRem(10);
      }
    }

    .title-text {
      @include font-height(12.5, 17);
      margin-bottom: toRem(3);
      color: $color-text;
      font-weight: 600;

      @include breakpoint-down(xs) {
        @include font-height(11.5, 17);
        margin-bottom: toRem(6);
        font-weight: 500;
      }
    }

    .description {
      @include font-height(11.25, 19);
      letter-spacing: 0.02em;
      color: $color-ash;

      @include breakpoint-down(xs) {
        @include font-height(10.5, 17);
      }
    }
  }
}

.modal-cover-footer {
  position: relative;
  top: toRem(-5);
  margin-bottom: toRem(7);
}
</style>
