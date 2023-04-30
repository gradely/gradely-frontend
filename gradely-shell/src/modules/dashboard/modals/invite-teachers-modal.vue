<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-small' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">Invite Teachers</div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body mgt--5">
        <!-- TOP AREA  -->
        <div class="top-area">
          <label class="control-label color-text"
            >Invite teachers with
            <span class="font-weight-400">(Email or Phone) </span>
            <span
              class="
                icon-help-circle
                brand-inverse
                gfont-16
                position-relative
                pointer
              "
              style="top: 3px; left: 4px"
              title="Press the 'SPACE BAR' after contact entry"
            ></span>
          </label>

          <input-entry-card
            @close="$emit('closeTriggered')"
            type="teacher"
            :school_id="getSchoolID"
            :show_invitation_btn="!!$route.params.id"
            @updateList="teacher_selections = $event"
          />
        </div>

        <!-- CLASS SELECTION AREA -->
        <template v-if="!$route.params.id">
          <div class="class-selection-area">
            <label class="control-label color-text mgb-5"
              >Assign to class
            </label>

            <div class="class-selection rounded-5 border-border-grey mgb-10">
              <!-- CLASS ROW -->
              <div class="class-row" v-if="getClassSelections.length">
                <div
                  class="class-card"
                  v-for="(item, index) in getClassSelections"
                  :key="index"
                  @click="removeClass(index)"
                >
                  <div class="text">{{ item.class_name }}</div>

                  <div class="icon icon-close"></div>
                </div>
              </div>

              <!-- SELECT CLASS -->
              <div class="select-class pointer" @click="$emit('toggleClass')">
                <div class="icon icon-plus brand-inverse mgr-10"></div>
                <div class="text color-grey-dark smooth-transition">
                  Assign to
                  {{ getClassSelections.length ? "another" : "a" }} class
                </div>
              </div>
            </div>

            <div
              class="
                selection-info
                mgt-10
                rounded-10
                color-white-bg
                smooth-transition
              "
              v-if="showMultipleSelectionAlert"
            >
              <div class="icon icon-info brand-inverse mgr-12"></div>
              <div class="text color-text">
                Are you sure you want to add these teachers to all these
                classes?
              </div>
            </div>
          </div>

          <!-- SEND INVITATION OUTSIDE CLASS -->
          <div
            class="btn-row d-flex justify-content-end align-items-center mgt-25"
          >
            <button
              class="btn transparent-bg no-shadow color-text mgr-10"
              @click="$emit('closeTriggered')"
            >
              Cancel
            </button>

            <button
              class="btn btn-accent mgl-10"
              ref="invite"
              @click="sendInvitation"
            >
              Send Invitation
            </button>
          </div>
        </template>

        <!-- BOTTOM AREA  -->
        <div class="bottom-area" v-if="$route.params.id">
          <!-- INFO LINK  -->
          <div class="info-link color-text mgb-15" v-if="false">
            Your teachers can also join your class using the class code. Learn
            more about the
            <a href="" class="btn-link font-weight-600"
              >class code and it’s uses here.</a
            >
          </div>

          <!-- CLASS CODE ROW  -->
          <div
            class="class-code-row color-white-bg rounded-10"
            v-if="getSelectedClass.class_code"
          >
            <div class="left">
              <div class="top-text color-text">Class Code</div>
              <!-- CODE  -->
              <div
                class="bottom-text text-uppercase font-weight-600 brand-navy"
              >
                {{ getSelectedClass.class_code }}
              </div>
            </div>

            <input
              type="text"
              ref="classCode"
              :value="getSelectedClass.class_code"
              class="position-absolute index--9"
              style="opacity: 0"
            />

            <div class="right">
              <div
                class="copy-link pointer rounded-10 smooth-transition"
                @click="copyClassCode"
                title="Copy class code"
              >
                <div class="icon icon-copy brand-accent"></div>
                <div class="text color-text font-weight-600">COPY</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-end"></div>
    </template>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="true">
        <class-selection-modal />
      </transition>
    </portal>
  </modal-cover>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";
import inputEntryCard from "@/shared/components/input-entry-card";

