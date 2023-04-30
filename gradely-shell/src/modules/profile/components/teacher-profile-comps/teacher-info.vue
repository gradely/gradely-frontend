<template>
  <div class="teacher-info">
    <div class="teacher-mini-image avatar rounded-5">
      <img
        v-lazy="teacher.image"
        :alt="$string.getStringInitials(teacher_name)"
        class="avatar-img"
        v-if="teacher.image"
      />

      <div class="avatar-text white-text">
        {{ $string.getStringInitials(teacher_name) }}
      </div>
    </div>

    <div>
      <!-- TEACHER NAME  -->
      <div class="teacher-name brand-navy font-weight-700 text-capitalize">
        {{ teacher_name }}
      </div>

      <!-- TEACHER SUBJECTS  -->
      <div class="teacher-subjects color-grey-dark">
        {{ getSubjectList }}
      </div>

      <!-- CLASSESS AND ASSESSMENT INFO  -->
      <div class="info-row">
        <!-- CLASSES  -->
        <div class="info-column">
          <div class="info-content">
            <span class="counter">{{ teacher.classes.length }}</span>
            <span class="info">Classes</span>
          </div>
          <div class="description">Taught</div>
        </div>

        <!-- ASSESSMENT  -->
        <div class="info-column">
          <div class="info-content">
            <span class="counter">{{ teacher.homework.length }}</span>
            <span class="info">Assessment</span>
          </div>
          <div class="description">Assigned</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "teacherInfo",

  props: {
    teacher_name: String,

    teacher: {
      type: Object,
      default: () => ({
        image: "",
        classes: [],
        homework: [],
        subjects: [],
      }),
    },
  },

  computed: {
    getSubjectList() {
      let subjects = [];
      this.teacher.subjects.map((subject) => subjects.push(subject.name));

      if (subjects.length > 1) return subjects.join(", ");
      else if (subjects.length === 1) return subjects[0];
      else return "No subject assigned yet!";
    },
  },
};
</script>

<style lang="scss" scoped>
.teacher-info {
  @include breakpoint-down(md) {
    @include flex-row-start-nowrap;
    align-items: flex-start;
  }

  .teacher-mini-image {
    display: none;

    @include breakpoint-down(md) {
      @include square-shape(150);
      display: inline-block;
      margin-right: toRem(25);
    }

    @include breakpoint-down(sm) {
      @include square-shape(140);
      margin-right: toRem(20);
    }

    @include breakpoint-down(xs) {
      @include square-shape(110);
      margin-right: toRem(15);
    }

    @include breakpoint-custom-down(380) {
      @include square-shape(100);
      margin-right: toRem(12);
    }

    @include breakpoint-custom-down(340) {
      @include square-shape(85);
      margin-right: toRem(12);
    }

    .avatar-text {
      font-size: toRem(50);
      font-weight: 500;

      @include breakpoint-down(sm) {
        font-size: toRem(45);
      }

      @include breakpoint-down(xs) {
        font-size: toRem(30);
      }
    }
  }

  .teacher-name {
    @include font-height(24, 38);
    margin-bottom: toRem(3);

    @include breakpoint-down(lg) {
      @include font-height(23, 36);
    }

    @include breakpoint-down(sm) {
      @include font-height(20, 29);
    }

    @include breakpoint-down(xs) {
      @include font-height(18, 24);
    }

    @include breakpoint-custom-down(380) {
      @include font-height(16.5, 22);
    }
  }

  .teacher-subjects {
    @include font-height(13, 19);
    margin-bottom: toRem(40);

    @include breakpoint-down(lg) {
      @include font-height(12.5, 18);
    }

    @include breakpoint-down(sm) {
      @include font-height(12, 17);
      margin-bottom: toRem(30);
    }

    @include breakpoint-down(xs) {
      @include font-height(11, 16);
      margin-bottom: toRem(20);
    }
  }

  .info-row {
    @include flex-row-start-nowrap;
    margin-bottom: toRem(55);

    @include breakpoint-down(lg) {
      margin-bottom: toRem(45);
    }

    .info-column {
      margin-right: toRem(37);

      @include breakpoint-down(xs) {
        margin-right: toRem(25);
      }

      &:last-of-type {
        margin-right: 0;
      }

      .counter {
        color: $brand-navy;
        font-weight: 700;
        margin-right: toRem(4);
        @include font-height(20, 29);

        @include breakpoint-down(lg) {
          @include font-height(19, 28);
        }

        @include breakpoint-down(sm) {
          @include font-height(17, 25);
        }

        @include breakpoint-down(xs) {
          @include font-height(15, 22);
        }

        @include breakpoint-custom-down(380) {
          @include font-height(14, 21);
        }
      }

      .info {
        color: $color-grey-dark;
        @include font-height(10, 14);
      }

      .description {
        color: $color-ash;
        @include font-height(11.75, 16);

        @include breakpoint-down(sm) {
          @include font-height(11, 16);
        }

        @include breakpoint-down(xs) {
          @include font-height(10.5, 16);
        }
      }
    }
  }
}
</style>
