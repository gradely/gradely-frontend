<template>
  <div class="post-input-state smooth-transition">
    <!-- POST TOP -->
    <div class="post-top">
      <!-- POST TITLE TEXT -->
      <div class="post-title-text">CREATE ASSESSMENT</div>

      <!-- POST TOP ROW -->
      <div class="post-top-row">
        <div class="avatar">
          <img
            v-lazy="getAuthUser.image"
            :alt="$string.getStringInitials(getAuthUser.full_name)"
            class="avatar-img"
            v-if="getAuthUser.image"
          />

          <div
            v-else
            class="avatar-text"
            :class="$color.getProfileBgColor(getAuthUser.full_name)"
          >
            {{ $string.getStringInitials(getAuthUser.full_name) }}
          </div>
        </div>

        <div class="wrapper w-100">
          <!-- ASSESSMENT TAGS -->
          <div class="assessment-tag-row">
            <div
              class="tag-card smooth-transition"
              :class="form.tag === 'homework' ? 'active-card' : null"
              @click="form.tag = 'homework'"
            >
              Homework
            </div>
            <div
              class="tag-card smooth-transition"
              :class="form.tag === 'exam' ? 'active-card' : null"
              @click="form.tag = 'exam'"
            >
              Exam
            </div>
            <div
              class="tag-card smooth-transition"
              :class="form.tag === 'quiz' ? 'active-card' : null"
              @click="form.tag = 'quiz'"
            >
              Class Quiz
            </div>
          </div>

          <!-- POST INPUT -->
          <div
            class="extended-textarea rounded-12"
            role="textbox"
            ref="inputBox"
            contenteditable
            @paste="handleEditablePasteEvent($event)"
          ></div>
        </div>
      </div>

      <!-- ASSESSEMENT SUBJECT-->
      <div class="post-input-field">
        <div class="icon icon-book-cover"></div>

        <!-- INPUT BOX -->
        <div class="input-box">
          <div class="select-input" @click="toggleSubject">
            <!-- INPUT -->
            <div class="single-line">
              <div class="input-title">Subject:</div>
              <div class="input-entry">
                {{
                  selected_subject.length
                    ? selected_subject[0].name
                    : "Select a subject"
                }}
              </div>
            </div>

            <div
              class="icon icon-caret-down"
              :class="{ 'rotate-180': show_subject_dropdown }"
            ></div>
          </div>

          <!-- POST SUBJECT SELECTOR -->
          <post-selector
            v-if="show_subject_dropdown"
            :multi_select="false"
            :pre_selected="selected_subject"
            :data_set="subject_list"
            @resolveSelection="processSubjectSelection"
            @hideDropdown="toggleSubject"
          />
        </div>
      </div>

      <!-- ASSESSMENT PERIOD -->
      <div class="post-input-field">
        <div class="icon icon-calendar"></div>

        <div class="input-box">
          <div class="form-input">
            <div class="input-title">Assessment Period:</div>

            <!-- FORM ROW -->
            <div class="form-data-row w-100">
              <!-- START TIME -->
              <div class="period-input">
                <div class="label-text">Start</div>

                <!-- <div class="form-input-wrapper">
                  <date-picker
                    v-model="open_datetime"
                    type="datetime"
                    valueType="format"
                    input-class="form-control"
                    format="YYYY-MM-DD h:mm a"
                    :showSecond="false"
                    :disabled-date="disabledBeforeToday"
                  ></date-picker>

                  <div class="icon icon-calendar"></div>
                </div> -->

                <input
                  type="datetime-local"
                  v-model="open_datetime"
                  :min="open_datetime"
                  class="form-control"
                />
              </div>

              <!-- END TIME -->
              <div class="period-input">
                <div class="label-text">End</div>
                <input
                  type="datetime-local"
                  v-model="close_datetime"
                  :min="open_datetime"
                  class="form-control"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ASSIGNED CLASSES-->
      <div class="post-input-field">
        <div class="icon icon-teacher-class"></div>

        <!-- INPUT BOX -->
        <div class="input-box">
          <div class="select-input" @click="toggleClassList">
            <!-- INPUT -->
            <div>
              <div class="input-title">Assigned Class:</div>

              <div
                class="
                  d-flex
                  justify-content-start
                  align-items-start
                  flex-wrap
                  mgt-8
                "
                v-if="selected_class.length"
              >
                <select-view-card
                  v-for="(item, index) in selected_class"
                  :key="index"
                  :detail="item"
                  @removeSelection="removeClass"
                />
              </div>
            </div>

            <div
              class="icon icon-caret-down"
              :class="{ 'rotate-180': show_class_dropdown }"
            ></div>
          </div>

          <!-- POST CLASS SELECTOR -->
          <post-selector
            v-if="show_class_dropdown"
            :pre_selected="selected_class"
            :data_set="class_list"
            @resolveSelection="processClassSelection"
            @hideDropdown="toggleClassList"
          />
        </div>
      </div>

      <!-- ASSIGNED STUDENTS-->
      <div class="post-input-field">
        <div class="icon icon-group-users"></div>

        <!-- INPUT BOX -->
        <div class="input-box">
          <div class="select-input" @click="toggleStudentList">
            <!-- INPUT -->
            <div>
              <div class="input-title">Assigned Students:</div>

              <div
                class="
                  d-flex
                  justify-content-start
                  align-items-start
                  flex-wrap
                  mgt-8
                "
                v-if="selected_student.length"
              >
                <select-view-card
                  v-for="(item, index) in selected_student"
                  :key="index"
                  :detail="item"
                  @removeSelection="removeStudent"
                />
              </div>

              <div class="input-entry mgt-4" v-else>All Student</div>
            </div>

            <div
              class="icon icon-caret-down"
              :class="{ 'rotate-180': show_student_dropdown }"
            ></div>
          </div>

          <!-- POST SELECTOR -->
          <post-selector
            v-if="show_student_dropdown"
            show_image
            :pre_selected="selected_student"
            :data_set="student_list"
            @resolveSelection="processStudentSelection"
            @hideDropdown="toggleStudentList"
          />
        </div>
      </div>
    </div>

    <!-- POST BOTTOM -->
    <div
      class="post-bottom d-flex justify-content-end"
      :class="on_modal ? 'bg-transparent' : null"
    >
      <!-- RIGHT COLUMN -->
      <div class="right-column">
        <template v-if="!show_delete">
          <div
            class="icon icon-trash"
            title="Close"
            @click="$emit('closeOpenState')"
          ></div>

          <div class="line"></div>
        </template>

        <button
          class="btn btn-accent rounded-17"
          ref="continueBtn"
          @click="continueToLMS"
        >
          CONTINUE
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { EXTERNAL_URL } from "@/env";
import { mapGetters, mapActions } from "vuex";
import DatePicker from "vue2-datepicker";
import postSelector from "@/modules/base/components/feed-comps/post-input-comps/post-selector";
import selectViewCard from "@/modules/base/components/feed-comps/post-input-comps/select-view-card";

