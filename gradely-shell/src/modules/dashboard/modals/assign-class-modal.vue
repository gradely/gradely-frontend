<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-sm-md' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title">ASSIGN TO CLASS</div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body pdb-5">
        <!-- TEACHER INFO ROW  -->
        <div class="teacher-info-row">
          <div class="avatar">
            <img
              v-lazy="teacher.image"
              alt="teacher-avatar"
              v-if="teacher.image"
              class="avatar-img"
              :class="$color.getProfileBgColor(getTeacherName)"
            />
            <div class="avatar-text brand-tonic-bg white-text" v-else>
              {{ $string.getStringInitials(getTeacherName) }}
            </div>
          </div>

          <!-- INFO  -->
          <div class="info">
            <div class="name font-weight-700 color-text">
              {{ getTeacherName }}
            </div>
            <div class="email color-grey-dark">{{ teacher.email }}</div>
          </div>
        </div>

        <!-- FORM AREA  -->
        <div class="form-area mgt-25">
          <div class="form-group compact-row w-100 mgb-25">
            <label for="schoolPhone" class="label-compact label-sm">
              Class
            </label>
            <select
              name="class"
              id="class"
              class="form-control"
              v-model="assigned_class"
            >
              <option value="" disabled>Select Class</option>
              <option
                :value="level.id"
                v-for="(level, index) in option.classes"
                :key="index"
              >
                {{ level.name }}
              </option>
            </select>
          </div>

          <div>
            <div class="label color-grey-dark font-weight-700 mgb-5">
              SUBJECT(S)
            </div>

            <div class="options-container mgb-15">
              <div
                v-if="!assigned_subjects.length && assigned_class && false"
                class="
                  color-ash
                  gfont-13
                  text-center
                  mx-auto
                  mt-2
                "
              >
                No subject assigned in {{ getCurrentClass.name }}
              </div>

              <div
                class="option-button rounded-18"
                v-for="(subject, index) in assigned_subjects"
                :key="index"
                @click="removeSubject(index)"
              >
                <span class="gfont-12 color-text mgr-10">{{
                  subject.name
                }}</span>
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

            <div class="position-relative">
              <post-selector
                v-if="show_subject_options"
                multi_select
                :pre_selected="assigned_subjects"
                :data_set="getTeacherSubjects"
                @resolveSelection="updateSubjectSelection"
                @hideDropdown="show_subject_options = false"
              />
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-end mgb-10 pdt-0">
        <button
          @click="$emit('closeTriggered')"
          class="btn modal-btn transparent-bg no-shadow color-text mgr-5"
        >
          Cancel
        </button>

        <button
          class="btn modal-btn btn-accent mgl-5"
          @click="confirmTeacherRole"
          ref="assignBtn"
        >
          Assign
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";
import postSelector from "@/modules/base/components/feed-comps/post-input-comps/post-selector";

export default {
  name: "assignClassModal",

  components: {
    modalCover,
    postSelector,
  },

  props: {
    teacher: {
      type: Object,
      default() {
        return {
          full_name: "Babatunde Calebs",
          email: "calebs_b@gmail.com",
          image: "",
        };
      },
    },

    option: {
      type: Object,
      default() {
        return {
          classes: [],
          subjects: [],
        };
      },
    },
  },

  computed: {
    getTeacherSubjects() {
      return this.option.subjects.map((level) => {
        return {
          ...level,
          id: Number(level.subject_id),
        };
      });
    },

    getSubjectIDs() {
      return this.assigned_subjects.map((subject) => {
        return Number(subject.id);
      });
    },

    teacherRoleForm() {
      return {
        class_id: Number(this.assigned_class),
        subjects: this.getSubjectIDs,
        teacher_id: this.teacher.id,
      };
    },

    getCurrentClass() {
      return this.option.classes.find((level) => {
        return level.id === this.assigned_class;
      });
    },

    getTeacherName() {
      return this.teacher?.full_name
        ? this.teacher.full_name
        : `${this.teacher.firstname} ${this.teacher.lastname}`;
    },
  },

  watch: {
    teacher: {
      handler({ id }) {
        this.fetchTeacherRoles(id);
      },
      deep: true,
      immediate: true,
    },

    assigned_class(class_id) {
      let class_info = this.classes.find((level) => {
        return `${class_id}` === `${level.class_id}`;
      });

      if (class_info)
        this.assigned_subjects = class_info.subjects.map((level) => {
          return { ...level, id: Number(level.subject_id) };
        });
      else this.assigned_subjects = [];
    },
  },

  data() {
    return {
      assigned_class: "",
      assigned_subjects: [],
      classes: [],
      show_subject_options: false,
    };
  },

  methods: {
    ...mapActions({
      assignTeacherRole: "dbTeacher/assignTeacherRole",
      getTeacherRoles: "dbTeacher/getTeacherRoles",
    }),

    fetchTeacherRoles(id) {
      this.getTeacherRoles(id)
        .then((response) => {
          if (response.code === 200) this.classes = response.data.classes;
        })
        .catch((err) => {
          console.log("error getting teacher roles", err);
        });
    },

    setCurrentClass(name) {
      // console.log("stting current class", name);
    },

    showSubjectOptions() {
      this.show_subject_options = true;
      let option_parent = document.querySelector(".modal-cover-body");
      this.$nextTick(() => (option_parent.scrollTop = 150));
    },

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

    validateRoleForm() {
      if (!this.assigned_class) {
        this.pushAlert("Select a class", "error");
        return false;
      }

      if (!this.assigned_subjects.length) {
        this.pushAlert("Select at least one subject", "error");
        return false;
      }

      return true;
    },

    confirmTeacherRole() {
      if (this.validateRoleForm()) {
        this.handleClick("assignBtn", "Assigning...");

        this.assignTeacherRole(this.teacherRoleForm)
          .then((response) => {
            this.handleClick("assignBtn", "Assign", false);

            response.code === 200
              ? this.pushAlert(
                  `${this.getTeacherName} class info successfully updated`,
                  "success"
                )
              : this.pushAlert(
                  "An error occured while assigning teacher to a class",
                  "warning"
                );

            setTimeout(() => {
              this.$emit("closeTriggered");
              this.$bus.$emit("reloadState");
            }, 1000);
          })
          .catch(() => {
            this.handleClick("assignBtn", "Assign", false);
            this.pushAlert(
              "An error occured while assigning teacher to a class",
              "warning"
            );
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.teacher-info-row {
  @include flex-row-start-nowrap;
  margin-top: toRem(5);
  .avatar {
    @include square-shape(46);
    margin-right: toRem(12);
  }
  .name {
    @include font-height(14, 21);
    margin-bottom: toRem(2);
  }

  .email {
    @include font-height(12, 16);
  }
}

.form-area {
  .label {
    @include font-height(12, 19);
  }
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

.modal-cover-body {
  scroll-behavior: smooth;
  max-height: 90vh;
}
</style>
