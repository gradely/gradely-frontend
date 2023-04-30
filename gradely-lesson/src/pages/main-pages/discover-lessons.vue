<template>
  <div class="discovery-page-layout">
    <card-row-container
      title="Recommendations"
      show-slider
      v-if="showRecommendations"
    >
      <recommended-card
        v-for="(record, index) in getRecommendations"
        :key="index"
        :recommendation="record"
        @updateLesson="fetchRecommendations"
      />
    </card-row-container>

    <card-row-container
      :show-more="false"
      title="My Favourites"
      v-if="showFavourites"
    >
      <recently-card
        v-for="(fav, index) in getFavourites"
        :key="index"
        :seen_video="fav"
        @showLessonModal="updateContent(fav)"
      />
    </card-row-container>

    <card-row-container
      :show-more="showMoreVideoLessons"
      title="Featured Video Lessons"
      @seeMore="routeTo('VideoLesson')"
      v-if="showVideoLessons"
    >
      <video-card
        v-for="(video, index) in getVideoLessons"
        :key="index"
        :video="video"
        @showLessonModal="updateContent(video)"
      />
    </card-row-container>

    <card-row-container
      :show-more="showMoreLessonPlans"
      title="Lesson Plans"
      v-if="showLessonPlans"
      @seeMore="routeTo('SlideLesson')"
    >
      <slide-card
        v-for="(plan, index) in getLessonPlans"
        :key="index"
        :featured_document="plan"
        @showLessonModal="updateContent(plan)"
      />
    </card-row-container>

    <card-row-container
      @seeMore="routeTo('EducationalGamesLesson')"
      :show-more="showMoreGames"
      title="Educational Games"
      v-if="showGames"
    >
      <game-card
        v-for="(game, index) in getGames"
        :key="index"
        :featured_game="game"
        @showLessonModal="updateContent(game)"
      />
    </card-row-container>

    <portal to="gradely-modals">
      <!--  UPLOAD LESSON MODAL  -->
      <transition name="fade" v-if="showLessonModal">
        <create-lesson-modal
          @updateContent="fetchSearchedLesson"
          @closeTriggered="toggleLessonModal"
          :defaultFile="file"
        />
      </transition>

      <transition name="fade" v-if="showShareLessonModal">
        <share-lesson-modal
          @closeTriggered="toggleShareLessonModal"
          :content="content"
        />
      </transition>

      <transition name="fade" v-if="showLessonPreviewModal">
        <lesson-preview-modal
          @closeTriggered="toggleLessonPreviewModal"
          @preview="showBanner"
          @share="showShare"
          @report="showReport"
          :content="content"
        />
      </transition>

      <transition name="fade" v-if="showMediaPreviewBanner">
        <media-preview-banner
          @updateContent="fetchSearchedLesson"
          @closeTriggered="toggleMediaPreviewBanner"
          :content="content"
        />
      </transition>

      <transition name="fade" v-if="showReportLessonModal">
        <report-lesson-modal
          @closeTriggered="toggleReportLessonModal"
          :content="content"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const lesson = createNamespacedHelpers('lesson');
const subject = createNamespacedHelpers('subject');

