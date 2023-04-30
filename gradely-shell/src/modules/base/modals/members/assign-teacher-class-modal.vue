<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-sm-md' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">
          Assign to Class
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body mgt--5">
        <div
          class="class-box w-100 rounded-7 color-white-bg border-border-grey mgb-40"
        >
          <!-- CLASS IMAGE  -->
          <div class="avatar rounded-7">
            <img
              v-lazy="mxStaticImg('ClassBoard.png')"
              alt=""
              class="avatar-img"
            />
          </div>

          <div>
            <!-- CLASS NAME  -->
            <div class="class-name brand-primary font-weight-700">
              {{ getSelectedClass.name }}
            </div>

            <!-- CLASS CODE  -->
            <div class="class-code color-grey-dark">
              {{ getSelectedClass.class_code }}
            </div>
          </div>
        </div>

        <!-- SELECT BLOCK  -->
        <div class="form-group compact-row w-100">
          <label for="selectTeacher" class="label-compact label-sm"
            >Assign a Teacher
          </label>
          <select
            class="form-control"
            id="selectTeacher"
            v-model="selected_teacher"
          >
            <option disabled selected value="">Select teacher</option>
            <option
              v-for="(teacher, index) in getSchoolTeachers"
              :value="teacher.id"
              :key="index"
              >{{ teacher.full_name }}</option
            >
          </select>
        </div>

        <!-- TIP TEXT  -->
        <div class="tip-text color-ash">
          Can't find a teacher on the list?
          <span class="btn-link font-weight-600" @click="$emit('inviteTeacher')"
            >Invite Now</span
          >
        </div>

        <div class="options-container mgb-20">
          <div
            class="option-button rounded-18"
            v-for="(subject, index) in assigned_subjects"
            :key="index"
            @click="removeSubject(index)"
          >
            <span class="gfont-12 color-text mgr-10">{{ subject.name }}</span>
            <span
              class="icon icon-minus brand-tonic remove-icon white-text-bg"
            ></span>
          </div>
        </div>

        <div
          class="d-inline-flex align-items-center mgb-20 pointer"
          @click="showSubjectOptions"
        >
          <span class="icon icon-plus brand-inverse gfont-18 mgr-5"></span>
          <span class="gfont-13 color-grey-dark">Select Subjects</span>
        </div>

        <div class="position-relative" v-if="show_subject_options">
          <post-selector
            multi_select
            :pre_selected="assigned_subjects"
            :data_set="schoolSubjects"
            @resolveSelection="updateSubjectSelection"
            @hideDropdown="show_subject_options = false"
          />
        </div>

        <!-- SUBJECT SELECTION BLOCK  -->
        <div class="subject-selection-block mgb-30" v-if="false">
          <subject-name-card
            v-for="(subject, index) in subjects"
            :key="index"
            :subject="subject"
          />
        </div>

        <!-- SELECTION COUNTER  -->
        <div class="selection-counter mgb-30" v-if="false">
          <div class="count color-text font-weight-800 mgr-5">8</div>
          <div class="text color-grey-dark">Subjects Selected</div>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div
        :class="{ 'mgt-20': show_subject_options }"
        class="modal-cover-footer d-flex justify-content-center"
      >
        <button
          class="btn modal-btn no-shadow bg-transparent brand-tonic"
          @click="$emit('closeTriggered')"
        >
          Cancel
        </button>

        <button
          class="btn btn-accent modal-btn"
          ref="assignBtn"
          @click="confirmTeacherRole"
        >
          Assign
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import postSelector from "@/modules/base/components/feed-comps/post-input-comps/post-selector";
import modalCover from "@/shared/components/modal-cover";
import subjectNameCard from "@/modules/onboarding/components/global-comps/subject-name-card";

