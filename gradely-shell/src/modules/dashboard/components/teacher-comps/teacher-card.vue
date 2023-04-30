<template>
  <div class="card-wrapper h-auto position-relative">
    <!-- DROPDOWN  -->
    <div
      class="
        dropdown
        rounded-5
        box-shadow-effect
        smooth-animation
        white-text-bg
        d-sm-none
        ignore
      "
      v-if="show_dropdown"
    >
      <router-link
        :to="{
          name: 'TeacherProfile',
          params: { teacher_id: teacher.id },
          query: { name: teacher.full_name },
        }"
        class="item ignore"
        ><div class="icon-cover ignore">
          <div class="icon icon-eye ignore"></div>
        </div>
        <div class="ignore">View Profile</div>
      </router-link>

      <div class="item ignore" @click="toggleAssignModal">
        <div class="icon-cover ignore">
          <div class="icon icon-teacher-class ignore"></div>
        </div>
        <div class="ignore">Assign to Class</div>
      </div>

      <div class="item ignore" @click="toggleDeleteModal">
        <div class="icon-cover ignore">
          <div class="icon icon-trash ignore"></div>
        </div>
        <div class="ignore">Remove from School</div>
      </div>
    </div>

    <div
      class="teacher-card w-100 rounded-15 white-text-bg pointer"
      @click="goToTeacherProfile"
    >
      <!-- TOP  -->
      <div class="top-row w-100 rounded-top-10">
        <!-- OPTIONS  -->
        <div class="options position-absolute ignore">
          <div
            class="avatar rounded-10 pointer smooth-transition ignore"
            @click="toggleDropdown"
            v-on-clickaway="forceClose"
          >
            <div class="icon icon-ellipsis-h color-grey-dark ignore"></div>
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
            d-none d-sm-block
            ignore
          "
          v-if="show_dropdown"
        >
          <router-link
            :to="{
              name: 'TeacherProfile',
              params: { teacher_id: teacher.id },
              query: { name: teacher.full_name },
            }"
            class="item ignore"
          >
            <div class="icon-cover ignore">
              <div class="icon icon-eye ignore"></div>
            </div>
            <div class="ignore">View Profile</div>
          </router-link>

          <div class="item ignore" @click="toggleAssignModal">
            <div class="icon-cover ignore">
              <div class="icon icon-teacher-class ignore"></div>
            </div>
            <div class="ignore">Assign to Class</div>
          </div>

          <div class="item ignore" @click="toggleDeleteModal">
            <div class="icon-cover ignore">
              <div class="icon icon-trash ignore"></div>
            </div>
            <div class="ignore">Remove from School</div>
          </div>
        </div>

        <!-- CONTENT  -->
        <div class="content">
          <div class="avatar">
            <img
              v-lazy="teacher.image"
              :alt="$string.getStringInitials(teacher.full_name)"
              v-if="teacher.image"
              class="avatar-img brand-inverse-light-bg"
            />
            <div
              v-else
              class="avatar-text white-text"
              :class="$color.getProfileBgColor(teacher.full_name)"
            >
              {{ $string.getStringInitials(teacher.full_name) }}
            </div>
          </div>

          <div class="wrapper mx-auto">
            <div
              class="teacher-name text-center color-text font-weight-600 mgb-2"
            >
              {{ teacher.full_name }}
            </div>
            <div class="teacher-email text-center color-grey-dark">
              {{ teacher.email }}
            </div>
          </div>
        </div>
      </div>

      <!-- BOTTOM  -->

      <div class="bottom-row brand-accent-light-bg w-100 rounded-bottom-10">
        <div class="column">
          <div class="count">{{ teacher.teacherClasses.length }}</div>
          <div class="value">Classes</div>
        </div>

        <div class="column">
          <div class="count">{{ teacher.teacherSubjects.length }}</div>
          <div class="value">Subject</div>
        </div>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_delete_modal">
        <remove-teacher-modal
          :teacher="teacher"
          @closeTriggered="toggleDeleteModal"
        />
      </transition>

      <transition name="fade" v-if="show_assign_modal">
        <assign-class-modal
          :option="getOption"
          :teacher="teacher"
          @closeTriggered="toggleAssignModal"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "teacherCard",

  components: {
    assignClassModal: () =>
      import(
        /* webpackChunkName: "assignClassModal" */ "@/modules/dashboard/modals/assign-class-modal"
      ),
    removeTeacherModal: () =>
      import(
        /* webpackChunkName: "removeTeacherModal" */ "@/modules/dashboard/modals/remove-teacher-modal"
      ),
  },

  props: {
    teacher: {
      type: Object,
      default: () => ({
        id: 1,
        full_name: "Alice Jones",
        email: "alicejones@gradely.ng",
        image: null,
        teacherClasses: [],
        teacherSubjects: [],
      }),
    },
  },

  computed: {
    ...mapGetters({
      getSchoolClasses: "dbHome/getSchoolClasses",
      getSchoolSubjects: "dbHome/getSchoolSubjects",
    }),

    extractedClasses() {
      let classes = [];
      this.getSchoolClasses.forEach((level) => {
        level.classes.forEach((part) => {
          classes.push(this.createClass(part));
        });
      });
      return classes;
    },

    getOption() {
      return {
        classes: this.extractedClasses,
        subjects: this.getSchoolSubjects,
      };
    },
  },

  mounted() {
    this.getClasses();
    this.getSubjectList();
  },

  data: () => ({
    show_dropdown: false,
    show_assign_modal: false,
    show_delete_modal: false,
  }),

  methods: {
    ...mapActions({
      fetchSchoolClasses: "dbHome/getSchoolClasses",
      fetchSubjectList: "dbHome/getSchoolSubjectList",
    }),

    createClass(level) {
      return { name: level.class_name, id: level.id };
    },

    getClasses() {
      // calls the api only if the data isnt ready already
      if (this.getSchoolClasses.length) return;

      this.fetchSchoolClasses()
        .then((response) => {
          response;
        })
        .catch((err) => {
          console.log("error getting school classes", err);
        });
    },

    getSubjectList() {
      // calls the api only if the data isnt ready already
      if (this.getSchoolSubjects.length) return;

      this.fetchSubjectList()
        .then((response) => {
          response;
        })
        .catch((err) => {
          console.log("error getting school subjects", err);
        });
    },

    toggleAssignModal() {
      this.show_assign_modal = !this.show_assign_modal;
    },

    toggleDeleteModal() {
      this.show_delete_modal = !this.show_delete_modal;
    },

    toggleDropdown() {
      this.show_dropdown = !this.show_dropdown;
    },

    forceClose() {
      this.show_dropdown = false;
    },

    goToTeacherProfile($event) {
      if (!$event.target.classList.contains("ignore"))
        this.$router.push({
          name: "TeacherProfile",
          params: { teacher_id: this.teacher.id },
          query: { name: this.teacher.full_name },
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  width: 25%;
  padding: 0 0.9%;
  margin-bottom: toRem(23);

  @include breakpoint-down(lg) {
    padding: 0 0.65%;
  }

  @include breakpoint-down(md) {
    margin-bottom: toRem(10);
    width: 33.33%;
  }

  @include breakpoint-down(sm) {
    padding: 0 1.5%;
    width: 50%;
  }

  @include breakpoint-down(xs) {
    padding: 0 1%;
    margin-bottom: toRem(14);
  }
}

.teacher-card {
  position: relative;
  height: toRem(220);
  box-shadow: 0 toRem(1) toRem(4) rgba(0, 0, 0, 0.15);
  @include transition(0.4s);

  &:hover {
    transform: scale(1.02);
  }

  @include breakpoint-down(xl) {
    height: toRem(200);
  }

  @include breakpoint-down(lg) {
    height: toRem(210);
  }

  @include breakpoint-down(md) {
    height: toRem(200);
  }

  @include breakpoint-down(sm) {
    height: toRem(185);
  }

  @include breakpoint-down(xs) {
    border-radius: toRem(9) !important;
    height: toRem(140);
  }

  .top-row {
    .options {
      top: toRem(15);
      right: toRem(15);

      @include breakpoint-down(lg) {
        top: toRem(12);
        right: toRem(12);
      }

      @include breakpoint-down(md) {
        top: toRem(10);
        right: toRem(10);
      }

      @include breakpoint-custom-down(360) {
        top: toRem(8);
        right: toRem(7);
      }

      .avatar {
        background: rgba($border-grey, 0.25);
        @include square-shape(32);

        @include breakpoint-down(xs) {
          @include square-shape(30);
        }

        .icon {
          @include center-placement;
          font-size: toRem(22);

          @include breakpoint-down(sm) {
            font-size: toRem(20.5);
          }
        }

        &:hover {
          background: rgba($brand-inverse-light, 0.4);
        }
      }
    }

    .dropdown {
      top: toRem(47);
      right: toRem(5);
      width: 70%;

      @include breakpoint-down(xl) {
        width: 80%;
      }

      @include breakpoint-down(lg) {
        width: 87%;
      }
    }

    .content {
      @include flex-column-center;
      padding-top: toRem(30);

      @include breakpoint-down(xl) {
        padding-top: toRem(27);
        overflow: hidden;
      }

      .avatar {
        @include square-shape(55);
        margin-bottom: toRem(10);

        @include breakpoint-down(xl) {
          @include square-shape(42);
        }

        @include breakpoint-down(xs) {
          @include square-shape(40);
          margin-bottom: toRem(13);
          .avatar-text {
            font-size: toRem(12);
            font-weight: 500 !important;
          }
        }
      }

      .wrapper {
        width: 90%;
      }

      .teacher-name {
        @include font-height(13.25, 22);
        text-transform: capitalize;
        width: 100%;

        @include breakpoint-down(lg) {
          @include font-height(13, 18);
        }

        @include breakpoint-down(md) {
          @include font-height(12.25, 18);
        }

        @include breakpoint-custom-down(350) {
          @include font-height(12, 17);
        }
      }

      .teacher-email {
        @include font-height(12, 18);
        width: 100%;
        // word-wrap: break-word;
        // word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;

        @include breakpoint-down(xl) {
          @include font-height(11.75, 17);
        }

        @include breakpoint-down(md) {
          @include font-height(11.5, 17);
        }

        @include breakpoint-down(xs) {
          @include font-height(11, 17);
        }

        @include breakpoint-custom-down(350) {
          @include font-height(10.75, 16);
        }
      }
    }
  }

  .bottom-row {
    position: absolute;
    bottom: 0;
    left: 0;
    @include flex-row-center-nowrap;
    padding: toRem(11) 0;

    @include breakpoint-down(xl) {
      padding: toRem(9) 0;
    }

    @include breakpoint-down(md) {
      padding: toRem(7) 0;
    }

    @include breakpoint-down(xs) {
      display: none;
    }

    .column {
      &:first-of-type {
        margin-right: toRem(15);
      }

      &:last-of-type {
        margin-left: toRem(15);
      }

      .count {
        font-weight: 700;
        color: $color-text;
        @include font-height(13, 25);
        margin-bottom: toRem(2);
        text-align: center;

        @include breakpoint-down(xl) {
          @include font-height(14, 24);
        }

        @include breakpoint-down(md) {
          @include font-height(13.5, 19);
        }
      }

      .value {
        text-align: center;
        color: $color-grey-dark;
        @include font-height(11, 18);

        @include breakpoint-down(xl) {
          @include font-height(12, 18);
        }

        @include breakpoint-down(md) {
          @include font-height(11, 19);
        }
      }
    }
  }
}
</style>