import recommendedCard from '@/components/card-comps/recommended-card';
import recentlyCard from '@/components/card-comps/recently-card';
import videoCard from '@/components/card-comps/video-card';
import slideCard from '@/components/card-comps/slide-card';
import gameCard from '@/components/card-comps/game-card';
import cardRowContainer from '@/components/card-comps/card-row-container';
import shareLessonModal from '@/modals/share-lesson-modal';
import reportLessonModal from '@/modals/report-lesson-modal';
export default {
  name: '',

  props: {
    search: {
      type: String,
      default: '',
    },
  },

  components: {
    recommendedCard,
    recentlyCard,
    videoCard,
    slideCard,
    gameCard,
    cardRowContainer,
    shareLessonModal,
    reportLessonModal,
    LessonPreviewModal: () =>
      import(
        /* webpackChunkName: "modals" */ '@/modals/lesson-preview-modal.vue'
      ),
    createLessonModal: () =>
      import(
        /* webpackChunkName: "modals" */ '@/modals/create-lesson-modal.vue'
      ),
    mediaPreviewBanner: () =>
      import(
        /* webpackChunkName: "modals" */ '@/modals/media-preview-banner.vue'
      ),
  },

  computed: {
    ...lesson.mapGetters([
      'getFeaturedGames',
      'getFeaturedDocuments',
      'getFeaturedVideos',
      'getSeenVideos',
      'isContentReady',
      'getRecommendations',
    ]),

    ...subject.mapGetters(['getTeacherRoles']),

    recos() {
      return [
        {
          id: 20,
          Students: [
            {
              id: 5199,
              name: 'Student SamJay',
              image:
                'https://gradly.s3.eu-west-2.amazonaws.com/dev/avatars/avatar4_lnyyp8.png',
              code: 'coh/2020/5199',
            },
          ],
          type: 'video lesson',
          resources_type: 'video',
          resources_id: 31,
          subject_id: 73,
          subject_name: 'documentary',
          topic_id: 171,
          topic: 'Power- Natural Indices',
          thumbnail:
            'https://www.wizitup.com/lms/assets/_images/video_thumbnails/maths/055.25_maths_quadrilateral_square_rectangle_parallelogram_kite_rhombus_and_trapezium.png',
          reference_type: 'homework',
          reference_id: 843,
          created_at: '2020-11-10T20:07:49Z',
        },
        {
          id: 19,
          Students: [
            {
              id: 5199,
              name: 'Student SamJay',
              image:
                'https://gradly.s3.eu-west-2.amazonaws.com/dev/avatars/avatar4_lnyyp8.png',
              code: 'coh/2020/5199',
            },
          ],
          type: 'video lesson',
          resources_type: 'video',
          resources_id: 37,
          subject_id: 73,
          subject_name: 'documentary',
          topic_id: 174,
          topic: 'Commission, Discount, Profit and Loss',
          thumbnail:
            'https://www.wizitup.com/lms/assets/_images/video_thumbnails/maths/070.05_maths_fractions.png',
          reference_type: 'homework',
          reference_id: 855,
          created_at: '2020-11-10T19:52:38Z',
        },
        {
          id: 18,
          Students: [
            {
              id: 5199,
              name: 'Student SamJay',
              image:
                'https://gradly.s3.eu-west-2.amazonaws.com/dev/avatars/avatar4_lnyyp8.png',
              code: 'coh/2020/5199',
            },
          ],
          type: 'video lesson',
          resources_type: 'video',
          resources_id: 37,
          subject_id: 73,
          subject_name: 'documentary',
          topic_id: 174,
          topic: 'Commission, Discount, Profit and Loss',
          thumbnail:
            'https://www.wizitup.com/lms/assets/_images/video_thumbnails/maths/070.05_maths_fractions.png',
          reference_type: 'class',
          reference_id: 1469,
          created_at: '2020-11-10T19:40:24Z',
        },
      ];
    },

    showRecommendations() {
      return this.getRecommendations?.length;
    },

    showFavourites() {
      return this.getSeenVideos && this.getSeenVideos?.items?.length;
    },

    showMoreFavourites() {
      return this.getSeenVideos?.pagination?.pageSize > 1;
    },

    getFavourites() {
      return this.getSeenVideos?.items?.slice(0, 5);
    },

    showVideoLessons() {
      return this.getFeaturedVideos && this.getFeaturedVideos?.items?.length;
    },

    showMoreVideoLessons() {
      return this.getFeaturedVideos?.pagination?.pageSize > 1;
    },

    getVideoLessons() {
      return this.getFeaturedVideos?.items?.slice(0, 5);
    },

    showLessonPlans() {
      return (
        this.getFeaturedDocuments && this.getFeaturedDocuments?.items?.length
      );
    },

    showMoreLessonPlans() {
      return this.getFeaturedDocuments?.pagination?.pageSize > 1;
    },

    getLessonPlans() {
      return this.getFeaturedDocuments?.items?.slice(0, 5);
    },

    showGames() {
      return this.getFeaturedGames && this.getFeaturedGames?.items?.length;
    },

    showMoreGames() {
      return this.getFeaturedGames?.pagination?.pageSize > 1;
    },

    getGames() {
      return this.getFeaturedGames?.items?.slice(0, 5);
    },

    getSearch() {
      return this.search ? `&search=${this.search}` : '';
    },
  },

  watch: {
    file: {
      handler(newFile) {
        if (typeof newFile === 'object' && newFile['name'])
          this.toggleLessonModal();
      },
      immediate: true,
    },

    search: {
      handler() {
        this.fetchSearchedLesson();
      },
    },

    $route: {
      handler(route) {
        if (route?.query?.class_id)
          this.SET_TEACHER_CLASS(Number(route?.query?.class_id));
      },
      immediate: true,
    },
  },

  data() {
    return {
      share: false,
      showLessonModal: false,
      showShareLessonModal: false,
      showReportLessonModal: false,
      file: '',
      showLessonPreviewModal: false,
      showMediaPreviewBanner: false,
      content: null,
      test: {
        type: 'document',
        extension: 'pdf',
        url: [
          'https://images.unsplash.com/photo-1651858723178-0924dc62a082?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60',
          'https://images.unsplash.com/photo-1651867109886-dfe38b39815f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60',
        ],
      },
    };
  },

  methods: {
    ...lesson.mapActions(['fetchFeaturedData', 'fetchTeacherRecommendations']),
    ...lesson.mapMutations(['SET_TEACHER_CLASS']),
    ...subject.mapActions(['fetchClassSubjects', 'fetchTeacherRoles']),

    routeTo(routeName) {
      this.$router.push({ name: routeName });
    },

    updateContent(content) {
      this.content = content;
      this.showLessonPreviewModal = true;
    },

    toggleShareLessonModal() {
      this.showShareLessonModal = !this.showShareLessonModal;
    },

    toggleLessonPreviewModal() {
      this.showLessonPreviewModal = !this.showLessonPreviewModal;
    },

    toggleMediaPreviewBanner() {
      this.showMediaPreviewBanner = !this.showMediaPreviewBanner;
    },

    toggleReportLessonModal() {
      this.showReportLessonModal = !this.showReportLessonModal;
    },

    showBanner() {
      this.showMediaPreviewBanner = true;
      this.showLessonPreviewModal = false;
    },

    showShare() {
      this.showShareLessonModal = true;
      this.showLessonPreviewModal = false;
    },

    showReport() {
      this.showReportLessonModal = true;
      this.showLessonPreviewModal = false;
    },

    toggleLessonModal() {
      this.showLessonModal = !this.showLessonModal;
    },

    updateForm(file) {
      const files = file.target?.files;
      if (files && files?.length) this.file = files[0];
      else pushAlert('Invalid file', 'warning');
    },

    async fetchSearchedLesson() {
      this.$bus.$emit('show_page_loader', 'Loading Content');
      try {
        this.$bus.$emit('hide_page_loader', 'Loading Content');
        let response = await this.fetchFeaturedData({
          limit: 30,
          search: this.getSearch,
        });

        if (response.code !== 200)
          this.pushAlert('Failed to get content', 'warning');
      } catch (err) {
        this.$bus.$emit('hide_page_loader', 'Loading Content');
      }
    },

    async fetchRecommendations() {
      await this.fetchTeacherRecommendations();
    },
  },

  async mounted() {
    if (this.$route?.query?.class_id)
      this.SET_TEACHER_CLASS(Number(this.$route?.query?.class_id));

    if (!this.isContentReady || !this.getRecommendations)
      this.$bus.$emit('show_page_loader', 'Loading Content');

    this.$bus.$on('upload-lesson', this.updateForm);

    if (!this.getTeacherRoles) await this.fetchTeacherRoles();

    await Promise.all([
      this.fetchFeaturedData({ limit: 30 }),
      this.fetchClassSubjects(),
      this.fetchTeacherRecommendations(),
    ]);

    this.$bus.$emit('hide_page_loader', 'Loading Content');
  },

  created() {
    this.$bus.$on('refresh', () => {
      this.fetchFeaturedData({ limit: 30 });
    });
  },
};
// import { Component, Vue, Watch } from 'vue-property-decorator';
// import { VueConstructor } from 'vue';

