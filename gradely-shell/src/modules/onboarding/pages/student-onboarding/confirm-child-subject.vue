<template>
  <div class="confirm-subject w-100">
    <content-container-layout>
      <template slot="content">
        <div
          class="d-flex flex-column align-items-center justify-content-start w-100"
        >
          <!-- TITLE TEXT  -->
          <div class="title-text text-center mgb-30 brand-navy">
            Confirm the subjects you are interested in from the list below.
          </div>

          <!-- SUBJECT SELECTION BLOCK  -->
          <div class="subject-selection-block mgb-25">
            <subject-name-card
              v-for="(subject, index) in subjects"
              :key="index"
              :subject="subject"
            />
          </div>

          <!-- SELECTION COUNTER  -->
          <div class="selection-counter mgb-30">
            <div class="count color-text font-weight-800 mgr-5">8</div>
            <div class="text color-grey-dark">Subjects Selected</div>
          </div>

          <!-- CONFIRM BUTTON  -->
          <button class="btn btn-accent mgb-10">Confirm</button>
        </div>
      </template>
    </content-container-layout>
  </div>
</template>

<script>
import contentContainerLayout from "@/modules/onboarding/components/global-comps/content-container-layout";
import subjectNameCard from "@/modules/onboarding/components/global-comps/subject-name-card";

export default {
  name: "confirmSubject",

  metaInfo: {
    title: "Confirm Subjects",
  },

  components: {
    contentContainerLayout,
    subjectNameCard,
  },

  data: () => ({
    subjects: [
      {
        id: 1,
        name: "Mathematics",
        active: false,
      },
      {
        id: 2,
        name: "Geography",
        active: false,
      },
      {
        id: 3,
        name: "Chemistry",
        active: false,
      },
      {
        id: 4,
        name: "Physics",
        active: true,
      },
      {
        id: 5,
        name: "Econimics",
        active: false,
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.confirm-subject {
  .title-text {
    @include font-height(18.75, 33);
    width: 70%;

    @include breakpoint-down(lg) {
      @include font-height(18.5, 33);
      width: 80%;
    }

    @include breakpoint-down(md) {
      @include font-height(16.5, 28);
      width: 85%;
    }

    @include breakpoint-down(sm) {
      @include font-height(15, 26);
      width: 98%;
    }
  }

  .subject-selection-block {
    @include flex-row-center-wrap;
    align-items: flex-start;
  }

  .selection-counter {
    @include flex-row-center-nowrap;

    .count {
      @include font-height(17.5, 22);

      @include breakpoint-down(lg) {
        @include font-height(17, 21);
      }

      @include breakpoint-down(xs) {
        @include font-height(16, 20);
      }
    }

    .text {
      @include font-height(13, 17);

      @include breakpoint-down(lg) {
        @include font-height(12, 16);
      }

      @include breakpoint-down(xs) {
        @include font-height(11.75, 15);
      }
    }
  }

  .btn {
    width: 40%;
    font-size: toRem(11);
    padding: toRem(13) toRem(28);

    @include breakpoint-down(lg) {
      font-size: toRem(10.5);
      padding: toRem(12) toRem(28);
    }

    @include breakpoint-down(md) {
      width: 50%;
    }
  }
}
</style>
