<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    :show_close_btn="$route.name === 'GradelyFeeds' ? false : true"
    :modal_style="{ size: 'modal-sm-md' }"
    :trigger_self_close="false"
  >
    <!-- MODAL COVER HEADER -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header mgb-5 mgt-22">
        <div class="title text-center font-weight-600 brand-navy mgb-10">
          {{
            $route.name === "GradelyFeeds"
              ? "No Subject Assigned"
              : "Class Subjects List"
          }}
        </div>

        <div class="meta text-center color-text">
          Kindly select the subject (s) you will be teaching this class.
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <!-- SEARCH SUBJECTS -->
        <div class="search-block position-relative w-100">
          <input
            type="search"
            class="form-control"
            v-model="filter_text"
            placeholder="Find subject by name"
            @input="searchSubject"
          />

          <div class="icon icon-search index-1 brand-accent"></div>
        </div>

        <div class="subject-selection-block mgb-5 pdb-0">
          <template v-if="subjects.length">
            <subject-name-card
              v-for="(subject, index) in subjects"
              :key="index"
              :subject="subject"
              :index="index"
              @clicked="selectSubject"
              subject_index
            />
          </template>

          <template v-else>
            <div
              class="default-subject-card skeleton-loader"
              v-for="(_, index) in 8"
              :key="index"
            ></div>
          </template>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer mgb-17 pdt-0">
        <!-- SELECTION COUNTER  -->
        <!-- <div class="selection-counter mgb-20">
          <div class="count color-text font-weight-600 mgr-5 smooth-transition">
            {{ getActiveSubjectLength }}
          </div>
          <div class="text color-grey-dark">Subjects Selected</div>
        </div> -->

        <!-- SHOW MORE -->
        <div class="d-flex justify-content-center">
          <div
            class="show-more pointer smooth-transition"
            v-if="showMoreFilter"
            @click="toggle_more = !toggle_more"
          >
            Show {{ toggle_more ? "Less" : "More" }} Subjects
          </div>
        </div>

        <div
          class="d-flex flex-column justify-content-center align-items-center"
        >
          <button
            class="btn modal-btn btn-accent"
            ref="saveBtn"
            @click="saveSubject"
            :disabled="isDisabled"
          >
            Save Subjects
          </button>

          <!-- SWITCH TO ANOTHER CLASS -->
          <div
            v-if="false"
            @click="$emit('switchClass')"
            class="btn-link link-no-underline text-center mgt-25"
          >
            Switch Classes
          </div>
        </div>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";
import subjectNameCard from "@/modules/onboarding/components/global-comps/subject-name-card";