// // INTERFACES
// import { IVue } from '../../interfaces';
// import {
//   VideoItemModel,
//   PaginationModel,
//   DocumentItemModel,
//   SubjectItemModel,
//   LessonModel,
//   GameItemModel,
//   SeenItemModel,
// } from '../../store/models';

// // COMPONENTS
// import RecommendedCard from '@/components/card-comps/recommended-card.vue';
// import RecentCard from '@/components/card-comps/recently-card.vue';
// import SlideCard from '@/components/card-comps/slide-card.vue';
// import VideoCard from '@/components/card-comps/video-card.vue';
// import GameCard from '@/components/card-comps/game-card.vue';
// import TeachingAidCard from '@/components/card-comps/teaching-aid-card.vue';
// import ChipComponent from '@/components/core-comps/chip-component.vue';

// // VUEX HELPERS
// import { createNamespacedHelpers } from 'vuex';
// const lesson = createNamespacedHelpers('lesson');
// const subject = createNamespacedHelpers('subject');

// @Component({
//   components: {
//     RecommendedCard,
//     RecentCard,
//     SlideCard,
//     VideoCard,
//     GameCard,
//     TeachingAidCard,
//     ChipComponent,
//     CreateLessonModal: () =>
//       import(
//         /* webpackChunkName: "modals" */ '@/modals/create-lesson-modal.vue'
//       ),
//   },

