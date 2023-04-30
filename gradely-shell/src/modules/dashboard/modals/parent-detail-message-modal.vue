<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-small' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header mgt-0">
        <!-- HEADER CONTENT  -->
        <div class="header-content">
          <!-- PARENT AVATAR  -->
          <div class="parent-avatar avatar">
            <img
              v-lazy="parent.parent_image"
              alt=""
              class="avatar-img"
              v-if="isValidImage(parent.parent_image)"
            />

            <div
              v-else
              class="avatar-text"
              :class="$color.getProfileBgColor(getParentFullname)"
            >
              {{ $string.getStringInitials(getParentFullname) }}
            </div>
          </div>

          <!-- PARENT NAME  -->
          <div class="parent-name white-text font-weight-600 text-center">
            {{ getParentFullname }}
          </div>

          <!-- PARENT ROLE  -->
          <div class="parent-role text-center border-grey text-uppercase">
            {{ parent.relationship }}
          </div>

          <!-- PARENT CONTACT INFO  -->
          <div class="parent-contact-info">
            <!-- PHONE NUMBER  -->
            <div class="column">
              <div class="icon icon-phone"></div>

              <div class="info">
                <div class="top">Phone Number</div>
                <a
                  :href="processPhoneNumber"
                  title="Place a call"
                  class="bottom btn-link"
                  v-if="parent.parent_phone"
                  >{{ parent.parent_phone }}</a
                >
                <div class="bottom border-grey" v-else>Not available</div>
              </div>
            </div>

            <!-- EMAIL -->
            <div class="column">
              <div class="icon icon-email"></div>

              <div class="info">
                <div class="top">Email</div>
                <a
                  :href="'mailto:+' + parent.parent_email"
                  title="Send a mail"
                  class="bottom btn-link"
                  v-if="parent.parent_email"
                  >{{ parent.parent_email }}</a
                >
                <div class="bottom border-grey" v-else>Not available</div>
              </div>
            </div>
          </div>

          <!-- MESSAGE PARENT  -->
          <template v-if="false">
            <div
              class="message-btn rounded-30 pointer smooth-transition"
              title="Message parent"
              v-if="view === 'details'"
              @click="toggleView('message')"
            >
              <div class="icon icon-chat"></div>
              <div class="text">SEND A MESSAGE</div>
            </div>
          </template>
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body mgt-5">
        <!-- DETAIL CONTENT  -->
        <template name="detail-content" v-if="view === 'details'">
          <div class="title-text color-grey-dark font-weight-600">CHILDREN</div>

          <!-- CHILDREN ROW  -->
          <div class="children-row">
            <router-link
              :to="{ name: 'StudentProfile', params: { id: 1 } }"
              class="child rounded-5"
            >
              <div class="avatar rounded-5 border-brand-inverse">
                <img
                  v-lazy="mxStaticImg('One.png', 'onboarding')"
                  alt=""
                  class="avatar-img"
                />
              </div>

              <div>
                <div class="top-text color-text font-weight-600">
                  Aduragbemi Adebayo
                </div>

                <div class="bottom-text color-grey-dark">Year 7 - Gold</div>
              </div>
            </router-link>
          </div>
        </template>

        <!-- MESSAGE CONTENT  -->
        <template name="message-content" v-if="view === 'message'">
          <textarea
            class="form-control"
            rows="5"
            v-model="message"
            placeholder="Enter your message"
          ></textarea>

          <!-- BTN ROW  -->
          <div class="btn-row d-flex justify-content-center mgt-20 mgb-17">
            <button
              v-if="!message_lock"
              class="
                btn
                modal-btn
                no-shadow
                bg-transparent
                font-weight-600
                brand-tonic
              "
              @click="toggleView('details')"
            >
              Cancel
            </button>

            <button
              class="btn btn-accent modal-btn"
              ref="sendBtn"
              @click="sendMessageToParent"
            >
              Send Message
            </button>
          </div>
        </template>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer"> </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "parentDetailModal",

  components: {
    modalCover,
  },

  props: {
    modal_type: {
      type: String,
      default: "details", //message
    },

    message_lock: {
      type: Boolean,
      default: false,
    },

    parent: {
      type: Object,
      default: () => ({
        parent_id: 1,
        parent_image: "",
        parent_firstname: "Boye",
        parent_lastname: "Oshinaga",
        relationship: "Father",
      }),
    },

    student_reference_id: Number,
  },

  computed: {
    getParentFullname() {
      return this.parent.parent_firstname
        ? `${this.parent.parent_firstname} ${this.parent.parent_lastname}`
        : false;
    },

    processPhoneNumber() {
      return this.parent.parent_phone.startsWith(0)
        ? `tel:${this.parent.parent_phone}`
        : `tel:0${this.parent.parent_phone}`;
    },
  },

  data() {
    return {
      view: this.modal_type,
      message: "",
    };
  },

  methods: {
    ...mapActions({ messageParent: "dbMembers/messageParent" }),

    isValidImage(image) {
      if (!image) return false;
      if (image.includes("http")) return true;
    },

    toggleView(view) {
      this.view = view;
    },

    sendMessageToParent() {
      this.handleClick("sendBtn", "Sending...");

      if (!this.message) {
        this.pushAlert("Please enter a message text", "warning");
        this.handleClick("sendBtn", "Send Message", false);
        return false;
      }

      let request_payload = {
        channel: "id",
        receiver_id: Number(this.parent.parent_id),
        body: this.message,
        reference_type: "student",
        reference_id: this.student_reference_id,
      };

      this.messageParent(request_payload)
        .then((response) => {
          this.handleClick("sendBtn", "Send Message", false);

          if (response.code === 200) {
            this.pushAlert("Message sent successfully", "success");

            setTimeout(() => {
              this.$emit("closeTriggered");
            }, 1200);
          } else this.pushAlert("Message was not sent", "warning");
        })
        .catch(() => {
          this.handleClick("sendBtn", "Send Message", false);
          this.pushAlert("Error sending message", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-header {
  background: darken($brand-navy, 3%);
  position: relative;
  top: toRem(-3);

  .header-content {
    @include flex-column-center;
    padding: toRem(20) 0 toRem(4);

    .parent-avatar {
      @include square-shape(58);
      margin-bottom: toRem(16);

      @include breakpoint-custom-down(420) {
        @include square-shape(52);
      }

      .avatar-text {
        font-size: toRem(16.5);
        font-weight: 400 !important;

        @include breakpoint-custom-down(420) {
          font-size: toRem(14.5);
        }
      }
    }

    .parent-name {
      @include font-height(17, 22);
      margin-bottom: toRem(3);

      @include breakpoint-down(sm) {
        @include font-height(16, 20);
      }

      @include breakpoint-custom-down(420) {
        @include font-height(15, 19);
      }
    }

    .parent-role {
      @include font-height(10.75, 15);
      margin-bottom: toRem(23);

      @include breakpoint-custom-down(420) {
        margin-bottom: toRem(14);
      }
    }

    .parent-contact-info {
      @include flex-row-center-nowrap;
      margin-bottom: toRem(25);
      width: 100%;

      @include breakpoint-custom-down(420) {
        @include flex-row-center-wrap;
        margin-bottom: toRem(20);
      }

      .column {
        .icon {
          font-size: toRem(14);
          margin-right: toRem(10);
          color: $border-grey-dark;

          @include breakpoint-custom-down(420) {
            display: none;
          }
        }

        .info {
          @include breakpoint-custom-down(420) {
            @include flex-column-center;
          }
        }

        .top {
          font-size: toRem(10.5);
          color: rgba($border-grey, 0.8);
        }

        .bottom {
          font-size: toRem(12);
          font-weight: 500;
        }

        &:first-of-type {
          @include flex-row-end-nowrap;
          width: 46%;
          align-items: flex-start;
          margin-right: toRem(12);

          @include breakpoint-custom-down(420) {
            @include flex-row-center-nowrap;
            margin-bottom: toRem(8);
            width: 100%;
            margin-right: 0;
          }
        }
        &:last-of-type {
          width: 54%;
          @include flex-row-start-nowrap;
          align-items: flex-start;
          margin-left: toRem(12);

          @include breakpoint-custom-down(420) {
            @include flex-row-center-nowrap;
            width: 100%;
            margin-left: 0;
          }
        }
      }
    }

    .message-btn {
      border: toRem(1) solid rgba($border-grey, 0.5);
      @include flex-row-start-nowrap;
      padding: toRem(11) toRem(20);
      margin-top: toRem(30);
      color: $border-grey;
      width: max-content;

      @include breakpoint-custom-down(420) {
        padding: toRem(9) toRem(18);
      }

      &:hover {
        background: darken($brand-navy, 7%);
        color: $brand-accent;
      }

      .icon {
        font-size: toRem(15);
        margin-right: toRem(10);
        margin-top: toRem(0.5);
      }

      .text {
        text-transform: uppercase;
        font-size: toRem(10);
        font-weight: 600;

        @include breakpoint-custom-down(420) {
          font-size: toRem(9);
        }
      }
    }
  }
}

.modal-cover-body {
  .title-text {
    @include font-height(12, 16);
    margin-bottom: toRem(15);
  }

  .children-row {
    @include flex-row-between-wrap;

    .child {
      border: toRem(1) solid rgba($border-grey, 0.75);
      @include flex-row-start-nowrap;
      padding: toRem(8) toRem(10);
      @include transition(0.4s);
      align-items: flex-start;
      margin-bottom: toRem(5);
      width: 49%;

      @include breakpoint-down(sm) {
        padding: toRem(6) toRem(8);
      }

      @include breakpoint-custom-down(420) {
        width: 100%;
      }

      &:hover {
        background: rgba($brand-inverse-light, 0.25);
      }

      .avatar {
        @include square-shape(40);
        margin-right: toRem(10);

        @include breakpoint-down(sm) {
          @include square-shape(38);
        }
      }

      .top-text {
        @include font-height(12, 18);
        margin-bottom: toRem(2);

        @include breakpoint-down(sm) {
          @include font-height(11.25, 17);
        }
      }

      .bottom-text {
        @include font-height(11, 16);

        @include breakpoint-down(sm) {
          @include font-height(10.75, 16);
        }
      }
    }
  }

  textarea {
    @include font-height(12.65, 17);
  }
}
</style>