export default {
  name: "changeClassModal",

  components: {
    modalCover,
    subjectNameCard,
    postSelector,
  },

  computed: {
    ...mapGetters({
      getSelectedClass: "general/getSelectedClass",
      getSchoolTeachers: "general/getSchoolTeachers",
      getSchoolSubjects: "dbHome/getSchoolSubjects",
    }),

    getSelectedTeacher() {
      return this.getSchoolTeachers.find((teacher) => {
        return teacher.id === this.selected_teacher;
      });
    },

    schoolSubjects() {
      return this.getSchoolSubjects.map((subject) => {
        return { ...subject, id: Number(subject.subject_id) };
      });
    },

    getSubjectIDs() {
      return this.assigned_subjects.map((subject) => {
        return Number(subject.id);
      });
    },

    teacherRoleForm() {
      return {
        class_id: Number(this.getSelectedClass.id),
        subjects: this.getSubjectIDs,
        teacher_id: this.getSelectedTeacher?.id,
      };
    },
  },

  mounted() {
    this.fetchSchoolTeachers();
    this.getSubjectList();
  },

  watch: {
    selected_teacher() {
      this.assigned_subjects = [...this.getSelectedTeacher?.teacherSubjects];
    },
  },

  data: () => ({
    show_subject_options: false,
    assigned_subjects: [],
    selected_teacher: "",
    subjects: [],
  }),

  methods: {
    ...mapActions({
      getTeachersInSchool: "general/getTeachersInSchool",
      getSubjectsInClass: "general/getSubjectsInClass",
      fetchSubjectList: "dbHome/getSchoolSubjectList",
      assignTeacherRole: "dbTeacher/assignTeacherRole",
      emptyTeacherInClass: "general/emptyTeacherInClass",
    }),

    updateSubjectSelection(subject) {
      let selection_index = this.assigned_subjects.findIndex(
        ({ id }) => Number(id) === Number(subject.id)
      );
      selection_index === -1
        ? this.assigned_subjects.push(subject)
        : this.assigned_subjects.splice(selection_index, 1);
    },

    removeSubject(index) {
      this.assigned_subjects.splice(index, 1);
    },

    showSubjectOptions() {
      this.show_subject_options = true;
      let option_parent = document.querySelector(".modal-cover-body");
      this.$nextTick(() => (option_parent.scrollTop = 130));
    },

    async fetchSchoolTeachers() {
      if (!this.getSchoolTeachers.length) await this.getTeachersInSchool();
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

    async fetchClassSubjects() {
      let { code, data } = await this.getSubjectsInClass(this.$route.params.id);
      if (code === 200) this.subjects = data;
    },

    confirmTeacherRole() {
      this.handleClick("assignBtn", "Assigning...");

      if (!this.getSelectedTeacher?.id) {
        this.pushAlert("Please select a teacher!", "warning");
        this.handleClick("assignBtn", "Assign", false);
        return false;
      }

      if (!this.getSubjectIDs.length) {
        this.pushAlert("Please select a subject!", "warning");
        this.handleClick("assignBtn", "Assign", false);
        return false;
      }

      this.assignTeacherRole(this.teacherRoleForm)
        .then((response) => {
          this.handleClick("assignBtn", "Assign", false);

          if (response.code === 200) {
            this.pushAlert(
              `${this.getSelectedTeacher?.full_name} class details updated successfully`,
              "success"
            );
            this.emptyTeacherInClass();
            this.$bus.$emit("reloadTeacherInClass");

            setTimeout(() => {
              this.$emit("closeTriggered");
            }, 1500);
          } else {
            this.pushAlert("Failed to assign teacher to a class", "warning");
          }
        })
        .catch(() => {
          this.handleClick("assignBtn", "Assign", false);
          this.pushAlert(
            "An error occured while assigning teacher to a class",
            "warning"
          );
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-body {
  max-height: 95vh;
}
.class-box {
  @include flex-row-start-nowrap;
  padding: toRem(13);

  @include breakpoint-down(xs) {
    padding: toRem(10);
  }

  .avatar {
    @include square-shape(42);
    margin-right: toRem(13);
  }

  .class-name {
    @include font-height(12.5, 19);
    margin-bottom: toRem(2);

    @include breakpoint-down(xs) {
      @include font-height(12, 17);
    }
  }

  .class-code {
    @include font-height(11.5, 16);

    @include breakpoint-down(xs) {
      @include font-height(11, 16);
    }
  }
}

.tip-text {
  @include font-height(12, 16);
  margin-top: toRem(-25);
  margin-bottom: toRem(25);
}

.form-group {
  margin-top: toRem(30);

  .form-control {
    font-size: toRem(12.5);
  }
}

.subject-selection-block {
  @include flex-row-center-wrap;
  align-items: flex-start;
}

.selection-counter {
  @include flex-row-center-nowrap;
  margin-top: toRem(-16);

  .count {
    @include font-height(16.5, 21);
    position: relative;
    top: toRem(-1);

    @include breakpoint-down(xs) {
      @include font-height(16, 20);
    }
  }

  .text {
    @include font-height(12, 16);

    @include breakpoint-down(xs) {
      @include font-height(11.75, 15);
    }
  }
}

.modal-cover-footer {
  margin-top: toRem(-30);
  margin-bottom: toRem(10);
}

.options-container {
  @include flex-row-start-wrap;

  .option-button {
    display: inline-flex;
    align-items: center;
    padding: toRem(7) toRem(14);
    background: $brand-inverse-light;
    transition: background ease-in-out 0.35s;
    cursor: pointer;
    font-size: toRem(11) !important;
    margin-right: toRem(7);
    margin-bottom: toRem(7);

    &:hover {
      background: rgba($brand-tonic, 0.7);
    }

    .remove-icon {
      @include flex-row-center-nowrap;
      @include square-shape(22);
      border-radius: 50%;
    }
  }
}
</style>
