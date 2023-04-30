<template>
  <modal-cover @closeModal="$emit('closeTriggered')" :show_close_btn="true">
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title">
          INVITE SCHOOL
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body pdb-0">
        <!-- INTRO TEXT  -->
        <div class="intro-text color-grey-dark mgb-25">
          Invite your school to access your school classes. You will be assigned
          to a class as soon as your school joins.
        </div>

        <!-- FORM AREA -->
        <div class="form-area mgt-30">
          <!-- SCHOOL NAME  -->
          <div class="form-group compact-row w-100">
            <label for="schoolName" class="label-compact label-sm">
              School Name
            </label>
            <input
              type="text"
              class="form-control"
              id="schoolName"
              required
              placeholder="Enter the name of your school"
              v-model="school_name"
            />
          </div>

          <!-- EMAIL ADDRESSE  -->
          <div class="form-group compact-row w-100">
            <label for="schoolEmail" class="label-compact label-sm">
              Contact Email Address
            </label>
            <input
              type="email"
              class="form-control"
              id="schoolEmail"
              required
              placeholder="Enter school email address"
              v-model="school_email"
            />
          </div>

          <!-- PHONE NUMBER  -->
          <div class="form-group compact-row w-100">
            <label for="schoolPhone" class="label-compact label-sm">
              Contact Phone Number
            </label>
            <input
              type="number"
              class="form-control"
              id="schoolPhone"
              required
              placeholder="Enter school phone number"
              v-model="school_phone"
            />
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-end pdt-0 mgb-10">
        <button
          class="btn transparent-bg no-shadow color-text mgr-5"
          @click="$emit('closeTriggered')"
        >
          Cancel
        </button>

        <button class="btn btn-accent mgl-5" ref="invite" @click="inviteSchool">
          Invite School
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "inviteSchoolModal",

  components: {
    modalCover,
  },

  computed: {
    getInvitationForm() {
      return {
        type: "school",
        contacts: [
          {
            name: this.school_name,
            email: this.school_email,
            phone_number: this.school_phone,
          },
        ],
      };
    },
  },

  data() {
    return {
      school_name: "",
      school_email: "",
      school_phone: "",
    };
  },

  methods: {
    ...mapActions({ inviteNewUser: "invites/inviteNewUser" }),

    inviteSchool() {
      this.handleClick("invite", "Inviting..");

      this.inviteNewUser(this.getInvitationForm)
        .then((response) => {
          this.handleClick("invite", "invite school", false);
          if (response.code === 200) {
            this.pushAlert("Invite sent successfully", "success");

            setTimeout(() => {
              this.$emit("closeTriggered");
            }, 1200);
          } else this.pushAlert("Failed to invite school", "warning");
        })
        .catch(() => {
          this.handleClick("invite", "invite school", false);
          this.pushAlert("Error sending invite", "error");
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
    @include font-height(13.5, 22);

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
      @include font-height(12.75, 19);
      font-weight: 700;
      color: $color-ash;
      text-transform: uppercase;

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
