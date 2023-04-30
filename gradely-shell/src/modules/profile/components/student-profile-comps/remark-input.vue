<template>
  <div class="remark-input mgb-40">
    <!-- TEACHER IMAGE  -->
    <div class="avatar rounded-5">
      <img
        v-lazy="getAuthUser.image"
        :alt="$string.getStringInitials(getAuthUser.full_name)"
        v-if="getAuthUser.image"
        class="avatar-img"
      />
      <div
        v-else
        class="avatar-text white-text"
        :class="$color.getProfileBgColor(getAuthUser.full_name)"
      >
        {{ $string.getStringInitials(getAuthUser.full_name) }}
      </div>
    </div>

    <!-- REMARK CONTENT  -->
    <div class="content w-100">
      <!-- TOP SECTION (FULL NAME)  -->
      <div class="top">
        <span class="full-name font-weight-600 color-text">{{
          getAuthUser.full_name
        }}</span>
      </div>

      <div class="content-area">
        <textarea
          placeholder="Your comment here"
          rows="4"
          v-model="remark"
          class="form-control"
        ></textarea>

        <button
          class="btn btn-accent mgt-15"
          :disabled="isDisabled"
          ref="postBtn"
          @click="handlePostRemark"
        >
          Post
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "remarkInput",

  props: {
    subject: {
      type: Object,
      default() {
        return {
          id: 1,
          name: "Mathematics",
        };
      },
    },
  },

  computed: {
    isDisabled() {
      return this.remark.length ? false : true;
    },
  },

  data: () => ({
    remark: "",
  }),

  methods: {
    ...mapActions({
      sendStudentRemark: "dbProfile/sendStudentRemark",
    }),

    validateRemark() {
      if (this.remark.length < 5) {
        this.pushAlert("Remark must be at least 5 characters", "warning");
        return false;
      }
      return true;
    },

    handlePostRemark() {
      if (!this.validateRemark()) return;

      this.handleClick("postBtn", "Posting...");

      let payload = {
        type: "student",
        receiver_id:
          Number(this.$route.params.student_id) || Number(this.getAuthUser.id),
        remark: this.remark,
        subject_id: Number(this.subject.id),
      };

      this.sendStudentRemark(payload)
        .then((response) => {
          this.handleClick("postBtn", "Post", false);
          if (response.code === 200) {
            this.remark = "";

            let new_remark = {
              ...response.data,
              creator: {
                ...response.data.creator,
                full_name: response.data.creator.name,
                firstname: response.data.creator.name.split(" ")[0],
                lastname: response.data.creator.name.split(" ")[1],
              },
              subject: {
                name: this.subject.name,
                id: response.data.subject_id,
              },
            };

            this.$emit("updateRemark", new_remark);
          }
          // ERROR STATE
          else
            this.pushAlert(
              response.message || "Could not post remark",
              "warning"
            );
        })
        .catch(() => {
          this.handleClick("postBtn", "Post", false);
          this.pushAlert("Error sending remark", "error");
        });
    },

    // HANDLES BUTTON DISPLAY TEXT AND ALERT
    processState(message, type) {
      this.handleClick("postBtn", "Post", false);

      // HANDLE ALERT
      this.$bus.$emit("show_response_alert", {
        message,
        type,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.remark-input {
  @include flex-row-start-nowrap;
  align-items: flex-start;

  .avatar {
    @include square-shape(42);
    margin-right: toRem(15);

    @include breakpoint-down(lg) {
      @include square-shape(38);
      margin-right: toRem(12);
    }

    @include breakpoint-down(sm) {
      @include square-shape(36);
      margin-right: toRem(10);
    }

    @include breakpoint-down(xs) {
      margin-right: toRem(8);
      @include square-shape(33);

      .avatar-text {
        font-size: toRem(11);
      }
    }
  }

  .content {
    .top {
      margin-bottom: toRem(10);

      .full-name {
        @include font-height(13.5, 20);

        @include breakpoint-down(lg) {
          @include font-height(13, 18);
        }

        @include breakpoint-down(xs) {
          @include font-height(12, 15);
        }
      }
    }

    .content-area {
      .form-control {
        @include font-height(13, 18);

        @include breakpoint-down(lg) {
          @include font-height(12.5, 17);
        }

        @include breakpoint-down(sm) {
          @include font-height(11.75, 17);
          padding: toRem(8);
        }
      }

      .btn {
        margin-left: auto;
        font-size: toRem(11);
        padding: toRem(11.5) toRem(28);

        @include breakpoint-down(lg) {
          font-size: toRem(10);
          padding: toRem(10) toRem(25);
        }
      }
    }
  }
}
</style>
