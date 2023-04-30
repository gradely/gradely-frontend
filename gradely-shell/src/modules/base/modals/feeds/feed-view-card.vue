<template>
  <div class="feed-view-card">
    <!-- LEFT SECTION  -->
    <div class="left-section">
      <div class="avatar rounded-5 border-brand-inverse">
        <img
          v-lazy="mxStaticImg('One.png', 'onboarding')"
          alt=""
          class="avatar-img"
        />
      </div>

      <div class="info">
        <!-- FULLNAME  -->
        <div class="top color-text font-weight-600 mgb-3">Omolade Giwa</div>

        <!-- CHILD NAME  -->
        <div class="bottom color-grey-dark">
          Viewed on: Jan 3, 2021 08:34 AM
        </div>
      </div>
    </div>

    <!-- RIGHT SECTION  -->
    <div
      class="right-section pointer rounded-30 smooth-transition text-uppercase font-weight-600"
      title="View Profile"
    >
      <div class="text text-center">
        View <span class="profile-text">Profile</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "feedViewCard",
};
</script>

<style lang="scss" scoped>
.feed-view-card {
  @include flex-row-between-nowrap;
  margin-bottom: toRem(20);

  .left-section {
    @include flex-row-start-nowrap;

    .avatar {
      margin-right: toRem(12);
      @include square-shape(40);

      @include breakpoint-down(xs) {
        margin-right: toRem(10);
        @include square-shape(36);
      }
    }

    .top {
      @include font-height(12.5, 18);

      @include breakpoint-down(xs) {
        @include font-height(12.25, 17);
      }
    }

    .bottom {
      @include font-height(11, 15);

      @include breakpoint-down(xs) {
        @include font-height(10.75, 15);
      }
    }
  }

  .right-section {
    @include flex-row-center-nowrap;
    background: $brand-inverse-light;
    padding: toRem(9) toRem(18);
    font-size: toRem(9.5);
    color: $brand-navy;
    width: max-content;

    &:hover {
      background: $brand-accent-light;
    }

    .profile-text {
      @include breakpoint-down(xs) {
        display: none;
      }
    }
  }
}
</style>