//   computed: {
//     ...lesson.mapGetters({
//       featuredVideos: 'getFeaturedVideos',
//       featuredDocuments: 'getFeaturedDocuments',
//       featuredGames: 'getFeaturedGames',
//       seenVideos: 'getSeenVideos',
//     }),
//     ...subject.mapGetters({
//       classSubjects: 'getClassSubjects',
//     }),
//   },

//   methods: {
//     ...lesson.mapActions(['fetchFeaturedData']),
//     ...subject.mapActions(['fetchClassSubjects']),
//   },

// })

// export default class DiscoverLessons extends (Vue as VueConstructor<IVue>) {
//   // GETTERS
//   public featuredVideos!: {
//     items: Array<VideoItemModel>;
//     pagination: PaginationModel;
//   };
//   public featuredDocuments!: {
//     items: Array<DocumentItemModel>;
//     pagination: PaginationModel;
//   };
//   public featuredGames!: {
//     items: Array<GameItemModel>;
//     pagination: PaginationModel;
//   };
//   public seenVideos!: {
//     items: Array<SeenItemModel>;
//     pagination: PaginationModel;
//   };
//   public classSubjects!: Array<SubjectItemModel>;

//   // ACTIONS
//   fetchFeaturedData!: ({ limit }: { limit: number }) => Promise<LessonModel>;
//   fetchClassSubjects!: () => Promise<Array<SubjectItemModel>>;

//   // COMPUTED
//   get sliceItems() {
//     return (array: Array<any>) => {
//       return Array.isArray(array) && array.length <= 100
//         ? array
//         : array?.slice(0, 5);
//     };
//   }

//   // WATCHERS
//   @Watch('form', { immediate: true })
//   formChanged(newVal: File, oldVal: File | null) {
//     if (typeof newVal === 'object' && newVal['name']) this.toggleModal();
//   }

//   // DATA
//   public showCreateLessonModal = false;
//   public form: File = {} as File;

//   // METHODS
//   scrollTo(element: any, scrollPixels: number, duration: number) {
//     const scrollPos = element.scrollLeft;
//     if (
//       !(
//         (scrollPos === 0 || scrollPixels > 0) &&
//         (element.clientWidth + scrollPos === element.scrollWidth ||
//           scrollPixels < 0)
//       )
//     ) {
//       // Get the start timestamp
//       const startTime =
//         'now' in window.performance ? performance.now() : new Date().getTime();

