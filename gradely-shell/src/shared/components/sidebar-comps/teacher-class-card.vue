<template>
  <div
    @click="$emit('classSelected', class_id)"
    class="teacher-class-card position-relative rounded-5 overflow-hidden w-100 pointer smooth-transition"
    :class="active ? 'active-card' : null"
  >
    <!-- LABEL  -->
    <div class="label position-absolute h-100 brand-accent-bg top-0"></div>

    <div class="class-info">
      <!-- CLASS NAME  -->
      <div class="class-name mgb-1 brand-navy font-weight-700 pdr-10">
        {{ class_name }}
      </div>

      <!-- CLASS CODE  -->
      <div class="class-code color-grey-dark">Class Code: {{ class_code }}</div>
    </div>

    <div class="avatar">
      <div class="icon icon-caret-right border-grey"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "teacherClassCard",

  props: {
    class_id: Number,
    class_name: String,
    class_code: String,
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.teacher-class-card {
  @include flex-row-between-nowrap;
  padding: toRem(12) toRem(5) toRem(12) toRem(15);

  &:hover {
    background: $brand-inverse-light !important;
  }

  .label {
    left: 0;
    width: toRem(3.5);
    display: none;

    @include breakpoint-down(lg) {
      width: toRem(4);
    }
  }

  .class-name {
    @include font-height(12.65, 20);

      @include breakpoint-down(xs) {
        @include font-height(12.5, 20);
    }
  }

  .class-code {
    @include font-height(11.25, 17);
  }

  .avatar {
    @include square-shape(24);
    display: none;

    .icon {
      @include center-placement;
      font-size: toRem(12);
    }
  }
}

.active-card {
  background: $brand-inverse-light !important;

  .label {
    display: unset;
  }

  .avatar {
    display: unset;
  }
}
</style>
