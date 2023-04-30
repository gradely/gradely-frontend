<template>
  <div class="lesson-container">
    <div
      @click="scrollToView"
      class="new-content gfont-13"
      ref="new_content"
      :class="[show_new_content && 'show-new-content']"
    >
      <span class="icon icon-double-caret-up gfont-25"></span> New Content
    </div>

    <div class="relative in-view" ref="view">..</div>

    <div class="lesson-plans-layout" v-if="getFilteredBySubjectLessons.length">
      <slide-card
        v-for="(plan, index) in getFilteredBySubjectLessons"
        :key="index"
        :featured_document="plan"
        @showLessonModal="updateContent(plan)"
      />
    </div>

    <div class="state">
      <div class="gfont-15 color-grey-dark mgb-10 text-center">
        Showing {{ getRenderedSize }} of {{ getContentSize }} Content
      </div>

      <div class="progress-wrapper">
        <div class="progress" :style="getProgressStyle"></div>
      </div>

      <button
        class="show-more"
        ref="more"
        :disabled="disabled"
        @click="fetchFeaturedDocs"
      >
        Show More
      </button>
    </div>

    <portal to="gradely-modals">
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
          @closeTriggered="toggleMediaPreviewBanner"
          :content="content"
        />
      </transition>

      <transition name="fade" v-if="showLessonModal">
        <create-lesson-modal
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

      <transition name="fade" v-if="showReportModal">
        <report-lesson-modal
          @closeTriggered="toggleReportModal"
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
import slideCard from '@/components/card-comps/slide-card';
import lessonPreviewModal from '@/modals/lesson-preview-modal';
import mediaPreviewBanner from '@/modals/media-preview-banner';
import createLessonModal from '@/modals/create-lesson-modal';
import shareLessonModal from '@/modals/share-lesson-modal';
import reportLessonModal from '@/modals/report-lesson-modal';
export default {
  name: 'LessonPlans',

  components: {
    slideCard,
    lessonPreviewModal,
    mediaPreviewBanner,
    createLessonModal,
    shareLessonModal,
    reportLessonModal,
  },

  props: {
    search: {
      type: String,
      default: '',
    },

    category: {
      type: Object,
      default: () => {},
    },
  },

  async mounted() {
    this.$bus.$on('upload-lesson', this.updateForm);
    this.$bus.$emit('show_page_loader', 'Loading Content');

    if (!this.getTeacherRoles) await this.fetchTeacherRoles();
    await this.fetchClassSubjects();

    try {
      await this.fetchSearchedLessonPlans(this.getSearch);
      this.$bus.$emit('hide_page_loader');
    } catch (err) {
      this.$bus.$emit('hide_page_loader');
    }
  },

  computed: {
    ...lesson.mapGetters(['getFeaturedDocuments']),
    ...subject.mapGetters(['getTeacherRoles']),

    getFilteredBySubjectLessons() {
      return this.lesson_plans.filter((plan) => {
        return (
          plan.subject.toLowerCase() === this.category.name?.toLowerCase() ||
          this.category.name === 'all' ||
          true
        );
      });
    },

    getContentSize() {
      if (!this.pagination) return 0;

      let { totalCount } = this.pagination;
      return totalCount;
    },

    getRenderedSize() {
      return this.lesson_plans?.length;
    },

    getProgressStyle() {
      if (!this.getContentSize) return `width:0%`;
      let progress = (this.getRenderedSize / this.getContentSize) * 100;
      let valid_progress = progress > 100 ? 100 : progress;
      return `width:${valid_progress}%`;
    },

    disabled() {
      return this.getRenderedSize >= this.getContentSize;
    },

    getSearch() {
      let search = this.search ? `&search=${this.search}` : '';
      let category =
        this.category.id === 'all' ? '' : `&subject_id=${this.category.id}`;
      return search + category + '&type=document';
    },
  },

  watch: {
    $route: {
      handler(route) {
        if (route?.query?.class_id)
          this.SET_TEACHER_CLASS(Number(route?.query?.class_id));
      },
      immediate: true,
    },

    // getFeaturedDocuments: {
    //   handler(docs) {
    //     if (this.lesson_plans?.length) return;
    //     this.lesson_plans = docs?.items ? docs.items : [];
    //   },
    //   immediate: true,
    // },

    file: {
      handler(newFile) {
        if (typeof newFile === 'object' && newFile['name'])
          this.toggleLessonModal();
      },
      immediate: true,
    },

    category: {
      handler() {
        this.fetchSearchedLessonPlans(this.getSearch);
      },
    },

    search: {
      handler() {
        this.fetchSearchedLessonPlans(this.getSearch);
      },
    },
  },

  data() {
    return {
      lesson_plans: [],
      showMediaPreviewBanner: false,
      showLessonPreviewModal: false,
      showShareLessonModal: false,
      showReportModal: false,
      file: '',
      showLessonModal: false,
      content: null,
      show_new_content: false,
      new_content: [],
      pagination: null,
      page: 2,
    };
  },

  methods: {
    ...lesson.mapActions(['fetchFeaturedData']),
    ...lesson.mapMutations(['SET_TEACHER_CLASS']),
    ...subject.mapActions(['fetchClassSubjects', 'fetchTeacherRoles']),

    showBanner() {
      this.showMediaPreviewBanner = true;
      this.showLessonPreviewModal = false;
    },

    showShare() {
      this.showShareLessonModal = true;
      this.showLessonPreviewModal = false;
    },

    showReport() {
      this.showLessonPreviewModal = false;
      this.showReportModal = true;
    },

    toggleReportModal() {
      this.showReportModal = !this.showReportModal;
    },

    toggleLessonPreviewModal() {
      this.showLessonPreviewModal = !this.showLessonPreviewModal;
    },

    toggleMediaPreviewBanner() {
      this.showMediaPreviewBanner = !this.showMediaPreviewBanner;
    },

    toggleLessonModal() {
      this.showLessonModal = !this.showLessonModal;
    },

    toggleShareLessonModal() {
      this.showShareLessonModal = !this.showShareLessonModal;
    },

    updateForm(file) {
      const files = file.target?.files;
      if (files && files?.length) this.file = files[0];
      else pushAlert('Invalid file', 'warning');
    },

    updateContent(content) {
      this.content = content;
      this.showLessonPreviewModal = true;
    },

    scrollToView() {
      this.lesson_plans.unshift(...this.new_content);
      this.new_content = [];
      this.show_new_content = false;
      this.$refs.view.scrollIntoView();
    },

    async fetchSearchedLessonPlans(search = '') {
      try {
        this.page = 2;
        this.$bus.$emit('show_page_loader', 'Loading Content');
        let response = await this.fetchFeaturedData({
          limit: 30,
          page: 1,
          search,
        });
        this.$bus.$emit('hide_page_loader');
        if (response.code === 200) {
          let { items, pagination } = response.data;
          this.pagination = pagination;
          this.lesson_plans = items?.length ? [...items] : [];
          if (!items?.length)
            this.pushAlert('No content for selected category', 'warning');
        }
      } catch (err) {
        this.$bus.$emit('hide_page_loader');
        console.log('err>>>err', err);
        this.pushAlert('error fetching content', 'error');
      }
    },

    async fetchFeaturedDocs() {
      let page = this.page;
      try {
        this.handleClick('more', 'loading');
        let response = await this.fetchFeaturedData({
          limit: 30,
          page,
          search: this.getSearch,
        });
        this.handleClick('more', 'Show More', false);
        if (response.code === 200) {
          let { items } = response.data;

          if (items?.length) this.page++;
          else {
            this.pushAlert('No more content', 'warning');
            return;
          }

          // this.show_new_content = true;
          // this.new_content.unshift(...items);

          this.lesson_plans = this.lesson_plans.concat(items);
        }
      } catch (err) {
        this.handleClick('more', 'Show More', false);
        this.$bus.$emit('hide_page_loader');
        this.pushAlert('error fetching content', 'error');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.lesson-container {
  width: 87%;
  padding-bottom: toRem(50);

  @include breakpoint-custom-down(1010) {
    width: 93%;
  }

  @include breakpoint-custom-down(470) {
    width: 98%;
  }
}

.new-content {
  position: fixed;
  width: 125px;
  height: 35px;
  display: inline-flex;
  align-items: center;
  gap: 0 4px;
  border-radius: toRem(17);
  inset: 0;
  left: calc(50% - 57.5px);
  top: -40px;
  padding: toRem(5) toRem(10);
  background: $brand-navy;
  color: $white-text;
  z-index: 10;
  cursor: pointer;
  transition: top ease-in-out 0.4s;
}

.show-new-content {
  top: 40px;
}

.in-view {
  opacity: 0;
  position: absolute;
  height: 10px;
  width: 10px;
  inset: 0;
  top: -85px;
  left: 50%;
}

.lesson-plans-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  place-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: toRem(45);

  @include breakpoint-custom-down(470) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 17px 10px;
  }

  @include breakpoint-custom-down(431) {
    grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
    gap: 17px 5px;
  }

  @include breakpoint-custom-down(370) {
    grid-template-columns: repeat(auto-fill, minmax(230px, 80%));
    gap: 17px 5px;
  }
}

.state {
  @include flex-column-start-center;
}

.show-more {
  padding: toRem(5) toRem(15);
  border-radius: toRem(20);
  border: 1.2px solid $border-grey-dark;
  background: $white-text;
  color: $color-ash;
  display: inline-flex;
  margin: auto;
  font-size: 0.9rem;
  font-weight: 600;

  &:hover {
    border-color: $brand-accent;
    color: $brand-navy;
    background: $brand-accent-light;
  }

  &:disabled {
    filter: brightness(0.7);
  }
}

.progress-wrapper {
  height: 3.5px;
  width: 300px;
  max-width: 98%;
  background: $brand-inverse;
  margin: toRem(5) auto toRem(25) auto;
  border-radius: 6px;

  .progress {
    width: 20%;
    height: inherit;
    background: $brand-navy;
    transition: background ease-in-out 0.25s;
  }
}
</style>