export default {
  name: "addTeachersModal",

  components: {
    modalCover,
    inputEntryCard,
    classSelectionModal: () =>
      import("@/modules/dashboard/modals/class-selection-modal"),
  },

  props: {
    school_id: {
      type: [String, Number],
      default: "",
    },
  },

  computed: {
    ...mapGetters({
      getSelectedClass: "general/getSelectedClass",
      getClassSelections: "dbHome/getClassSelections",
      getTour: "general/getTour",
    }),

    showMultipleSelectionAlert() {
      return this.teacher_selections.length > 1 &&
        this.getClassSelections.length > 1
        ? true
        : false;
    },

    getSchoolID() {
      return this.school_id || this.getAuthUser.school_id;
    },
  },

  data: () => ({
    teacher_selections: [],
    class_selections: [],
  }),

  beforeDestroy() {
    this.updateClassSelections([]);
  },

  methods: {
    ...mapActions({
      updateClassSelections: "dbHome/updateClassSelections",
      updateTour: "general/updateTour",
      inviteNewUser: "invites/inviteNewUser",
    }),

    copyClassCode() {
      let code_input = this.$refs.classCode;
      code_input.select();
      code_input.setSelectionRange(0, 99999); /*For mobile devices*/
      document.execCommand("copy");

      this.$bus.$emit("show_response_alert", {
        message: "Class code copied successfully",
        type: "success",
      });
    },

    removeClass(index) {
      setTimeout(() => {
        this.getClassSelections.splice(index, 1);
        this.updateClassSelections(this.getClassSelections);
      }, 300);
    },

    isEmail(email) {
      return this.$validate.checkEmail(email) === null;
    },

    sendInvitation() {
      this.handleClick("invite", "Inviting..");

      let contacts = this.teacher_selections.map((invite) => {
        return this.isEmail(invite)
          ? {
              email: invite,
            }
          : {
              phone_number: invite,
            };
      });

      let invitation = {
        type: "teacher",
        contacts,
        school_id: this.getAuthUser.school_id,
      };

      invitation.class_id = this.getClassSelections.map((item) => +item.id);

      // console.log(invitation);

      if (!invitation?.contacts?.length) {
        this.handleClick("invite", "Send Invitation", false);
        this.pushAlert("No teacher contact has been validated", "warning");
      } else if (!invitation?.class_id?.length) {
        this.handleClick("invite", "Send Invitation", false);
        this.pushAlert("No teacher class has been selected", "warning");
      } else {
        this.inviteNewUser(invitation)
          .then((response) => {
            this.handleClick("invite", "Send Invitation", false);

            if (response?.status === 409) {
              this.pushAlert(response?.data?.message, "warning");
            } else {
              if (response?.code === 200) {
                this.pushAlert("Invitation sent successfully", "success");
                this.checkOngoingSchoolTour();

                // UPDATE SCHOOL CHECKLIST
                this.$bus.$emit("reload_checklist");
                this.$emit("closeTriggered");
              } else {
                response.data.message === "class id not provided"
                  ? this.pushAlert("Send an invitation from a class", "warning")
                  : this.pushAlert("Failed to send invite", "warning");
              }
            }
          })
          .catch(() => {
            this.handleClick("invite", "Send Invitation", false);
            this.pushAlert(
              "An error occured while sending invitation!",
              "error"
            );
          });
      }
    },

    checkOngoingSchoolTour() {
      if (
        this.getTour.step_progress === "ongoing" &&
        this.getAuthType === "school"
      )
        setTimeout(() => this.updateTour("ongoing"), 200);
    },
  },
};
</script>

<style lang="scss" scoped>
.control-label {
  @include font-height(12, 16);
  margin-bottom: toRem(6);
  font-weight: 600;

  span {
    @include font-height(11, 16);
  }
}

.class-selection-area {
  margin-top: toRem(-15);

  .class-selection {
    padding: toRem(10);

    .class-row {
      @include flex-row-start-wrap;
      margin-bottom: toRem(10);

      .class-card {
        border-radius: toRem(20);
        background: $brand-inverse-light;
        padding: toRem(6.5) toRem(12);
        margin: toRem(2.5) toRem(2.5);
        @include flex-row-between-nowrap;
        @include transition(0.4s);
        cursor: pointer;

        &:hover {
          background: $brand-red-light;
        }

        .text {
          color: $color-text;
          margin-right: toRem(8);
          font-size: toRem(11.25);
        }

        .icon {
          color: $color-text;
          font-size: toRem(10);
        }
      }
    }

    .select-class {
      width: max-content;
      @include flex-row-start-nowrap;

      .icon {
        font-size: toRem(20);
      }

      .text {
        font-size: toRem(12.35);
      }

      &:hover {
        .text {
          color: $brand-inverse !important;
        }
      }
    }
  }

  .selection-info {
    @include flex-row-start-nowrap;
    padding: toRem(12);

    .icon {
      font-size: toRem(18);
    }

    .text {
      font-size: toRem(11.65);
    }
  }
}

.btn-row {
  margin-bottom: toRem(-5);

  .btn {
    font-size: toRem(10.75);
  }
}

.bottom-area {
  .info-link {
    @include font-height(11.5, 19);
  }

  .class-code-row {
    @include flex-row-between-nowrap;
    padding: toRem(10) toRem(15);

    .top-text {
      @include font-height(10.5, 15);
      margin-bottom: toRem(4);
    }

    .bottom-text {
      @include font-height(11.25, 18);
    }

    .copy-link {
      @include flex-row-end-nowrap;
      width: max-content;
      padding: toRem(7) toRem(9);

      &:hover {
        background: darken($color-white, 7%);
      }

      .icon {
        margin-right: toRem(6);
        font-size: toRem(13.5);
      }

      .text {
        font-size: toRem(11);
      }
    }
  }
}
</style>
