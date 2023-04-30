<template>
  <div class="recommendation-card">
    <div class="avatar-wrapper">
      <img v-lazy="recommendation.thumbnail" alt="reonmmendation" />
      <img v-lazy="staticImg('gradely-tutor.png')" alt="recommendation" />
    </div>
    <div class="recommendation-content">
      <div class="top-data">
        <div class="gfont-13 font-weight-600 mgb-8">{{recommendation.topic}}</div>
        <div class="d-flex gap-2 gfont-12 text-capitalize color-grey-dark">
          <div>{{recommendation.subject_name}}</div>
          <div>•</div>
          <div>{{recommendation.type}}</div>
        </div>
      </div>
      <div class="bottom-data mgt-20">
        <div class="text-uppercase gfont-12 color-grey-dark mgb-8">Recommended For</div>
        <div class="d-flex justify-content-between">
          <div class="d-flex position-relative">
            <div
              class="position-absolute"
              :title="student.name"
              v-for="(student, index) in getStudents"
              :key="index"
              :style="tranformStyle(index)"
            >
              <img class="image-wrapper brand-navy-bg" v-lazy="student.image" v-if="student.image" />
              <div
                class="image-wrapper brand-navy-bg"
                v-else
                :class="[$color.getProfileBgColor(student.name)]"
              >{{$string.getStringInitials(student.name)}}</div>
            </div>
            <div
              v-if="showMore"
              class="image-wrapper border-grey-bg position-absolute gfont-12 color-text"
              :style="tranformStyle(3)"
            >+{{showMoreSize}}</div>
          </div>

          <button class="share-btn" @click="shareLesson">
            <div
              class="icon"
              :class="[sharing && 'icon-dotted-spinner animate', !sharing && 'icon-share-network']"
            ></div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const lesson = createNamespacedHelpers('lesson');
export default {
  name: 'RecommendedCard',

  props: {
    recommendation: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    getLessonThumbnail() {
      return (
        this.recommendation?.thumbnail || this.staticImg('gradely-tutor.png')
      );
    },

    getStudents() {
      return this.recommendation?.Students;
    },

    showMore() {
      return this.recommendation?.Students?.length > 3;
    },

    showMoreSize() {
      return this.recommendation?.Students?.length - 3;
    },

    getRecievers() {
      return this.getStudents.map((student) => Number(student.id));
    },

    getSharePayload() {
      return {
        title: this.recommendation.topic,
        type: this.recommendation.resources_type,
        tag: 'none',
        resource_id: this.recommendation.resource_id,
        subject_id: this.recommendation.subject_id,
        topic_id: this.recommendation.topic_id,
        receivers_source_type: 'class',
        receivers_source_id: this.recommendation.reference_id,
        receivers_type: 'single',
        receivers: this.getRecievers,
      };
    },
  },

  data() {
    return {
      sharing: false,
    };
  },

  methods: {
    ...lesson.mapActions(['shareTeacherRecommendation']),

    tranformStyle(index) {
      let percent_offset = `${100 * index}%`;
      let pixel_offset = `${6 * index}px`;
      return `transform:translateX(calc(${percent_offset} - ${pixel_offset}))`;
    },

    async shareLesson() {
      if (this.sharing) return;

      this.sharing = true;
      try {
        let { code } = await this.shareTeacherRecommendation(
          this.getSharePayload
        );
        this.sharing = false;
        code === 200
          ? this.pushAlert('Recommendation Shared', 'success')
          : this.pushAlert('Failed to share recommendation');
        this.$emit('updateLesson');
      } catch (err) {
        this.sharing = false;
        console.log('Error sharing lesson');
        this.pushAlert('Error sharing recommendation', 'error');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-wrapper {
  height: toRem(125);
  width: 100%;
  border-top-left-radius: toRem(15);
  border-top-right-radius: toRem(15);
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
    position: absolute;
    inset: 0;
  }
}

.recommendation-card {
  width: 200px;
  border-radius: toRem(15);
  background: #fff;
  flex-shrink: 0;
}

.recommendation-content {
  height: calc(100% - 125px);
  padding: toRem(8) toRem(12);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.image-wrapper {
  @include square-shape(28);
  @include flex-row-center-nowrap;
  border-radius: 40%;
  border: 1.6px solid $white-text;
  color: $white-text;
  font-size: 0.65rem;
}

.share-btn {
  @include square-shape(29);
  border-radius: 40%;
  background: $brand-accent-light;
  transition: all ease-in-out 0.25;

  &:hover {
    transform: scale(1.1);
    background: $brand-green;
  }
}
</style>
