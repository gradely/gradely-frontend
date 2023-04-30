<template>
  <div class="teacher-profile-page">
    <div class="gradely-app-container topnav-base-offset">
      <div
        class="
          gradely-container
          px-2 px-sm-3 px-md-4 px-xl-5
          mx-auto
          smooth-animation
        "
      >
        <!-- PROFILE SECTIONS  -->
        <div class="profile-sections mx-auto">
          <!-- LEFT SECTION  -->
          <div class="left-section">
            <div class="teacher-image avatar rounded-5">
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
          </div>

          <!-- RIGHT SECTION  -->
          <div class="right-section">
            <!-- TEACHER INFO  -->
            <teacher-info :teacher_name="teacher_name" :teacher="teacher" />

            <!-- ABOUT ME BLOCK  -->
            <profile-wrapper title="About Me">
              <template slot="content">
                <about-me-block :teacher="teacher" />
              </template>
            </profile-wrapper>

            <!-- ASSIGNED CLASSES  -->
            <profile-wrapper
              title="Assigned Classes"
              v-if="teacher.classes.length"
            >
              <template slot="content">
                <assigned-classes-block :teacher="teacher" />
              </template>
            </profile-wrapper>

            <!-- TEACHER SCHEDULE  -->
            <template>
              <class-schedules />
            </template>

            <!-- RECENT HOMEWORK  -->
            <profile-wrapper
              title="Recent Assessment"
              v-if="teacher.homework.length"
            >
              <template slot="content">
                <recent-assessment-block
                  :teacher_name="teacher_name"
                  :teacher="teacher"
                />
              </template>
            </profile-wrapper>
          </div>
        </div>
      </div>
    </div>

    <!-- PAGE LOADER -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_page_loader">
        <page-loader />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import teacherInfo from "@/modules/profile/components/teacher-profile-comps/teacher-info";

export default {
  name: "teacherProfilePage",

  components: {
    teacherInfo,
    profileWrapper: () =>
      import(
        /* webpackChunkName: "teacherProfile" */ "@/modules/profile/components/teacher-profile-comps/profile-wrapper"
      ),
    aboutMeBlock: () =>
      import(
        /* webpackChunkName: "teacherProfile" */ "@/modules/profile/components/teacher-profile-comps/about-me-block"
      ),
    assignedClassesBlock: () =>
      import(
        /* webpackChunkName: "teacherProfile" */ "@/modules/profile/components/teacher-profile-comps/assigned-classes-block"
      ),
    pageLoader: () =>
      import(
        /* webpackChunkName: "pageLoader" */ "@/shared/components/page-loader"
      ),
    recentAssessmentBlock: () =>
      import(
        /* webpackChunkName: "teacherProfile" */ "@/modules/profile/components/teacher-profile-comps/recent-assessment-block"
      ),
    classSchedules: () =>
      import(
        /* webpackChunkName: "teacherProfile" */ "@/modules/profile/components/teacher-profile-comps/class-schedules"
      ),
  },

  data: () => ({
    show_page_loader: true,

    teacher_id: "",
    teacher_name: "",
    teacher: {
      classes: [],
      homework: [],
      subjects: [],
      profile: {},
    },
  }),

  created() {
    this.$bus.$on("reloadState", () => {
      this.show_page_loader = true;
      this.loadProfile();
    });
  },

  mounted() {
    this.loadProfile();
  },

  methods: {
    ...mapActions({
      getTeacherProfile: "dbProfile/getTeacherProfileData",
    }),

    loadProfile() {
      this.getTeacherNameAndId();
      this.fetchTeacherProfile();
    },

    getTeacherNameAndId() {
      this.teacher_id = this.$route.params.teacher_id;
      this.teacher_name = this.$route.query.name;
    },

    fetchTeacherProfile() {
      this.getTeacherProfile(this.teacher_id)
        .then((response) => {
          if (response.code === 200) {
            this.teacher_name = `${response.data.firstname} ${response.data.lastname}`;
            this.teacher = response.data;

            this.show_page_loader = false;
          } else this.showErrorState();
        })
        .catch(() => this.showErrorState());
    },

    showErrorState() {
      this.$bus.$emit("show_response_alert", {
        message: "An error occured while loading school profile data",
        type: "error",
      });

      this.show_page_loader = false;
      this.school = {};
    },
  },
};
</script>

<style lang="scss" scoped>
.teacher-profile-page {
  .profile-sections {
    @include flex-row-between-wrap;
    align-items: flex-start;
    margin-top: toRem(60);
    width: 95%;

    @include breakpoint-down(xl) {
      width: 100%;
    }

    .left-section {
      position: fixed;
      width: 26.5%;

      @include breakpoint-down(lg) {
        width: 25%;
      }

      @include breakpoint-down(md) {
        width: 100%;
        display: none;
        // margin-bottom: toRem(20);
      }

      .teacher-image {
        @include square-shape(225);

        @include breakpoint-down(lg) {
          @include square-shape(190);
        }

        .avatar-text {
          font-size: toRem(70);
          font-weight: 500;

          @include breakpoint-down(xl) {
            font-size: toRem(60);
          }
        }
      }
    }

    .right-section {
      margin-left: auto;
      width: 71%;

      @include breakpoint-down(lg) {
        width: 72.5%;
      }

      @include breakpoint-down(md) {
        width: 100%;
      }
    }
  }
}
</style>
