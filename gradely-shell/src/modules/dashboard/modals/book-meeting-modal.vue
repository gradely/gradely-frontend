<template>
  <modal-cover @closeModal="$emit('closeTriggered')" :show_close_btn="true">
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">
          Request a call or Meeting
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body" style="margin-top: -10px">
        <!-- FORM AREA -->
        <div class="form-area mgt-20">
          <!-- SELECTION -->
          <div class="selection-row row mgb-20">
            <div class="col-6">
              <!-- PHONE  -->
              <div class="form-column">
                <label for="datetime" class="control-label"
                  >Preferred Day and Time</label
                >
                <input
                  type="datetime-local"
                  class="form-control"
                  id="datetime"
                  required
                  v-model="form.demo_date"
                />
              </div>
            </div>

            <div class="col-6">
              <!-- PHONE  -->
              <div class="form-column">
                <label for="phone" class="control-label">Phone Number</label>
                <input
                  type="number"
                  class="form-control"
                  id="phone"
                  required
                  placeholder="Your phone number"
                  v-model="form.phone"
                />
              </div>
            </div>
          </div>

          <!-- PURPOSE OF MEETING -->
          <div class="form-column">
            <label for="helpText" class="control-label"
              >Purpose of Meeting</label
            >
            <select
              class="form-control"
              id="helpText"
              required
              v-model="form.title"
            >
              <option selected value="" disabled>Select meeting purpose</option>
              <option selected value="Teacher training">
                Teacher training
              </option>
              <option value="School onboarding">
                I would like support with onboarding of my school
              </option>
              <option value="Speak with sales team">
                I would like to speak with Sales Team
              </option>
              <option value="Send a proposal">
                I would like a proposal sent to us
              </option>
            </select>
          </div>

          <!-- ADDITION  -->
          <div class="form-column">
            <label for="notes" class="control-label">Additional Notes</label>
            <textarea
              id="notes"
              class="form-control"
              rows="4"
              placeholder="Any information you think we may need to help you"
              required
              v-model="form.description"
            ></textarea>
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-center mgb-10">
        <button
          class="btn transparent-bg no-shadow color-text mgr-10"
          @click="$emit('closeTriggered')"
        >
          Cancel
        </button>

        <button
          class="btn btn-accent mgl-10"
          ref="submitBtn"
          @click="bookMeeting"
          :disabled="isDisabled"
        >
          Submit
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "bookMeetingModal",

  components: {
    modalCover,
  },

  computed: {
    isDisabled() {
      return this.form.description &&
        this.form.title &&
        this.form.phone &&
        this.form.demo_date
        ? false
        : true;
    },
  },

  data: () => ({
    form: {
      description: "",
      title: "",
      phone: "",
      demo_date: "",
    },
  }),

  methods: {
    ...mapActions({ requestAMeeting: "dbHome/requestAMeeting" }),

    bookMeeting() {
      this.handleClick("submitBtn", "Booking..");

      this.requestAMeeting(this.form)
        .then((response) => {
          this.handleClick("submitBtn", "Submit", false);

          if (response.code === 200) {
            this.pushAlert("Meeting booked successfully", "success");
            this.$emit("closeTriggered");
          } else {
            this.pushAlert("Booking a meeting failed!", "error");
          }
        })
        .catch(() => {
          this.pushAlert("Booking a meeting failed!", "error");
          this.handleClick("submitBtn", "Submit", false);
        });
    },
  },
};
</script>

<style lang="scss">
.modal-cover-body {
  @include breakpoint-down(xs) {
    padding: toRem(10) toRem(12);
  }

  .intro-text {
    @include font-height(14, 23.5);

    @include breakpoint-down(sm) {
      @include font-height(13, 21);
    }

    @include breakpoint-down(xs) {
      @include font-height(12.25, 19);
    }
  }

  .form-column {
    margin-bottom: toRem(20);

    @include breakpoint-down(sm) {
      margin-bottom: toRem(15);
    }

    &:last-of-type {
      margin-bottom: 0;
    }

    .control-label {
      @include font-height(12.65, 19);
      font-weight: 700;
      color: $color-ash;
      text-transform: capitalize;

      @include breakpoint-down(sm) {
        font-size: toRem(11.25) !important;
        line-height: toRem(15) !important;
      }

      @include breakpoint-down(xs) {
        font-size: toRem(11) !important;
      }
    }
  }
}
</style>
