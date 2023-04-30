<template>
  <div
    class="verify-teacher-card mgb-5 rounded-3 white-text-bg box-shadow-effect pd-15"
  >
    <!-- INFO COLUMN  -->
    <div class="left">
      <div class="avatar avatar-sm-md mgr-10">
        <div class="avatar-text white-text brand-navy-bg">BC</div>
      </div>

      <!-- INFO  -->
      <div class="info-column">
        <div class="title-text font-weight-600 mgb-2 brand-navy">
          Babatunde Calebs
        </div>
        <div class="meta-text color-ash">
          Invited to Join <span class="font-weight-700">Year 11 - GOLD</span> as
          a <span class="font-weight-700">Mathematics</span> teacher
        </div>
      </div>
    </div>

    <!-- OPTIONS COLUMN  -->
    <div class="right">
      <!-- APPROVE  -->
      <div
        class="avatar accept-btn mgr-12 brand-inverse-light-bg"
        title="Resend"
      >
        <div class="icon icon-swap brand-inverse"></div>
      </div>

      <!-- DECLINE  -->
      <div class="avatar decline-btn mgl-12 brand-red-light-bg" title="Decline">
        <div class="icon icon-decline brand-tonic"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "invitedTeacherCard",
};
</script>

<style lang="scss" scoped>
.verify-teacher-card {
  @include flex-row-between-nowrap;

  @include breakpoint-down(md) {
    padding: toRem(12) !important;
  }

  @include breakpoint-down(xs) {
    padding: toRem(10) !important;
  }

  .left {
    @include flex-row-start-nowrap;

    .avatar {
      @include square-shape(42);

      @include breakpoint-down(xs) {
        margin-right: toRem(8) !important;
      }

      @include breakpoint-custom-down(350) {
        display: none;
      }

      .avatar-text {
        @include breakpoint-down(md) {
          font-size: toRem(12);
        }
      }
    }

    .title-text {
      @include font-height(13, 21);
    }

    .meta-text {
      @include font-height(11.75, 18);

      @include breakpoint-down(sm) {
        @include font-height(11.5, 17);
      }

      @include breakpoint-down(xs) {
        font-weight: 400 !important;
        @include font-height(10.5, 16);

        span {
          font-weight: 500 !important;
        }
      }
    }
  }

  .right {
    @include flex-row-end-nowrap;

    @include breakpoint-down(md) {
      @include flex-column-end-end;
      justify-items: flex-start;
      padding-left: toRem(20);
    }

    .avatar {
      cursor: pointer;
      @include transition(0.3s);

      @include breakpoint-down(md) {
        @include square-shape(26);
      }

      .icon {
        @include transition(0.3s);
        @include center-placement;
        font-size: toRem(18);

        @include breakpoint-down(md) {
          font-size: toRem(15);
        }
      }
    }

    .accept-btn,
    .decline-btn {
      @include breakpoint-down(md) {
        margin: 0 !important;
      }

      &:hover {
        background: $brand-inverse !important;
        .icon {
          color: $white-text !important;
        }
      }
    }

    .decline-btn {
      @include breakpoint-down(md) {
        margin-top: toRem(5) !important;
      }

      &:hover {
        background: $brand-tonic !important;
      }
    }
  }
}
</style>
