<template>
  <div>
    <!-- ERROR MESSAGE -->
    <div
      class="error-message brand-tonic gfont-11-5 mgb-5 smooth-transition"
      v-if="user_info.length"
    >
      Press the <span class="font-weight-600">'SPACE BAR'</span> at the end of a
      contact.
    </div>

    <!-- INPUT FIELD -->
    <div
      class="input-entry-card rounded-8 overflow-hidden w-100"
      :class="user_info.length ? 'border-brand-red' : 'border-border-grey '"
    >
      <div class="top w-100">
        <div class="items-list">
          <!-- ITEM -->
          <div
            class="data-item"
            @click="removeFromInviteList(index)"
            v-for="(info, index) in invite_list"
            :key="index"
          >
            <div class="text">{{ info }}</div>
            <div class="icon icon-close"></div>
          </div>

          <input
            type="text"
            v-model="user_info"
            class="form-control"
            @keyup.enter.space="validateUserEntry"
            @keyup="altValidateEntry"
            @input="handleMobileInput"
            placeholder="Enter email or phone number"
          />
        </div>
      </div>

      <div class="bottom color-white-bg w-100" v-if="show_invitation_btn">
        <button
          class="btn btn-accent"
          :disabled="sendDisabled"
          ref="invite"
          @click="sendInvitation(invite_list)"
        >
          Send Invitation
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "inputEntryCard",

  props: {
    type: {
      type: String,
      default: "teacher",
    },

    school_id: {
      type: [String, Number],
      default: "",
    },

    class_id: {
      type: [String, Number],
      default: "",
    },

    child_id: {
      type: [String, Number],
      default: "",
    },

    relationship: {
      type: String,
      default: "",
    },

    show_invitation_btn: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    ...mapGetters({
      getTour: "general/getTour",
    }),

    sendDisabled() {
      return this.invite_list.length && this.user_info.length === 0
        ? false
        : true;
    },
  },

  data: () => ({
    user_info: "",
    invite_list: [],
    user_info: "",
  }),

  methods: {
    ...mapActions({
      inviteNewUser: "invites/inviteNewUser",
      updateTour: "general/updateTour",
    }),

    // VALIDATE ENTRY
    altValidateEntry($event) {
      // this.validateInputField();

      if ($event.key !== ",") return;
      this.user_info = this.user_info.slice(0, -1);
      this.validate();
    },

    // VALIDATE ENTRY
    validateUserEntry() {
      this.user_info = this.user_info.trim();
      this.validate();
    },

    // HANDLE MOBILE ISSUES
    handleMobileInput($event) {
      if (window.innerWidth <= 568) {
        if (
          $event.code === "Enter" ||
          $event.key === "Enter" ||
          $event.key === " " ||
          this.user_info.at(-1) === " "
        ) {
          this.validate();
        }
      }
    },

    validate() {
      if (this.user_info.includes("@")) {
        this.$validate.checkEmail(this.user_info) === null
          ? this.addToInviteList()
          : this.throwErrorAlert("You entered an invalid email");
      } else {
        this.$validate.checkPhoneNumber(this.user_info) === null
          ? this.addToInviteList()
          : this.throwErrorAlert("Not a valid email or phone number entry");
      }
    },

    // ADD TO INVITE LIST
    addToInviteList() {
      this.invite_list.push(this.user_info);
      this.user_info = "";

      if (!this.show_invitation_btn) this.$emit("updateList", this.invite_list);
    },

    validateInputField() {
      let card_border = this.$refs.inputCard;

      console.log(this.$refs.inputCard);

      card_border.classList.add("border-brand-red");

      this.user_info.length
        ? card_border.classList.add("border-brand-red")
        : card_border.classList.remove("border-brand-red");
    },

    // REMOVE FROM INVITE LIST
    removeFromInviteList(index) {
      this.invite_list.splice(index, 1);

      if (!this.show_invitation_btn) this.$emit("updateList", this.invite_list);
    },

    isEmail(email) {
      return this.$validate.checkEmail(email) === null;
    },

    sendInvitation(invites) {
      this.handleClick("invite", "Inviting..");

      let contacts = invites.map((invite) => {
        return this.isEmail(invite)
          ? {
              email: invite,
            }
          : {
              phone_number: invite,
            };
      });

      let invitation = {
        type: this.type,
        contacts,
      };

      this.school_id ? (invitation.school_id = Number(this.school_id)) : null;
      this.$route.params.id ?? this.class_id
        ? (invitation.class_id = Number(this.$route.params.id ?? this.class_id))
        : null;
      this.relationship ? (invitation.relationship = this.relationship) : null;
      this.child_id ? (invitation.student_id = Number(this.child_id)) : null;

      if (invitation.type === "parent") {
        invitation.contacts.map(
          (contact) => (contact.student_id = invitation?.student_id)
        );

        delete invitation.student_id;
      }

      this.inviteNewUser(invitation)
        .then((response) => {
          // console.log("invitation response", response);

          this.handleClick("invite", "Send Invitation", false);

          if (response?.status === 409) {
            this.pushAlert(response?.data?.message, "warning");
          } else {
            if (response?.code === 200) {
              this.pushAlert("Invitation sent successfully", "success");
              this.checkOngoingTour();
              this.$emit("close");
            } else {
              response.data.message === "class id not provided"
                ? this.pushAlert("Send an invitation from a class", "warning")
                : this.pushAlert("Failed to send invite", "warning");
            }
          }
        })
        .catch(() => {
          this.handleClick("invite", "Send Invitation", false);
          this.pushAlert("An error occured while sending invitation!", "error");
        });
    },

    throwErrorAlert(message) {
      this.$bus.$emit("show_response_alert", {
        message: `${message}`,
        type: "error",
      });
    },

    checkOngoingTour() {
      if (
        this.getTour.step_progress === "ongoing" &&
        this.getAuthType === "teacher"
      ) {
        this.updateTour("ongoing");

        setTimeout(
          () =>
            this.$router.push(
              `${this.$route.path}?tour=${this.$string.encodeString(3)}`
            ),
          200
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.input-entry-card {
  margin-bottom: toRem(30);

  @include breakpoint-down(xs) {
    margin-bottom: toRem(15);
  }

  .top {
    min-height: toRem(90);
    position: relative;
    padding: toRem(5);
    height: auto;

    .items-list {
      @include flex-row-start-wrap;
      margin-bottom: toRem(38);
      height: auto;

      input {
        flex: 1;
        padding: toRem(4) toRem(6);
        min-height: toRem(33);
        font-size: toRem(12.25);
        border: 0 !important;
        outline: none !important;
        box-shadow: unset !important;
      }

      .data-item {
        @include flex-row-between-nowrap;
        background: $brand-inverse-light;
        @include transition(0.4s);
        border-radius: toRem(12);
        margin: toRem(2.5);
        width: max-content;
        padding: toRem(6) toRem(10);
        cursor: pointer;
        color: $color-text;

        &:hover {
          background: $brand-red-light;
        }

        .text {
          font-size: toRem(11.25);
          margin-right: toRem(7);
          padding-bottom: toRem(2.5);
        }

        .icon {
          font-size: toRem(10);
        }
      }
    }

    .input-entry {
      @include flex-row-between-nowrap;
      position: absolute;
      bottom: toRem(5);
      width: 98%;
      right: toRem(5);

      .form-control {
        min-height: toRem(34);
        font-size: toRem(12);
        width: 100%;
        border: 0;
        border-bottom: 0.0625rem solid $border-grey;
      }

      .add-btn {
        background: $brand-inverse-light;
        @include square-shape(34);
        @include transition(0.4s);
        margin-left: toRem(10);
        position: relative;

        &:hover {
          background: $brand-accent-light;
        }

        .icon {
          @include center-placement;
          font-size: toRem(15);
          color: $brand-navy;
        }
      }
    }
  }

  .bottom {
    padding: toRem(8) toRem(10);
    @include flex-row-end-nowrap;

    .btn {
      padding: toRem(10) toRem(22);
      font-size: toRem(9.85);
    }
  }
}
</style>
