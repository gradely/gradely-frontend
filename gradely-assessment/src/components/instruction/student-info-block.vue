<template>
  <div
    class="student-info-block rounded-10 mgb-25"
    :class="getAuthToken ? null : ['color-white-bg', 'border-0']"
  >
    <div
      class="top color-grey-dark font-weight-600 text-uppercase"
      v-if="getAuthToken"
    >
      Currently Logged in as
    </div>

    <div class="bottom">
      <div class="info">
        <div
          v-if="getAuthToken"
          class="avatar rounded-10"
          :class="getAuthUser.image ? 'border-brand-inverse' : null"
        >
          <img
            v-lazy="getAuthUser.image"
            :alt="$string.getStringInitials(getAuthUser.full_name)"
            class="avatar-img"
            v-if="getAuthUser.image"
          />

          <div
            class="avatar-text"
            v-else
            :class="$color.getProfileBgColor(getAuthUser.full_name)"
          >
            {{ $string.getStringInitials(getAuthUser.full_name) }}
          </div>
        </div>

        <div>
          <div class="line-one font-weight-700 color-text mgb-3">
            {{ getAuthToken ? getAuthUser.full_name : "No user found" }}
          </div>
          <div
            class="line-two color-grey-dark"
            :class="getAuthToken ? 'text-uppercase' : null"
          >
            {{
              getAuthToken
                ? getAuthUser.code
                : "Log in or create a student account to continue"
            }}
          </div>
        </div>
      </div>

      <button
        @click="goToLogin"
        class="logout-link bg-transparent font-weight-500"
        v-if="getAuthToken"
      >
        Not me? LogOut
      </button>

      <button @click="goToLogin" class="btn btn-accent" v-else>Log In</button>
    </div>
  </div>
</template>

<script>
import { APP_BASE_URL } from "@/env";

export default {
  name: "studentInfoBlock",

  props: {
    assessment: Object,
  },

  computed: {
    getAppURL() {
      return APP_BASE_URL;
    },
  },

  methods: {
    goToLogin() {
      location.href = `${this.getAppURL}/login?redirect=${APP_BASE_URL}/test/start-exam/${this.assessment.id}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.student-info-block {
  border: toRem(1) solid #e5e5e5;
  padding: toRem(11) toRem(20);

  @include breakpoint-down(sm) {
    padding: toRem(11) toRem(14);
  }

  @include breakpoint-down(xs) {
    padding: toRem(10) toRem(12);
  }

  .top {
    @include font-height(12, 17);
    margin-bottom: toRem(11);

    @include breakpoint-down(lg) {
      @include font-height(11.25, 16);
    }

    @include breakpoint-down(md) {
      @include font-height(11, 15);
    }

    @include breakpoint-down(sm) {
      @include font-height(10.25, 14);
    }

    @include breakpoint-down(xs) {
      @include font-height(10, 13);
    }
  }

  .bottom {
    @include flex-row-between-nowrap;

    .info {
      @include flex-row-start-nowrap;

      .avatar {
        @include square-shape(48);
        margin-right: toRem(15);

        @include breakpoint-down(lg) {
          @include square-shape(42);
          margin-right: toRem(12);
        }

        @include breakpoint-down(sm) {
          @include square-shape(38);
          margin-right: toRem(10);
        }

        @include breakpoint-down(xs) {
          @include square-shape(34);
          margin-right: toRem(8);
        }
      }

      .line-one {
        @include font-height(15.5, 21);

        @include breakpoint-down(lg) {
          @include font-height(15, 20);
        }

        @include breakpoint-down(md) {
          @include font-height(14.5, 19);
        }

        @include breakpoint-down(sm) {
          @include font-height(13.5, 18);
        }

        @include breakpoint-down(xs) {
          @include font-height(13, 18);
        }
      }

      .line-two {
        @include font-height(13, 18);

        @include breakpoint-down(lg) {
          @include font-height(12.75, 17);
        }

        @include breakpoint-down(sm) {
          @include font-height(12, 17);
        }

        @include breakpoint-down(xs) {
          @include font-height(11.75, 17);
        }
      }
    }

    .logout-link {
      font-size: toRem(12.75);
      color: $color-grey-dark;

      @include breakpoint-down(lg) {
        font-size: toRem(12.5);
      }

      @include breakpoint-down(sm) {
        font-size: toRem(12);
      }

      @include breakpoint-down(xs) {
        font-size: toRem(11.75);
      }

      &:hover {
        color: $brand-tonic;
      }
    }
  }
}
</style>