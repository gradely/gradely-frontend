<template>
  <div
    class="
      lesson-recommend-card
      rounded-10
      white-text-bg
      pointer
      smooth-transition
    "
    @click="previewResource"
  >
    <!-- TOP AREA -->
    <div class="top-area rounded-top-10 overflow-hidden">
      <!-- ASSESSMENT TYPE -->
      <div class="assessment-type h-100 w-100" v-if="card_type === 'practice'">
        <div class="image-box position-relative rounded-10">
          <img
            :src="getPracticeThumbnail"
            alt="practiceThumbnail"
            class="w-100 h-100"
          />
        </div>
      </div>

      <!-- VIDEO TYPE -->
      <div
        class="video-type position-relative h-100 w-100"
        v-if="card_type === 'video'"
      >
        <!-- VIDEO BANNER -->
        <img :src="getVideoThumbnail" alt="videoThumbnail" />

        <!-- OVERLAY -->
        <div class="overlay position-absolute w-100 h-100 index-1"></div>

        <!-- PLAY ICON -->
        <div class="play-wrapper index-9">
          <div class="play-icon avatar rounded-circle brand-accent-light-bg">
            <div class="icon icon-play brand-accent"></div>
          </div>
        </div>
      </div>

      <!-- LIVE CLASS TYPE -->
      <div
        class="live-class-type position-relative h-100 w-100 brand-blue-bg"
        v-if="card_type === 'remedial'"
      >
        <!-- LIVE CLASS ICON -->
        <div class="icon icon-live-class white-text"></div>

        <!-- LIVE INDICATOR -->
        <div class="live-indicator rounded-15">
          <div class="indicator rounded-circle mgr-5"></div>
          <div class="text white-text font-weight-700">LIVE</div>
        </div>
      </div>
    </div>

    <!-- BOTTOM AREA -->
    <div class="bottom-area">
      <!-- TITLE -->
      <div class="title brand-navy mgb-7 font-weight-700" :title="getCardTitle">
        {{ getCardTitle }}
      </div>

      <!-- CARD INFO -->
      <div class="card-info">
        <div class="column">
          <div class="icon icon-clock"></div>
          <div class="text">{{ getDuration }}m</div>
        </div>

        <div class="column" :title="getTopicCategory">
          <div class="icon" :class="getCardIcon"></div>
          <div class="text">
            {{ $string.getCapitalizeText(getTopicCategory) }}
          </div>
        </div>
      </div>

      <!-- RECOMMEND ROW -->
      <div class="recommend-row">
        <div class="title-text border-grey-dark mgb-5">RECOMMENDED FOR</div>
        <div class="d-flex justify-content-between align-items-center">
          <!-- CHILDREN COLUMN -->
          <div class="children-column">
            <div class="d-flex justify-content-center align-items-center">
              <template v-for="(child, index) in getStudentState">
                <div
                  class="shape avatar child"
                  :key="index"
                  :title="`${child.firstname} ${child.lastname}`"
                >
                  <img
                    v-if="child.image"
                    :src="child.image"
                    class="avatar-img"
                    :alt="`${child.firstname} ${child.lastname}`"
                  />

                  <div
                    class="avatar-text white-text gfont-11"
                    :class="
                      $color.getProfileBgColor(
                        `${child.firstname} ${child.lastname}`
                      )
                    "
                    v-else
                  >
                    {{
                      $string.getStringInitials(
                        `${child.firstname} ${child.lastname}`
                      )
                    }}
                  </div>
                </div>
              </template>

              <div class="shape counter" v-if="getStudentCount">
                <div class="text">+{{ getStudentCount }}</div>
              </div>
            </div>
          </div>

          <template>
            <div
              v-if="$route.query.tour || isTourAssessment"
              class="share-column pointer rounded-10 smooth-transition ignore"
              :class="
                getTourPosts.includes(resource.reference.tour_id) &&
                'recommended'
              "
            >
              <div
                class="icon ignore"
                :class="
                  getTourPosts.includes(resource.reference.tour_id)
                    ? 'icon-accept'
                    : 'icon-share-fill'
                "
              ></div>
            </div>

            <div
              v-else
              class="share-column pointer rounded-10 smooth-transition ignore"
              :class="resource.is_recommended && 'recommended'"
            >
              <div
                class="icon ignore"
                :class="
                  resource.is_recommended ? 'icon-accept' : 'icon-share-fill'
                "
              ></div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_tutor_resource">
        <tutor-resource-modal
          :resource="resource"
          :students="getStudentState"
          @shareResource="closeModalAndShare"
          @selectStudent="toggleStudentSelection"
          @closeTriggered="toggleTutorResource"
        />
      </transition>

      <transition name="fade" v-if="show_practice_resource">
        <practice-resource-modal
          :resource="resource"
          :students="getStudentState"
          @shareResource="closeModalAndShare"
          @closeTriggered="togglePracticeResource"
        />
      </transition>

      <transition name="fade" v-if="show_video_resource">
        <video-resource-modal
          :resource="resource"
          :students="getStudentState"
          @shareResource="closeModalAndShare"
          @closeTriggered="toggleVideoResource"
        />
      </transition>

      <transition name="fade" v-if="show_student_selection">
        <student-selection-modal
          :students="getStudentState"
          @closeTriggered="toggleStudentSelection"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import STUDENTS from "@/store/general/students";

