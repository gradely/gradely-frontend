<template>
  <div class="class-subjects-block">
    <div class="title-text font-weight-600 color-text">CLASS SUBJECTS</div>

    <!-- DETAIL BLOCK  -->
    <div class="detail-block rounded-7 mgb-7">
      <div class="top">
        <template v-if="class_subjects.length" class>
          <div
            class="card-chip"
            v-for="(subject, index) in class_subjects"
            :key="index"
          >
            {{ subject.name }}
          </div>
        </template>

        <template v-else>
          <div class="text-center color-grey-dark gfont-13">
            No subject assigned to class
          </div>
        </template>
      </div>

      <div class="d-flex justify-content-end">
        <div
          class="bottom mgt-10 smooth-transition pointer"
          @click="toggleSubjectModal"
        >
          <div class="text font-weight-600">MANAGE SUBJECTS</div>
        </div>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" mode="in-out" v-if="show_subject_modal">
        <select-subject-modal
          :global_class_id="global_class_id"
          :assigned_subject="class_subjects"
          @closeTriggered="toggleSubjectModal"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
export default {
  name: "classSubjectsBlock",

  components: {
    selectSubjectModal: () =>
      import(
        /* webpackChunknAME: 'modal' */ "@/shared/modals/select-subject-modal"
      ),
  },

  props: {
    class_subjects: {
      type: Array,
      default: () => [],
    },

    class_id: Number,
    global_class_id: Number,
  },

  data: () => ({
    show_subject_modal: false,
  }),

  methods: {
    toggleSubjectModal() {
      this.show_subject_modal = !this.show_subject_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.class-subjects-block {
  margin-bottom: toRem(20);

  .title-text {
    @include font-height(13.25, 18);
    margin-bottom: toRem(10);
    padding-left: toRem(10);

    @include breakpoint-down(lg) {
      @include font-height(12, 17);
    }

    @include breakpoint-down(sm) {
      @include font-height(11, 16);
    }
  }

  .detail-block {
    padding: toRem(12);
    border: toRem(1) solid $brand-inverse-light;

    @include breakpoint-down(xs) {
      padding: toRem(8);
    }

    .top {
      @include flex-row-start-wrap;

      .card-chip {
        border: toRem(1) solid $brand-accent;
        background: $brand-accent-light;
        padding: toRem(6) toRem(14);
        border-radius: toRem(15);
        font-size: toRem(12);
        color: $brand-navy;
        margin: toRem(5);
      }
    }

    .bottom {
      @include flex-row-end-nowrap;
      padding-left: toRem(5);
      color: darken($brand-accent, 2%);
      width: max-content;

      &:hover {
        color: $brand-inverse;
      }

      .icon {
        font-size: toRem(16);

        @include breakpoint-down(sm) {
          font-size: toRem(14);
        }
      }

      .text {
        font-size: toRem(12);

        @include breakpoint-down(sm) {
          font-size: toRem(11);
        }
      }
    }
  }
}
</style>
