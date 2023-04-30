<template>
  <router-link
    :to="{
      name: $route.name,
      params: {
        id: $route.params.id,
        assessment_id: $route.params.assessment_id,
        student_id: student.id,
      },
    }"
    class="student-info-card position-relative rounded-5 smooth-transition"
    :class="{ 'active-card': isActiveStudent }"
  >
    <!-- OVERLAY COVER -->
    <div
      class="
        overlay-cover
        position-absolute
        w-100
        h-100
        rounded-5
        smooth-transition
      "
    ></div>
    <!-- AVATAR  -->
    <div
      class="avatar avatar-square"
      :class="student.image ? 'border-brand-inverse' : null"
    >
      <img
        v-lazy="student.image"
        :alt="$string.getStringInitials(student.full_name)"
        class="avatar-img"
        v-if="student.image"
      />

      <div
        class="avatar-text"
        v-else
        :class="$color.getProfileBgColor(student.full_name)"
      >
        {{ $string.getStringInitials(student.full_name) }}
      </div>
    </div>

    <!-- INFO  -->
    <div class="info">
      <div class="top-text color-white mgb-2 font-weight-600">
        {{ $string.getCapitalizeText(student.full_name) }}
      </div>
      <div class="bottom-text border-grey">
        Student Code: <span class="text-uppercase">{{ student.code }}</span>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "studentInfoCard",

  props: {
    student: {
      type: Object,
      default: () => ({
        id: 1,
        image: "",
        full_name: "Efemena Elvis",
        code: "GRA/2020/008",
      }),
    },
  },

  computed: {
    isActiveStudent() {
      return this.student?.id === Number(this.$route.params.student_id)
        ? true
        : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.student-info-card {
  @include flex-row-start-nowrap;
  width: max-content;
  padding: toRem(12) toRem(14);
  margin-right: toRem(10);

  @include breakpoint-down(lg) {
    padding: toRem(10) toRem(11);
  }

  .overlay-cover {
    background: rgba($brand-navy, 0.5);
    border: toRem(1) solid rgba($color-grey-dark, 0.5);
    z-index: 9;
    left: 0;
    top: 0;
  }

  &:hover {
    background: rgba($black-text, 0.5) !important;

    .overlay-cover {
      display: none;
    }
  }

  .avatar {
    @include square-shape(40);
    margin-right: toRem(10);

    @include breakpoint-down(lg) {
      @include square-shape(35);
      margin-right: toRem(9);
    }
  }

  .top-text {
    @include font-height(12.5, 19);
    white-space: nowrap;

    @include breakpoint-down(lg) {
      @include font-height(11.5, 18);
    }

    @include breakpoint-down(xs) {
      @include font-height(11, 17);
    }
  }

  .bottom-text {
    @include font-height(11, 17);
    white-space: nowrap;

    @include breakpoint-down(lg) {
      @include font-height(10.75, 17);
    }

    @include breakpoint-down(xs) {
      @include font-height(10.5, 17);
    }
  }
}

.active-card {
  background: rgba($black-text, 0.5) !important;

  .overlay-cover {
    display: none;
  }
}
</style>
