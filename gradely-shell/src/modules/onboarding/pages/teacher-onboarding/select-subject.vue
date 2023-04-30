<template>
  <div class="select-subject">
    <onboarding-nav-layout show_back>
      <template slot="content">
        <div>
          <!-- TITLE TEXT  -->
          <div
            class="
              onboarding-title-text
              text-center
              font-weight-600
              brand-navy
              mgt-18
            "
          >
            Select Subject(s)
          </div>

          <div class="content-wrapper mgt-25 mx-auto">
            <!-- SEARCH SUBJECTS -->
            <div class="search-block position-relative w-100">
              <input
                type="search"
                v-model="filter_text"
                placeholder="Find subject by name"
                @input="searchSubject"
              />

              <div class="icon icon-search index-1 brand-accent"></div>
            </div>

            <!-- SUBJECT SELECTION BLOCK  -->
            <div class="subject-selection-block mgb-20 smooth-animation">
              <template v-if="is_loading">
                <div
                  class="
                    d-flex
                    justify-content-center
                    align-items-center
                    mgb-10
                  "
                >
                  <div
                    class="
                      icon icon-dotted-roller
                      animate
                      brand-accent
                      mgr-10
                      gfont-17
                    "
                  ></div>

                  <div class="text color-grey-dark gfont-13">
                    Loading subject list
                  </div>
                </div>
              </template>

              <template v-else>
                <template v-if="subjects.length">
                  <subject-name-card
                    v-for="(subject, index) in subjects"
                    :key="index"
                    :subject="subject"
                    @clicked="selectSubject(index)"
                  />
                </template>

                <template v-else>
                  <div class="empty-subject-state mgb-20">
                    <img
                      v-lazy="
                        `${getAssetBaseURL(
                          'cloud',
                          'gradely'
                        )}/image/upload/v1639028997/Empty_xful2j.svg`
                      "
                      alt=""
                    />

                    <div class="text color-grey-dark gfont-14">
                      No subject found
                    </div>
                  </div>
                </template>
              </template>
            </div>

            <!-- SHOW MORE -->
            <div
              class="show-more pointer smooth-transition"
              v-if="showMoreFilter"
              @click="toggle_more = !toggle_more"
            >
              Show {{ toggle_more ? "Less" : "More" }} Subjects
            </div>

            <!-- CREATE NEW SUBJECT -->
            <div
              class="create-new-subject mgb-30 smooth-transition pointer"
              @click="toggleSubjectModal"
            >
              <div class="avatar add-icon brand-inverse-bg">
                <div class="icon icon-plus white-text"></div>
              </div>

              <div class="text color-text font-weight-600 smooth-transition">
                Create your Subject
              </div>
            </div>

            <!-- CONFIRM BUTTON  -->
            <button
              class="btn btn-accent mgb-2"
              ref="confirmBtn"
              @click="confirmSubject"
            >
              Confirm Subject
            </button>
          </div>
        </div>
      </template>
    </onboarding-nav-layout>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_subject_modal">
        <create-new-subject-modal
          @reloadSubject="fetchAllSubjects"
          @closeTriggered="toggleSubjectModal"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import onboardingNavLayout from "@/modules/onboarding/components/global-comps/onboarding-nav-layout";
import subjectNameCard from "@/modules/onboarding/components/global-comps/subject-name-card";

export default {
  name: "selectSubject",

  metaInfo: {
    title: "Select Subjects",
  },

  components: {
    onboardingNavLayout,
    subjectNameCard,
    createNewSubjectModal: () =>
      import(
        /* webpackChunkName: 'modal' */ "@/modules/onboarding/pages/teacher-onboarding/create-new-subject-modal"
      ),
  },

  computed: {
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

    show_subject_modal: false,
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
      updateTeacherSubjects: "general/updateTeacherSubjects",
      updateOnboarding: "onboarding/updateOnboarding",
    }),

    toggleSubjectModal() {
      this.show_subject_modal = !this.show_subject_modal;
    },

    fetchAllSubjects() {
      this.getAllSubjectsInTeacherClass(this.$route.params.global_class_id)
        .then((response) => {
          this.is_loading = false;

          if (response.data.length) {
            response.data.map((subject) => {
              this.subject_repo.push({
                id: subject.id,
                name: subject.name,
                active: false,
              });
            });

            // CHECK SUBJECT REPO LENGTH
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
    },

    toggleMoreSubjects(show) {
      let clone = [...this.subject_repo];
      this.subjects = show
        ? this.subject_repo
        : clone.splice(0, this.min_subject);
    },

    searchSubject() {
      if (this.filter_text.length)
        this.subjects = this.subject_repo.filter((subject) =>
          subject.name.toLowerCase().includes(this.filter_text.toLowerCase())
        );
      else this.checkSubjectLength();
    },

    selectSubject(index) {
      this.subjects[index].active = !this.subjects[index].active;
    },

    confirmSubject() {
      this.handleClick("confirmBtn", "Saving...");

      let payload = {
        subject_ids: this.subject_repo
          .filter((subject) => subject.active === true)
          .map((subject) => subject.id),

        class_id: +this?.$route?.params?.class_id,
      };

      this.updateTeacherSubjects(payload)
        .then(async (response) => {
          this.handleClick("confirmBtn", "Confirm Subject", false);

          if (response.code === 200) {
            await this.updateOnboarding();
            this.pushAlert(
              "Class subject list updated successfully",
              "success"
            );

            setTimeout(() => {
              this.$router.push({ path: `/feed/${payload.class_id}` });
            }, 1500);
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
.select-subject {
  .onboarding-title-text {
    font-size: toRem(19);

    @include breakpoint-down(sm) {
      font-size: toRem(16.5);
      margin-top: toRem(-3) !important;
    }
  }

  .content-wrapper {
    @include flex-column-center;
    justify-content: flex-start;
    width: 90%;

    @include breakpoint-down(sm) {
      width: 100%;
    }

    .search-block {
      margin-bottom: toRem(30);

      .form-control {
        border-top: 0;
        border-left: 0;
        border-right: 0;
        padding-left: toRem(38);
        border-radius: 0;
        font-size: toRem(13.5);
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
    }

    .show-more {
      font-size: toRem(12.65);
      margin-bottom: toRem(30);
      color: $color-grey-dark;
      border-bottom: toRem(1) solid $border-grey;
      padding-bottom: toRem(-1);

      &:hover {
        color: $brand-accent !important;
        border-bottom: toRem(1) solid $brand-accent;
      }
    }

    .create-new-subject {
      @include flex-row-center-nowrap;

      .add-icon {
        @include square-shape(22);
        margin-right: toRem(10);

        .icon {
          @include center-placement;
          font-size: toRem(14);
        }
      }

      .text {
        font-size: toRem(13);

        &:hover {
          color: $brand-accent !important;
        }
      }
    }

    .selection-counter {
      @include flex-row-center-nowrap;

      .count {
        @include font-height(17.5, 22);

        @include breakpoint-down(lg) {
          @include font-height(17, 21);
        }

        @include breakpoint-down(xs) {
          @include font-height(16, 20);
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

    .btn {
      width: 60%;
      font-size: toRem(11);
      padding: toRem(13) toRem(28);

      @include breakpoint-down(lg) {
        font-size: toRem(10.5);
        padding: toRem(12) toRem(28);
      }
    }
  }
}
</style>
