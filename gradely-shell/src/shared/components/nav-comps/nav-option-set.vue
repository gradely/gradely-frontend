<template>
  <div class="more-icons d-flex justify-content-end align-items-center">
    <!-- MORE ITEMS SWITCHER -->
    <div class="mode-switcher-area" v-if="isStudentAndTeacherUser">
      <component :is="setupModeNavSwitcher()"></component>
      <div class="separator-line"></div>
    </div>

    <div
      class="icon avatar avatar-square mgr-15"
      v-if="['school'].includes(account_type)"
      @click="showSetupMenu"
    >
      <span class="icon-question-hexagon"></span>

      <!-- INDICATOR -->
      <div
        v-if="pending_task"
        class="indicator brand-tonic-bg rounded-circle index-9 pulse-animate"
      ></div>
    </div>

    <template v-if="account_type === 'school'">
      <div
        class="icon avatar avatar-square mgr-0"
        @click="showMenu"
        v-on-clickaway="closeMenu"
      >
        <span class="icon-gear"></span>
      </div>
    </template>

    <!-- ICON AVATAR TEXT -->
    <div
      v-else
      class="icon position-relative icon__user rounded-10"
      :class="$color.getProfileBgColor(getAuthUser.full_name)"
      @click="showMenu"
      v-on-clickaway="closeMenu"
    >
      <img
        v-lazy="getAuthUser.image"
        :alt="$string.getStringInitials(getAuthUser.full_name)"
        class="avatar-img rounded-8"
        v-if="getAuthUser.image"
      />
      <div
        v-else
        class="avatar-text white-text gfont-10-5"
        :class="$color.getProfileBgColor(getAuthUser.full_name)"
      >
        {{ $string.getStringInitials(getAuthUser.full_name) }}
      </div>
      <i
        class="icon-caret-fill-down color-grey-light gfont-11"
        v-if="$route.meta.type === 'CatchUp'"
      ></i>
      <i class="icon-caret-fill-down color-text gfont-11" v-else></i>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import childModeSwitcher from "@/shared/components/nav-comps/child-mode-switcher";
import teacherAppEntry from "@/shared/components/nav-comps/teacher-app-entry";

export default {
  name: "navOptionSet",

  components: {
    childModeSwitcher,
    teacherAppEntry,
  },

  props: {
    account_type: String,
  },

  computed: {
    ...mapGetters({
      getSchoolChecklist: "dbHome/getSchoolChecklist",
    }),

    isStudentAndTeacherUser() {
      return this.getAuthType === "student" || this.getAuthType === "teacher"
        ? true
        : false;
    },
  },

  watch: {
    getSchoolChecklist: {
      handler(value) {
        this.checkForPendingTask(value);
      },
      immediate: true,
    },
  },

  data: () => ({
    pending_task: false,
  }),

  created() {
    this.getAuthType === "school" ? this.loadSchoolChecklist() : null;
  },

  methods: {
    ...mapActions({
      loadSchoolChecklist: "dbHome/loadSchoolChecklist",
    }),

    checkForPendingTask(tasks) {
      let modified_tasks = [];

      for (const item in tasks) {
        if (item !== "set_curriculum") modified_tasks.push(tasks[item]);
      }

      this.pending_task = modified_tasks.includes(false);
    },

    showMenu() {
      this.$bus.$emit("show-menu");
    },

    closeMenu() {
      this.$bus.$emit("close-menu");
    },

    showSetupMenu() {
      this.$bus.$emit("show-setup-menu");
    },

    setupModeNavSwitcher() {
      if (this.getAuthType === "student") return "childModeSwitcher";
      else if (this.getAuthType === "teacher") return "teacherAppEntry";
      else return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.mode-switcher-area {
  @include flex-row-start-nowrap;

  .separator-line {
    position: relative;
    margin: 0 toRem(18) 0 toRem(16);
    width: toRem(1);
    top: 0;
    height: toRem(35);
    background: $border-grey;

    @include breakpoint-down(md) {
      width: 0;
      margin: 0 0 0 toRem(15);
    }
  }
}

// MORE ICONS STYLING
.icon {
  position: relative;
  @include square-shape(36);
  padding-top: toRem(14);
  padding-bottom: toRem(14);
  margin-right: toRem(30);
  background-color: $color-white;
  cursor: pointer;

  @include breakpoint-down(xl) {
    @include square-shape(33);
    margin-right: toRem(28);
  }

  @include breakpoint-down(lg) {
    margin-right: toRem(23);
  }

  @include breakpoint-down(md) {
    @include square-shape(34);
    margin-right: toRem(30);
  }

  @include breakpoint-down(sm) {
    overflow: hidden;
    margin-right: 0;
    border-radius: toRem(7.5) !important;
  }

  .avatar-text {
    font-size: toRem(12.5) !important;

    @include breakpoint-down(lg) {
      font-size: toRem(12) !important;
    }

    @include breakpoint-down(md) {
      font-size: toRem(11.5) !important;
    }
  }

  span {
    @include center-placement;
    @include transition(0.3s);
    color: $brand-black;
    font-size: toRem(20);
  }

  &:last-of-type {
    margin-right: toRem(17);

    @include breakpoint-down(sm) {
      margin-right: 0;
    }
  }

  &:hover {
    span {
      color: darken($brand-accent, 15%);
    }
  }

  .indicator {
    position: absolute;
    @include square-shape(9);
    top: toRem(4);
    right: toRem(4);
  }
}

.icon__user {
  i {
    @include center-y;
    display: block;
    right: toRem(-18);

    @include breakpoint-down(lg) {
      font-size: toRem(10) !important;
    }
  }

  img {
    @include background-cover;
    top: 0;
  }
}

@keyframes pulse {
  0% {
    -webkit-transform: scaleX(0.85);
    transform: scaleX(0.85);
  }
  50% {
    -webkit-transform: scale3d(1.2, 1.2, 1.2);
    transform: scale3d(1.2, 1.2, 1.2);
  }
  to {
    -webkit-transform: scaleX(0.85);
    transform: scaleX(0.85);
  }
}

.pulse-animate {
  -webkit-animation: pulse 1.5s linear infinite;
  -moz-animation: pulse 1.5s linear infinite;
  -ms-animation: pulse 1.5s linear infinite;
  animation: pulse 1.5s linear infinite;
}
</style>