export default {
  name: "selectSubjectModal",

  components: {
    modalCover,
    subjectNameCard,
  },

  props: {
    class_id: Number,
    global_class_id: Number,
    teacher_id: Number,
    assigned_subject: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    isDisabled() {
      return this.subjects.every((subject) => subject.active === false);
    },

    getActiveSubjectLength() {
      return this.subjects.filter((subject) => subject.active).length;
    },

    showMoreFilter() {
      if (!this.filter_text) {
        return this.subject_repo.length > this.min_subject ? true : false;
      }
    },
  },

  data: () => ({
    is_loading: true,
    filter_text: "",
    min_subject: 12,
    toggle_more: false,

    subject_repo: [],
    subjects: [],
  }),

  watch: {
    toggle_more(value) {
      this.toggleMoreSubjects(value);
    },
  },

  mounted() {
    this.fetchAllSubjects();
  },

  methods: {
    ...mapActions({
      getAllSubjectsInTeacherClass: "general/getAllSubjectsInTeacherClass",
      schoolUpdateTeacherSubjects: "general/schoolUpdateTeacherSubjects",
      updateTeacherSubjects: "general/updateTeacherSubjects",
    }),

    fetchAllSubjects() {
      this.getAllSubjectsInTeacherClass(this.global_class_id)
        .then((response) => {
          // response.data.length ? this.compareSubjectList(response.data) : null;

          if (response.data.length) {
            response.data.map((subject) => {
              this.subject_repo.push({
                id: subject.id,
                name: subject.name,
                active: false,
              });
            });

            this.checkSubjectLength();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    checkSubjectLength() {
      let clone = [...this.subject_repo];

      this.subjects =
        this.subject_repo.length > this.min_subject
          ? clone.splice(0, this.min_subject)
          : this.subject_repo;

      this.compareSubjectList(this.subjects);
    },

    toggleMoreSubjects(show) {
      let clone = [...this.subject_repo];
      this.subjects = show
        ? this.subject_repo
        : clone.splice(0, this.min_subject);

      this.compareSubjectList(this.subjects);

      console.log(this.subjects);
    },

    searchSubject() {
      if (this.filter_text.length)
        this.subjects = this.subject_repo.filter((subject) =>
          subject.name.toLowerCase().includes(this.filter_text.toLowerCase())
        );
      else this.checkSubjectLength();
    },

    compareSubjectList(subjects) {
      this.subjects = [];

      subjects.map((subject) => {
        if (
          this.assigned_subject?.some(
            (assign) => assign.id === subject.id || subject.active
          )
        ) {
          subject.active = true;
          this.subjects.push(subject);
        } else {
          subject.active = false;
          this.subjects.push(subject);
        }
      });
    },

    selectSubject(subject_index) {
      this.subjects[subject_index].active =
        !this.subjects[subject_index].active;
    },

    saveSubject() {
      this.handleClick("saveBtn", "Saving...");

      let payload = {
        subjects: this.subjects
          .filter((subject) => subject.active === true)
          .map((subject) => subject.id),

        subject_ids: this.subjects
          .filter((subject) => subject.active === true)
          .map((subject) => subject.id),

        class_id: this?.class_id || +this?.$route?.params?.id,
        teacher_id: this.teacher_id,
      };

      let action =
        this.getAuthType === "school"
          ? "schoolUpdateTeacherSubjects"
          : "updateTeacherSubjects";

      this.getAuthType === "school"
        ? delete payload.subject_ids
        : delete payload.subjects;

      this[action](payload)
        .then((response) => {
          this.handleClick("saveBtn", "Save Subject", false);

          if (response.code === 200) {
            this.pushAlert(
              "Class subject list updated successfully",
              "success"
            );

            if (this.$route.name === "GradelyFeeds") {
              this.$emit("reloadClasses");
              this.$emit("closeTriggered");
            } else {
              this.$bus.$emit("remountSubjects");
              this.$emit("closeTriggered");
            }
          } else {
            this.pushAlert("Updating class subject list failed", "warning");
          }
        })
        .catch(() =>
          this.pushAlert(
            "An error occured while updating class subject list",
            "error"
          )
        );
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  min-height: 20vh;
  height: auto;
  max-height: 50vh;

  @include breakpoint-down(sm) {
    max-height: 50vh;
  }
}

.modal-cover-header {
  .title {
    @include font-height(17.25, 24);
  }

  .meta {
    @include font-height(13, 19);
  }
}

.modal-cover-footer {
  .btn {
    padding: toRem(14) toRem(34);
  }

  .btn-link {
    @include font-height(14, 18);
  }
}

.search-block {
  margin-bottom: toRem(30);

  .form-control {
    border-top: 0;
    border-left: 0;
    border-right: 0;
    padding-left: toRem(38);
    border-radius: 0;
    font-size: toRem(12.75);
  }

  .icon {
    @include center-y;
    font-size: toRem(20);
    left: toRem(6);
  }
}

.subject-selection-block {
  @include flex-row-center-wrap;
  align-items: flex-start;

  .default-subject-card {
    margin: 0 toRem(4) toRem(10);
    border-radius: toRem(20);
    width: toRem(150);
    height: toRem(35);
    overflow: hidden;
  }
}

.show-more {
  width: max-content;
  font-size: toRem(12.65);
  margin: toRem(15) auto toRem(20);
  color: $color-grey-dark;
  border-bottom: toRem(1) solid $border-grey;

  &:hover {
    color: $brand-accent !important;
    border-bottom: toRem(1) solid $brand-accent;
  }
}

.selection-counter {
  padding-top: toRem(20);
  @include flex-row-center-nowrap;

  .count {
    @include font-height(15, 22);

    @include breakpoint-down(xs) {
      @include font-height(14, 20);
    }
  }

  .text {
    @include font-height(13, 17);

    @include breakpoint-down(lg) {
      @include font-height(12, 16);
    }

    @include breakpoint-down(xs) {
      @include font-height(11.75, 15);
    }
  }
}
</style>