//       function scroll(timestamp: number) {
//         //Calculate the timeelapsed
//         const timeElapsed = timestamp - startTime;
//         //Calculate progress
//         const progress = Math.min(timeElapsed / duration, 1);
//         //Set the scrolleft
//         element.scrollLeft = scrollPos + scrollPixels * progress;
//         //Check if elapsed time is less then duration then call the requestAnimation, otherwise exit
//         if (timeElapsed < duration) {
//           //Request for animation
//           window.requestAnimationFrame(scroll);
//         } else {
//           return;
//         }
//       }
//       //Call requestAnimationFrame on scroll function first time
//       window.requestAnimationFrame(scroll);
//     }
//   }
//   recommendedNext() {
//     const wrapper = this.$refs.recommendedSlider;
//     this.scrollTo(wrapper, 200, 800);
//   }
//   recommendedPrevious() {
//     const wrapper = this.$refs.recommendedSlider;
//     this.scrollTo(wrapper, -200, 800);
//   }
//   videoNext() {
//     const wrapper = this.$refs.videoSlider;
//     this.scrollTo(wrapper, 220, 800);
//   }
//   videoPrevious() {
//     const wrapper = this.$refs.videoSlider;
//     this.scrollTo(wrapper, -220, 800);
//   }
//   documentNext() {
//     const wrapper = this.$refs.documentSlider;
//     this.scrollTo(wrapper, 200, 800);
//   }
//   doucmentPrevious() {
//     const wrapper = this.$refs.documentSlider;
//     this.scrollTo(wrapper, -200, 800);
//   }
//   gameNext() {
//     const wrapper = this.$refs.gameSlider;
//     this.scrollTo(wrapper, 200, 800);
//   }
//   gamePrevious() {
//     const wrapper = this.$refs.gameSlider;
//     this.scrollTo(wrapper, -200, 800);
//   }
//   seenNext() {
//     const wrapper = this.$refs.seenSlider;
//     this.scrollTo(wrapper, 200, 800);
//   }
//   seenPrevious() {
//     const wrapper = this.$refs.seenSlider;
//     this.scrollTo(wrapper, -200, 800);
//   }

//   toggleModal() {
//     this.showCreateLessonModal = !this.showCreateLessonModal;
//   }

//   updateForm($event: Event) {
//     const files = (<HTMLInputElement>$event.target)?.files;
//     if (files && files?.length) this.form = files[0];
//     else alert('Invalif file');
//   }

//   // HOOKS
//   async created() {
//     await Promise.all([
//       this.fetchFeaturedData({ limit: 6 }),
//       this.fetchClassSubjects(),
//     ]);
//   }

//   mounted() {
//     this.$bus.$on('upload-lesson', this.updateForm);
//     console.log('Vuex Videos:', this.featuredVideos);
//     console.log('Vuex Videos:', this.featuredDocuments);
//     console.log('Vuex Games:', this.featuredGames);
//     console.log('Vuex Seen Videos:', this.seenVideos);
//     console.log('Vuex Subjects:', this.classSubjects);
//   }
// }
</script>

<style lang="scss" scoped>
.discovery-page-layout {
  padding: toRem(20) toRem(100);
  width: 100%;
  overflow: hidden;
  margin: auto;

  @include breakpoint-down(lg) {
    padding: toRem(20) toRem(80);
  }

  @include breakpoint-down(md) {
    padding: toRem(20) toRem(60);
  }

  @include breakpoint-down(sm) {
    padding: toRem(20) toRem(40);
  }

  @include breakpoint-down(xs) {
    padding: toRem(20) toRem(10);
  }

  .box {
    width: 300px;
    flex-shrink: 0;
    height: 200px;
  }
}

.section {
  width: 100%;
  height: auto;
  padding: 50px 0;
  margin-bottom: 50px;

  &--accent {
    background: $brand-accent-light;
  }

  &--recommended {
    width: 85%;
    height: 100%;
  }

  &__flex {
    display: flex;
    flex-direction: column;
    align-items: center;

    min-width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }

  &__title {
    font-size: 16px;
    line-height: 27px;
    margin-bottom: 20px;
    color: $brand-navy;
    letter-spacing: 0.05pt;
  }

  &__body {
    width: 100%;
    height: auto;
    position: relative;

    &--aid {
      width: 85% !important;
    }

    &:hover .section__btn {
      display: grid;
    }
  }

  &__slider {
    position: relative;
    min-width: 100%;
    max-width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    overflow-x: auto;

    &--aid {
      width: 85%;
    }

    &::-webkit-scrollbar {
      width: 0px;
    }
  }

  &__btn {
    height: 36px;
    width: 36px;
    padding: 10px;

    color: #ffffff;
    cursor: pointer;

    display: none;
    place-items: center;

    border-radius: 15px;
    background: #23295b;
    box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.25);
    transition: all 0.3s ease-in-out;

    &:hover,
    &:focus {
      background: $brand-accent;
      box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.5);
    }

    &--left {
      position: absolute;
      top: 50%;
      left: -18px;
      z-index: 10;
      transform: translateY(-50%);
    }

    &--right {
      position: absolute;
      top: 50%;
      right: -18px;
      z-index: 10;
      transform: translateY(-50%);
    }
  }

  &__chips-container {
    display: grid;
    place-items: center;
  }
  &__chips {
    width: 75%;
  }
}
</style>