export default {
  name: "lessonRecommendCard",

  components: {
    practiceResourceModal: () =>
      import(
        /* webpackChunkName: 'modal'*/ "@/modules/base/modals/assessment-review/practice-resource-modal"
      ),
    tutorResourceModal: () =>
      import(
        /* webpackChunkName: 'modal'*/ "@/modules/base/modals/assessment-review/tutor-resource-modal"
      ),
    videoResourceModal: () =>
      import(
        /* webpackChunkName: 'modal'*/ "@/modules/base/modals/assessment-review/video-resource-modal"
      ),
    studentSelectionModal: () =>
      import(
        /* webpackChunkName: 'modal'*/ "@/modules/base/modals/assessment-review/student-selection-modal"
      ),
  },

  props: {
    resource: {
      type: Object,
      default: () => ({
        title: "Lesson Resource",
        type: "practice",
        duration: "5",
      }),
    },
    students: Array,
  },

  computed: {
    isTourAssessment() {
      let tour_titles = [
        "Gradely Tour",
        "Gradely Tour Session",
        "Gradely Class Tour",
        "Class Tour",
        "Gradely LMS Tour",
      ];

      return tour_titles.includes(this.$route.query.title) ? true : false;
    },

    getTourPosts() {
      return JSON.parse(localStorage.getItem("tourPosts")) ?? [];
    },

    getCardIcon() {
      if (this.resource.type === "practice") return "icon-bar-chart";
      else if (this.resource.type === "video") return "icon-briefcase";
      else if (this.resource.type === "remedial") return "icon-practice-card";
    },

    getCardTitle() {
      if (this.resource.title) return this.resource.title;
      else {
        if (this.resource.type === "practice") return "Practice Resource";
        else if (this.resource.type === "video") return "Video Lesson Resource";
        else if (this.resource.type === "remedial") return "Remedial resource";
      }
    },

    getStudentState() {
      if (this.$route.query.tour || this.isTourAssessment) {
        if (this.resource.type === "video")
          return [
            this.student_default[0],
            this.student_default[2],
            this.student_default[3],
          ];
        else if (this.resource.type === "remedial")
          return [this.student_default[2], this.student_default[3]];
      } else return this.students;
    },

    getStudentCount() {
      // console.log(this.getStudentState);
      return this.getStudentState.length > 3
        ? this.getStudentState.length - 3
        : false;
    },

    getStudentIds() {
      return this.$route.query.tour || this.isTourAssessment
        ? [null]
        : this.students.map((student) => student?.id);
    },

    getDuration() {
      let duration = this.resource?.duration;
      return duration.includes(":") ? duration : `${duration}:00`;
    },

    getTopicCategory() {
      if (this.resource.type === "video")
        return this.resource?.class?.class_name ?? "Secondary School";
      else if (this.resource.type === "practice")
        return this.resource?.category;
      else return this.resource?.topic?.topic;
    },

    getVideoThumbnail() {
      return (
        this.resource?.reference?.thumbnail ??
        `${this.getAssetBaseURL(
          "cloud",
          "richy-jones"
        )}/image/upload/v1651006816/Rectangle_12957.png`
      );
    },

    getPracticeThumbnail() {
      return (
        this.resource?.topic[0]?.image ??
        `${this.getAssetBaseURL(
          "cloud",
          "richy-jones"
        )}/image/upload/v1651006794/Rectangle_297.png`
      );
    },

    getTypeId() {
      if (["video", "remedial"].includes(this.resource.type))
        return {
          resource_id: this.resource?.reference?.id,
          topic_id: this.resource?.topic?.id,
          subject_id: this.resource?.topic?.subject_id,
          tour_id: this.resource?.reference?.tour_id,
        };
      else
        return {
          resource_id: null,
          topic_id: this.resource?.topic[0]?.id,
          subject_id: this.resource?.topic[0]?.subject_id,
        };
    },
  },

  data() {
    return {
      card_type: this.resource.type,
      show_tutor_resource: false,
      show_student_selection: false,
      show_practice_resource: false,
      show_video_resource: false,

      student_default: STUDENTS,

      form: {
        title: this.resource.title,
        type: this.resource.type,
        tag: this.resource?.type === "video" ? "video" : "none",
        resource_id: this.getTypeId?.resource_id,
        subject_id: this.getTypeId?.subject_id,
        topic_id: this.getTypeId?.topic_id,
        receivers_source_type: "class",
        receivers_source_id: +this.$route.params.id,
        receivers_type: this.getStudentIds?.length > 1 ? "single" : "multiple",
        receivers: this.getStudentIds,
      },
    };
  },

  methods: {
    ...mapActions({ shareResources: "dbAssessments/shareResources" }),

    toggleTutorResource() {
      this.show_tutor_resource = !this.show_tutor_resource;
    },

    togglePracticeResource() {
      this.show_practice_resource = !this.show_practice_resource;
    },

    toggleVideoResource() {
      this.show_video_resource = !this.show_video_resource;
    },

    toggleStudentSelection() {
      this.show_student_selection = !this.show_student_selection;
    },

    previewResource($event) {
      if (!$event.target.classList.contains("ignore")) {
        if (this.card_type === "remedial") this.toggleTutorResource();
        else if (this.card_type === "practice") this.togglePracticeResource();
        else if (this.card_type === "video") this.toggleVideoResource();
      } else if (
        $event.target.classList.contains("ignore") &&
        this.card_type === "remedial"
      ) {
        this.toggleTutorResource();
      } else {
        this.recommendResource();
      }
    },

    closeModalAndShare(datetime = null) {
      if (datetime) this.form.availability = datetime;

      this.show_video_resource = false;
      this.show_tutor_resource = false;
      this.show_practice_resource = false;

      this.recommendResource();
    },

    recommendResource() {
      this.form.resource_id = this.getTypeId?.resource_id;
      this.form.subject_id = this.getTypeId?.subject_id;
      this.form.topic_id = this.getTypeId?.topic_id;
      this.form.receivers = this.getStudentIds;

      if (this.isTourAssessment) {
        let posts = this.getTourPosts;

        if (posts.includes(this.getTypeId?.tour_id)) {
          this.pushAlert("Resource recommended already", "warning");
        } else {
          posts.push(this.getTypeId?.tour_id);
          localStorage.setItem("tourPosts", JSON.stringify(posts));

          this.pushAlert("Class resource recommended successfully", "success");

          this.goToFeed();
        }
      } else {
        this.shareResources(this.form)
          .then((response) => {
            if (response.code === 200) {
              this.pushAlert(
                "Class resource recommended successfully",
                "success"
              );

              this.goToFeed();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    goToFeed() {
      setTimeout(
        () =>
          this.$router.push({
            name: "GradelyFeeds",
            params: { id: this.$route.params.id },
            query: this.$route.query.tour ? { completed_tour: true } : null,
          }),
        2000
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.lesson-recommend-card {
  box-shadow: toRem(1) toRem(1) toRem(4) rgba($brand-black, 0.15);
  position: relative;
  margin: 0 toRem(4);
  min-width: toRem(245);
  width: toRem(245);

  @include breakpoint-down(sm) {
    min-width: toRem(235);
    width: toRem(235);
  }

  @include breakpoint-down(xs) {
    min-width: toRem(225);
    width: toRem(225);
  }

  &:first-of-type {
    margin-left: 0;
  }

  .top-area {
    height: toRem(155);

    @include breakpoint-down(sm) {
      height: toRem(145);
    }

    .assessment-type {
      background: lighten($brand-navy, 7%);
      @include flex-row-center-nowrap;

      .image-box {
        @include square-shape(116);

        @include breakpoint-down(sm) {
          @include square-shape(106);
        }

        img {
          @include background-cover;
        }
      }
    }

    .video-type {
      img {
        @include background-cover;
      }

      .overlay {
        @include background-cover;
        background: linear-gradient(
          0deg,
          rgba($black-text, 0.5),
          rgba($black-text, 0.5)
        );
      }

      .play-wrapper {
        @include center-placement;

        .play-icon {
          @include square-shape(34);

          .icon {
            @include center-placement;
            font-size: toRem(16);
            margin-left: toRem(1.25);
          }
        }
      }
    }

    .live-class-type {
      .icon {
        font-size: toRem(50);
        @include center-placement;

        @include breakpoint-down(sm) {
          font-size: toRem(45);
        }

        @include breakpoint-down(xs) {
          font-size: toRem(42);
        }
      }

      .live-indicator {
        position: absolute;
        z-index: 1;
        left: toRem(10);
        bottom: toRem(10);
        padding: toRem(6) toRem(12.5);
        @include flex-row-center-nowrap;
        background: rgba($black-text, 0.3);

        .indicator {
          @include square-shape(11);
          border: toRem(3.5) solid $brand-tonic;
          position: relative;
          top: toRem(1);
        }

        .text {
          font-size: toRem(10.5);
          letter-spacing: 0.03em;

          @include breakpoint-down(xs) {
            font-size: toRem(10);
          }
        }
      }
    }
  }

  .bottom-area {
    padding: toRem(10);

    @include breakpoint-down(xs) {
      padding: toRem(8.5);
    }

    .title {
      @include font-height(12.75, 18);
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

      @include breakpoint-down(sm) {
        @include font-height(12.5, 18);
      }

      @include breakpoint-down(xs) {
        @include font-height(12.25, 18);
      }
    }

    .card-info {
      @include flex-row-start-nowrap;
      margin-bottom: toRem(24);

      @include breakpoint-down(xs) {
        margin-bottom: toRem(18);
      }

      .column {
        @include flex-row-start-nowrap;
        max-width: 68%;

        &:first-of-type {
          margin-right: toRem(12);
        }

        .icon {
          margin-right: toRem(8);
          color: $brand-inverse;
          font-size: toRem(16.5);

          @include breakpoint-down(sm) {
            margin-right: toRem(6);
            font-size: toRem(15.5);
          }
        }

        .text {
          color: $border-grey-dark;
          font-size: toRem(12);
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;

          @include breakpoint-down(sm) {
            font-size: toRem(11.25);
          }
        }
      }
    }

    .recommend-row {
      .title-text {
        @include font-height(10.25, 15);

        @include breakpoint-down(xs) {
          @include font-height(9.5, 13);
        }
      }

      .children-column {
        .shape {
          position: relative;
          @include square-shape(25);
          margin: 0 toRem(2.5);
          background: $color-white;
          border-radius: toRem(10);
          color: $color-grey-dark;

          @include breakpoint-down(xs) {
            @include square-shape(24);
          }

          .text {
            @include center-placement;
            font-size: toRem(11.5);

            @include breakpoint-down(xs) {
              font-size: toRem(11);
            }
          }

          &:first-of-type {
            margin-left: 0;
          }
        }
      }

      .share-column {
        position: relative;
        padding: toRem(12);
        @include rectangle-shape(36, 34);
        border: toRem(1) solid $brand-accent;
        background: $brand-accent-light;

        &:hover {
          border: toRem(1) solid $brand-inverse;
          background: $brand-inverse-light;
        }

        .icon {
          @include center-placement;
          font-size: toRem(16);
          color: $brand-navy;
        }
      }

      .recommended {
        border: toRem(1) solid #24ae5f;
        background: $brand-green-light;

        .icon {
          font-size: toRem(19);
          color: #24ae5f;
        }
      }
    }
  }
}
</style>