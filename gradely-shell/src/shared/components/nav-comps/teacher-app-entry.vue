<template>
  <div class="position-relative smooth-transition" v-if="app_list.length">
    <div
      class="
        mode-nav-switcher
        custom-teacher-nav-switcher
        rounded-18
        smooth-transition
        pointer
        position-relative
      "
      @click="toggleDropdown"
      v-on-clickaway="hideDropdown"
    >
      <div class="icon-wrapper icon-one rounded-10">
        <div class="icon brand-navy icon-square-grid"></div>
      </div>

      <!-- ITEM  -->
      <div class="item text-truncate brand-navy">More</div>

      <div class="icon-wrapper icon-two">
        <div class="icon color-text icon-caret-fill-down"></div>
      </div>
    </div>

    <!-- DROPDOWN  -->
    <div
      class="
        dropdown
        rounded-5
        box-shadow-effect
        smooth-transition smooth-animation
        white-text-bg
      "
      v-if="show_dropdown"
    >
      <div class="item" @click="navigateToLesson" v-if="false">
        <div class="avatar brand-accent-light-bg">
          <div class="icon icon-file-text brand-tonic"></div>
        </div>
        <div class="">Lesson Resources</div>
      </div>

      <div
        class="item"
        v-for="(app, index) in app_list"
        :key="index"
        @click="launchApp(index)"
      >
        <div class="avatar brand-accent-light-bg">
          <img v-lazy="app.icon" alt="" />
        </div>
        <div class="">
          {{ app.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { EXTERNAL_URL } from "@/env";

export default {
  name: "teacherAppEntry",

  data: () => ({
    show_dropdown: false,
    app_list: [],
  }),

  watch: {
    $route: {
      handler() {
        this.getTeacherApps();
      },
      immediate: true,
    },
  },

  methods: {
    ...mapActions({ getTeacherClassApp: "dbApp/getTeacherClassApp" }),

    getTeacherApps() {
      this.app_list = [];

      this.getTeacherClassApp(this.$route.params.id)
        .then((response) => {
          if (response.code === 200) this.app_list = response.data;
          else this.app_list = [];
        })
        .catch(() => (this.app_list = []));
    },

    launchApp(app_index) {
      this.pushAlert(
        `Launching ${this.app_list[app_index].name} App`,
        "loading"
      );

      let url_path = `/teacher/track-grades/${this.$route.params.id}?term=${this.getAuthUser.term}&session=${this.getAuthUser.session}`;

      setTimeout(
        () => (location.href = EXTERNAL_URL("report-card", url_path)),
        2500
      );
    },

    navigateToLesson() {},

    toggleDropdown() {
      this.show_dropdown = !this.show_dropdown;
    },

    hideDropdown() {
      this.show_dropdown = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.custom-teacher-nav-switcher {
  background: rgba($border-grey-light, 0.75);
  padding: toRem(5) toRem(12);
  &:hover {
    background: $brand-inverse-light;
  }
}
.avatar {
  border-radius: toRem(10);
  margin-right: toRem(10);

  img {
    @include center-placement;
    @include square-shape(21);
  }
  .icon {
    @include center-placement;
    font-size: toRem(17);
  }
}

.dropdown {
  right: toRem(-5);
  width: toRem(210);
}
</style>