export default {
  name: "postAssessmentState",

  components: {
    DatePicker,
    postSelector,
    selectViewCard,
  },

  props: {
    show_delete: {
      type: Boolean,
      default: false,
    },

    on_modal: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters({
      getTeacherSubjectList: "general/getTeacherSubjectList",
      getTeacherClassList: "general/getTeacherClassList",
    }),
  },

  watch: {
    $route: {
      handler() {
        this.loadCurrentRouteClassSelection();
      },
    },

    getTeacherSubjectList: {
      handler(value) {
        this.loadTeacherSubject(value);
      },
      immediate: true,
    },

    selected_subject: {
      handler() {
        this.loadClassesLinkedToSubject();
      },
    },

    getTeacherClassList: {
      handler(value) {
        this.loadTeacherClass(value.classes);
      },
      immediate: true,
    },

    class_list: {
      handler() {
        this.loadCurrentRouteClassSelection();
      },
      immediate: true,
    },

    selected_class: {
      handler(value) {
        if (value.length > 1) {
          this.selected_student = [];
          this.pushAlert(
            "Individual student selection is not possible on multiple class selection",
            "warning"
          );
        }
      },
    },

    selected_student: {
      handler(value) {
        if (value.length) {
          this.loadCurrentRouteClassSelection();
          this.pushAlert(
            "Multiple class selection is not possible on individual student selection",
            "warning"
          );
        }
      },
    },
  },

  data: () => ({
    show_subject_dropdown: false,
    show_class_dropdown: false,
    show_student_dropdown: false,

    subject_list: [],
    selected_subject: [],

    class_list: [],
    selected_class: [],

    student_list: [],
    selected_student: [],

    open_datetime: "",
    close_datetime: "",

    form: {
      title: null,
      subject_id: null,
      class_id: [],
      tag: "homework",
      open_date: "",
      close_date: "",
      view_by: "class",
      description: "",
      is_proctor: 0,
      selected_student: 0,
      selected_student_id: [],
    },
  }),

  mounted() {
    this.$refs.inputBox.focus();
    this.prefilledDate();
    this.loadClassStudents();
  },

  methods: {
    ...mapActions({
      getMembers: "dbMembers/getMembers",
      createAssessment: "dbFeeds/createAssessment",
      getClassesAssignedSubject: "general/getClassesAssignedSubject",
    }),

    // disabledBeforeToday(date) {
    //   const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    //   return date < yesterday;
    // },

    // LOAD NEW SUBJECT SETUP
    loadTeacherSubject(subjects) {
      subjects.map((subject) => {
        this.subject_list.push({
          id: subject.subject_id,
          name: subject.name,
          image: null,
          selected: false,
        });
      });
    },

    // LOAD NEW CLASS SETUP
    loadTeacherClass(classes) {
      this.class_list = [];
      classes.map((class_data) => this.setupList(class_data, this.class_list));
    },

    loadClassesLinkedToSubject() {
      if (this.selected_subject.length) {
        this.class_list = [];

        this.getClassesAssignedSubject(this.selected_subject[0].id).then(
          (response) => {
            response.data.map((item) => {
              let data = {};
              data.id = item.id;
              data.name = item.class_name;
              data.image = null;
              data.selected = false;

              this.class_list.push(data);
            });
          }
        );
      } else this.loadTeacherClass(this.getTeacherClassList.classes);
    },

    loadCurrentRouteClassSelection() {
      this.selected_class = [];

      this.class_list.map((item) => {
        Number(item.id) === Number(this.$route.params.id)
          ? this.selected_class.push(item)
          : null;
      });
    },

    // REMOVE A CLASS FROM SELECTION
    removeClass($event) {
      this.selected_class = this.selected_class.filter(
        (item) => item.id !== $event
      );
    },

    setupList(object_data, list_data) {
      let data = {};
      data.id = object_data.class_id;
      data.name = object_data.class_name;
      data.image = null;
      data.selected = false;

      list_data.push(data);
    },

    // LOAD STUDENTS IN CLASS
    loadClassStudents() {
      let payload = {
        page: 1,
        class_id: this.$route.params.id,
        account: this.getAuthType,
        type: "students",
        search: false,
      };

      this.getMembers(payload)
        .then((response) => {
          response.data.map((student) => {
            let data = {};
            data.id = student.id;
            data.name = `${student.firstname} ${student.lastname}`;
            data.image = student.image;
            data.selected = false;

            this.student_list.push(data);
          });
        })
        .catch(() => this.pushAlert("No student list was found", "warning"));
    },

    // REMOVE A CLASS FROM SELECTION
    removeStudent($event) {
      this.selected_student = this.selected_student.filter(
        (item) => item.id !== $event
      );
    },

    // HANDLE SUBJECT SELECTION
    processSubjectSelection(selection) {
      let selection_index = this.selected_subject.findIndex(
        (item) => item.id === selection.id
      );

      this.selected_subject = selection_index === -1 ? [selection] : [];
    },

    // HANDLE CLASS SELECTION
    processClassSelection(selection) {
      let selection_index = this.selected_class.findIndex(
        (item) => item.id === selection.id
      );

      selection_index === -1
        ? this.selected_class.push(selection)
        : this.selected_class.splice(selection_index, 1);
    },

    processStudentSelection(selection) {
      let selection_index = this.selected_student.findIndex(
        (item) => item.id === selection.id
      );

      selection_index === -1
        ? this.selected_student.push(selection)
        : this.selected_student.splice(selection_index, 1);
    },

    prefilledDate() {
      let open = new Date();
      let year = open.getFullYear(),
        month =
          open.getMonth() + 1 > 9
            ? open.getMonth() + 1
            : `0${open.getMonth() + 1}`,
        day = open.getDate() > 9 ? open.getDate() : `0${open.getDate()}`,
        hours = open.getHours() > 9 ? open.getHours() : `0${open.getHours()}`,
        minutes =
          open.getMinutes() > 9 ? open.getMinutes() : `0${open.getMinutes()}`;

      let close = new Date();
      close.setDate(close.getDate() + 7);

      let close_year = close.getFullYear(),
        close_month =
          close.getMonth() + 1 > 9
            ? close.getMonth() + 1
            : `0${close.getMonth() + 1}`,
        close_day =
          close.getDate() > 9 ? close.getDate() : `0${close.getDate()}`,
        close_hours =
          close.getHours() > 9 ? close.getHours() : `0${close.getHours()}`,
        close_minutes =
          close.getMinutes() > 9
            ? close.getMinutes()
            : `0${close.getMinutes()}`;

      this.open_datetime = `${year}-${month}-${day}T${hours}:${minutes}`;
      this.close_datetime = `${close_year}-${close_month}-${close_day}T${close_hours}:${close_minutes}`;
    },

    // CLEANUP "T" FROM DATE TIME
    cleanUpDate(date) {
      let datetime = date.split("T");
      return `${datetime[0]} ${datetime[1]}`;
    },

    // CREATE ASSESSMENT AND PROCEED TO LMS
    continueToLMS() {
      this.handleClick("continueBtn", "Processing...");

      // 1. GET ALL INPUTS
      this.form.title = this.$refs.inputBox.innerHTML;
      this.form.open_date = this.cleanUpDate(this.open_datetime);
      this.form.close_date = this.cleanUpDate(this.close_datetime);
      this.selected_subject.map(
        (subject) => (this.form.subject_id = subject.id)
      );
      this.selected_class.map((item) => this.form.class_id.push(item.id));
      this.form.class_id = [...new Set(this.form.class_id)];

      // CHECK STUDENT
      if (this.selected_student.length) {
        this.form.selected_student = 1;
        this.selected_student.map((item) =>
          this.form.selected_student_id.push(item.id)
        );
      } else {
        this.form.selected_student = 0;
        this.form.selected_student_id = [null];
      }

      // 2. CHECK EMPTY STATE
      if (!this.form.title) {
        this.pushAlert("Assessment title is required!", "warning");
        this.handleClick("continueBtn", "Continue", false);
        return false;
      }

      if (!this.form.subject_id) {
        this.pushAlert("No class subject was selected!", "warning");
        this.handleClick("continueBtn", "Continue", false);
        return false;
      }

      if (!this.form.class_id.length) {
        this.pushAlert("Please select a class to proceed!", "warning");
        this.handleClick("continueBtn", "Continue", false);
        return false;
      }

      this.createAssessment({ payload: this.form })
        .then((response) => {
          // console.log(response);

          this.handleClick("continueBtn", "Continue", false);

          if (response.code === 200) {
            setTimeout(
              () =>
                (location.href = EXTERNAL_URL(
                  "lms",
                  `/select-question/${response.data.id}`
                )),
              300
            );
          }
          // FAILED CREATION
          else this.pushAlert("Assessment creation failed", "error");
        })
        .catch(() => {
          this.pushAlert("Assessment creation failed", "error");
          this.handleClick("continueBtn", "Continue", false);
        });
    },

    toggleSubject() {
      this.show_subject_dropdown = !this.show_subject_dropdown;
    },

    toggleClassList() {
      this.show_class_dropdown = !this.show_class_dropdown;
    },

    toggleStudentList() {
      this.show_student_dropdown = !this.show_student_dropdown;
    },
  },
};
</script>

<style lang="scss" scoped>
.extended-textarea[contenteditable] {
  border: toRem(1) solid #e5e5e5;
  padding: toRem(10) toRem(12);

  &:empty {
    &::before {
      content: "Give your assessment a name";
    }
  }

  &:focus {
    border: toRem(1) solid $brand-accent;
  }
}

.assessment-tag-row {
  @include flex-row-start-nowrap;
  margin-bottom: toRem(17);

  .tag-card {
    padding: toRem(8) toRem(16);
    border-radius: toRem(35);
    color: $color-grey-dark;
    margin-right: toRem(13);
    font-size: toRem(11.25);
    text-align: center;
    cursor: pointer;
    font-weight: 600;

    &:hover {
      background: $brand-inverse-light;
      border: toRem(1) solid $brand-inverse;
    }
  }

  .active-card {
    background: $brand-accent-light;
    border: toRem(1) solid $brand-accent;
    color: $brand-navy;
  }
}
</style>
