<template>
  <div class="post-filter-block w-100 position-relative">
    <!-- BLOCK ONE -->
    <div
      class="block block-one pointer"
      @click="reverseState"
      v-if="isSchoolAndTeacher"
    >
      <div class="avatar smooth-transition">
        <div class="icon" :class="renderStateIcon"></div>
      </div>

      <div class="text brand-primary text-capitalize pdl-2">
        {{ post_reverse_state }}
      </div>
    </div>

    <!-- LINE  -->
    <!-- HIDE LINE FROM PARENT AND STUDENT PENDING FILTER AVAILABLITY -->
    <div class="line" v-if="isSchoolAndTeacher"></div>

    <!-- BLOCK TWo -->
    <div
      class="block block-two pointer"
      v-if="false"
      @click="toggleOptions"
      v-on-clickaway="hideOptions"
    >
      <div class="text brand-primary">Filter</div>

      <div class="avatar">
        <div class="icon icon-caret-fill-down"></div>
      </div>
    </div>

    <!-- DROPDOWN -->
    <div
      class="dropdown rounded-5 box-shadow-effect smooth-transition smooth-animation white-text-bg"
      v-if="show_more_option"
    >
      <!-- ALL VIEW  -->
      <template v-if="filter_view === 'all'">
        <div class="list-wrapper smooth-transition">
          <!-- BLOCK ONE -->
          <div class="list-block">
            <div class="list-title">TYPE</div>
            <div class="list-item ignore" @click="filter_view = 'subject'">
              Subject
            </div>
            <div class="list-item">Live Class</div>
            <div class="list-item">Discussion</div>
          </div>

          <!-- BLOCK TWO -->
          <div class="list-block">
            <div class="list-title">AUTHOR</div>
            <div class="list-item">Me</div>
            <div class="list-item">Teachers</div>
            <div class="list-item">Parents / Students</div>
          </div>
        </div>
      </template>

      <!-- SUBJECT VIEW  -->
      <template v-else>
        <!-- TOP ROW  -->
        <div class="top-row pointer ignore" @click="filter_view = 'all'">
          <div class="icon icon-arrow-left ignore"></div>
          <div class="text ignore">FILTER BY SUBJECT</div>
        </div>

        <div class="list-wrapper smooth-transition">
          <!-- BLOCK ONE -->
          <div class="list-block">
            <div class="list-item">Biology</div>
            <div class="list-item">English Language</div>
            <div class="list-item">Mathematics</div>
            <div class="list-item">Physics</div>
          </div>

          <!-- BLOCK TWO -->
          <div class="list-block">
            <div class="list-item">Chemistry</div>
            <div class="list-item">Economics</div>
            <div class="list-item">Geography</div>
            <div class="list-item">Agricultural Science</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "postFilterBlock",

  computed: {
    renderStateIcon() {
      return this.post_reverse_state === "library"
        ? "icon-folder"
        : "icon-timeline";
    },

    isSchoolAndTeacher() {
      return this.getAuthType === "school" || this.getAuthType === "teacher"
        ? true
        : false;
    },
  },

  data: () => ({
    post_reverse_state: "library",
    show_more_option: false,

    filter_view: "all", //subject
  }),

  watch: {
    $route: {
      handler() {
        if (this.$route.query.view === "library")
          this.post_reverse_state = "Class feed";
      },
      immediate: true,
    },
  },

  methods: {
    toggleOptions() {
      this.show_more_option = !this.show_more_option;
    },

    hideOptions($event) {
      if (!$event.target.classList.contains("ignore"))
        this.show_more_option = false;
    },

    reverseState() {
      if (this.post_reverse_state === "library") {
        this.post_reverse_state = "Class feed";
        this.$router.push({ name: "GradelyFeeds", query: { view: "library" } });
        this.$emit("switchView", "library");
      } else {
        this.post_reverse_state = "library";
        this.$router.push({ name: "GradelyFeeds", query: { view: "feed" } });
        this.$emit("switchView", "feed");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.post-filter-block {
  @include flex-row-between-nowrap;
  margin-bottom: toRem(15);

  .block {
    .text {
      @include font-height(12.5, 16);
      @include transition(0.4s);
      white-space: nowrap;

      @include breakpoint-down(xl) {
        @include font-height(13, 14);
      }

      @include breakpoint-down(xs) {
        @include font-height(12.5, 13);
      }

      @include breakpoint-custom-down(390) {
        @include font-height(12.25, 13);
      }

      &:hover {
        color: $brand-inverse !important;
      }
    }

    .avatar {
      @include square-shape(27);

      .icon {
        @include center-placement;
        font-size: toRem(17);
        color: $brand-primary;
        margin-top: toRem(-1);

        @include breakpoint-down(xs) {
          font-size: toRem(16);
        }
      }
    }
  }

  .line {
    width: 100%;
    border-top: toRem(1) solid rgba($border-grey, 0.98);
  }

  .block-one {
    @include flex-row-start-nowrap;
    padding-right: toRem(7);

    .text {
      @include breakpoint-down(sm) {
        padding-right: toRem(10);
      }
    }
  }

  .block-two {
    @include flex-row-end-nowrap;
    padding-left: toRem(7);

    .icon {
      font-size: toRem(10) !important;
      margin-top: toRem(2) !important;
    }
  }

  .dropdown {
    padding: toRem(20) toRem(16) toRem(11);
    right: toRem(-11.5);
    width: toRem(275);

    @include breakpoint-down(sm) {
      padding: toRem(20) toRem(22) toRem(11);
    }

    .top-row {
      @include flex-row-start-nowrap;
      @include transition(0.4s);
      margin-bottom: toRem(15);
      width: max-content;

      .icon {
        margin-right: toRem(7);
        font-size: toRem(15);
        color: $color-text;

        @include breakpoint-down(sm) {
          font-size: toRem(16);
        }
      }

      .text {
        color: $color-grey-dark;
        font-size: toRem(10.5);

        @include breakpoint-down(sm) {
          font-size: toRem(11);
        }
      }

      &:hover {
        .icon,
        .text {
          color: $brand-accent !important;
        }
      }
    }

    .list-wrapper {
      @include flex-row-between-nowrap;
      align-items: flex-start;

      .list-block {
        .list-title {
          @include font-height(10, 14);
          margin-bottom: toRem(15);
          color: $color-grey-dark;

          @include breakpoint-down(sm) {
            margin-bottom: toRem(17);
          }
        }

        .list-item {
          @include font-height(11.5, 16);
          @include transition(0.4s);
          margin-bottom: toRem(10);
          color: $color-text;
          cursor: pointer;

          @include breakpoint-down(sm) {
            @include font-height(11.5, 16);
            margin-bottom: toRem(18);
          }

          &:hover {
            color: darken($brand-accent, 5%);
          }
        }
      }
    }
  }
}
</style>
