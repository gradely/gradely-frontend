<template>
  <div
    class="teacher-class-card rounded-15 mgb-5 smooth-transition pointer"
    @click="selectClass"
  >
    <div class="left">
      <div
        class="class-avatar position-relative rounded-15 mgr-12"
        :class="getBackgroundColor"
      >
        <div class="icon icon-graduation-cap-outline brand-navy"></div>

        <!-- ACTIVE MARKER -->
        <div
          class="active-marker position-absolute w-100 h-100 index-99"
          v-if="isActive"
        >
          <div class="position-relative w-100 h-100">
            <div class="icon icon-correct brand-inverse font-weight-700"></div>
          </div>
        </div>
      </div>

      <div>
        <div class="class-name brand-navy font-weight-700 mgb-2">
          {{ class_data.class_name }}
        </div>
        <div class="class-code color-grey-dark">
          {{ class_data.class_code }}
        </div>
      </div>
    </div>

    <router-link
      :to="`/manage-class/${class_data.class_id}/${class_data.class_name}`"
      class="right rounded-10 smooth-transition ignore"
    >
      <div class="icon icon-gear-fill-edge brand-accent mgr-9 ignore"></div>
      <div class="text color-ash font-weight-700 ignore">Manage</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "teacherClassCard",

  props: {
    class_data: {
      type: Object,
      default: () => ({
        class_id: 1,
        class_name: "Year 1",
        class_code: "MAYDA/JSS1-B",
      }),
    },
  },

  computed: {
    getBackgroundColor() {
      return this.colors.sort(() => 0.5 - Math.random())[0];
    },

    isActive() {
      return this.$route.params.id == this.class_data?.class_id ? true : false;
    },
  },

  data() {
    return {
      colors: [
        "brand-inverse-bg",
        "brand-accent-bg",
        "brand-green-bg",
        "brand-red-bg",
        "border-grey-bg",
        "chestnut-bg",
        "pampers-bg",
        "crimson-bg",
      ],
    };
  },

  methods: {
    selectClass($event) {
      if (!$event.target.classList.contains("ignore")) {
        this.$emit("closeModal");
        this.$router.push({
          name: "GradelyFeeds",
          params: { id: Number(this.class_data?.class_id) },
        });
      }
    },

    manageClass() {
      console.log("HIT");

      this.$router.push({
        name: "ManageClass",
        params: {
          id: this.class_data.class_id,
          name: this.class_data.class_name,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.teacher-class-card {
  @include flex-row-between-nowrap;
  border: 1px solid #e5e5e5;
  padding: toRem(12.5) toRem(13.5);

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 toRem(1) toRem(4) rgba($brand-black, 0.15);
  }

  .left {
    @include flex-row-start-nowrap;

    .class-avatar {
      @include square-shape(44);

      .icon {
        @include center-placement;
        font-size: toRem(24);
      }

      .active-marker {
        background: rgba(29, 29, 29, 0.4) !important;

        .icon {
          @include center-placement;
          font-size: toRem(20);
        }
      }
    }

    .class-name {
      @include font-height(13, 18);
    }

    .class-code {
      @include font-height(11.5, 17);
    }
  }

  .right {
    @include flex-row-center-nowrap;
    background: $color-white;
    padding: toRem(8);

    &:hover {
      background: rgba($brand-inverse-light, 0.75);
    }

    .icon {
      font-size: toRem(19);
    }

    .text {
      font-size: toRem(12.5);
    }
  }
}
</style>