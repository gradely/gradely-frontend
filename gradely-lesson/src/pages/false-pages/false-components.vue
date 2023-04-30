<template>
  <div>
    <!-- <lesson-feedback /> -->
    <preview-video-lesson /><br />
    <preview-illustration-lesson />
    <!-- <slide-lesson /> -->
    <!-- <recommended-card /> <br />
    <recently-card /> <br />
    <video-card /> <br />
    <teaching-aid-card /> <br />
    <game-card /> <br />
    <slide-card /> <br />
    <chip-component /> <br /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RecommendedCard from '@/components/card-comps/recommended-card.vue';
import RecentlyCard from '@/components/card-comps/recently-card.vue';
import VideoCard from '@/components/card-comps/video-card.vue';
import TeachingAidCard from '@/components/card-comps/teaching-aid-card.vue';
import GameCard from '@/components/card-comps/game-card.vue';
import SlideCard from '../../components/card-comps/slide-card.vue';
import ChipComponent from '@/components/core-comps/chip-component.vue';
import LessonFeedback from '../../components/card-comps/lesson-feedback.vue';
import PreviewVideoLesson from '../../components/card-comps/preview-video-lesson.vue';
import PreviewIllustrationLesson from '@/components/card-comps/preview-illustration-lesson.vue';

@Component({
  components: {
    RecommendedCard,
    RecentlyCard,
    VideoCard,
    TeachingAidCard,
    GameCard,
    SlideCard,
    ChipComponent,
    LessonFeedback,
    PreviewVideoLesson,
    PreviewIllustrationLesson,
  },
})
export default class extends Vue {}
</script>

<style lang="scss" scoped></style>
