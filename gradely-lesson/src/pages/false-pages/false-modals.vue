<template>
  <div>
    <div class="w-100 h-100 p-5">
      <button class="btn btn-primary" @click="toggleVideoModal">
        Toggle Video Preview Modal
      </button>
    </div>

    <div class="w-100 h-100 p-5">
      <button class="btn btn-primary" @click="toggleIllustrationModal">
        Toggle Illustration Preview Modal
      </button>
    </div>

    <div class="w-100 h-100 p-5">
      <button class="btn btn-primary" @click="toggleGameModal">
        Toggle Game Preview Modal
      </button>
    </div>

    <div class="w-100 h-100 p-5">
      <button class="btn btn-primary" @click="togglePresentationModal">
        Toggle Presentation Preview Modal
      </button>
    </div>

    <div class="w-100 h-100 p-5">
      <button class="btn btn-primary" @click="toggleWorksheetModal">
        Toggle Worksheet Preview Modal
      </button>
    </div>

    <div class="w-100 h-100 p-5">
      <button class="btn btn-primary" @click="toggleLessonFeedbackModal">
        Toggle Lesson Feedback Modal
      </button>
    </div>

    <div class="w-100 h-100 p-5">
      <button class="btn btn-primary" @click="toggleCreateLessonModal">
        Toggle Create Lesson Modal
      </button>
    </div>

    <div class="w-100 h-100 p-5">
      <button class="btn btn-primary" @click="toggleShareLessonModal">
        Toggle Share Lesson Modal
      </button>
    </div>

    <!--  MODALS -->
    <portal to="gradely-modals">
      <!--  ILLUSTRATION MODAL  -->
      <transition name="fade" v-if="showIllustrationModal">
        <illustration-modal @closeTriggered="toggleIllustrationModal" />
      </transition>

      <!--  GAME MODAL  -->
      <transition name="fade" v-if="showGameModal">
        <game-modal @closeTriggered="toggleGameModal" />
      </transition>

      <!--  PRESENTATION MODAL  -->
      <transition name="fade" v-if="showPresentationModal">
        <presentation-modal @closeTriggered="togglePresentationModal" />
      </transition>

      <!--  WORKSHEET MODAL  -->
      <transition name="fade" v-if="showWorksheetModal">
        <worksheet-modal @closeTriggered="toggleWorksheetModal" />
      </transition>

      <!--  VIDEO MODAL  -->
      <transition name="fade" v-if="showVideoModal">
        <video-modal @closeTriggered="toggleVideoModal" />
      </transition>

      <!--  LESSON FEEDBACK MODAL  -->
      <transition name="fade" v-if="showLessonFeedbackModal">
        <lesson-feedback-modal @closeTriggered="toggleLessonFeedbackModal" />
      </transition>

      <!--  CREATE LESSON MODAL  -->
      <transition name="fade" v-if="showCreateLessonModal">
        <create-lesson-modal @closeTriggered="toggleCreateLessonModal" />
      </transition>

      <!--  SHARE LESSON MODAL  -->
      <transition name="fade" v-if="showShareLessonModal">
        <share-lesson-modal @closeTriggered="toggleShareLessonModal" />
      </transition>
    </portal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { VueConstructor } from 'vue';

// INTERFACES
import { IVue } from '../../interfaces';

@Component({
  components: {
    IllustrationModal: () =>
      import(
        /* webpackChunkName: "modals" */ '@/modals/illustration-modal.vue'
      ),

    GameModal: () =>
      import(/* webpackChunkName: "modals" */ '@/modals/game-modal.vue'),

    PresentationModal: () =>
      import(
        /* webpackChunkName: "modals" */ '@/modals/presentation-modal.vue'
      ),

    WorksheetModal: () =>
      import(/* webpackChunkName: "modals" */ '@/modals/worksheet-modal.vue'),

    VideoModal: () =>
      import(/* webpackChunkName: "modals" */ '@/modals/video-modal.vue'),

    LessonFeedbackModal: () =>
      import(
        /* webpackChunkName: "modals" */ '@/modals/lesson-feedback-modal.vue'
      ),

    CreateLessonModal: () =>
      import(
        /* webpackChunkName: "modals" */ '@/modals/create-lesson-modal.vue'
      ),

    ShareLessonModal: () =>
      import(
        /* webpackChunkName: "modals" */ '@/modals/share-lesson-modal.vue'
      ),
  },
})
export default class extends (Vue as VueConstructor<IVue>) {
  //DATA
  showIllustrationModal = false;
  showGameModal = false;
  showPresentationModal = false;
  showWorksheetModal = false;
  showVideoModal = false;
  showLessonFeedbackModal = false;
  showCreateLessonModal = false;
  showShareLessonModal = false;

  // METHODS
  toggleIllustrationModal() {
    this.showIllustrationModal = !this.showIllustrationModal;
  }
  toggleGameModal() {
    this.showGameModal = !this.showGameModal;
  }
  togglePresentationModal() {
    this.showPresentationModal = !this.showPresentationModal;
  }
  toggleWorksheetModal() {
    this.showWorksheetModal = !this.showWorksheetModal;
  }
  toggleVideoModal() {
    this.showVideoModal = !this.showVideoModal;
  }
  toggleLessonFeedbackModal() {
    this.showLessonFeedbackModal = !this.showLessonFeedbackModal;
  }
  toggleCreateLessonModal() {
    this.showCreateLessonModal = !this.showCreateLessonModal;
  }
  toggleShareLessonModal() {
    this.showShareLessonModal = !this.showShareLessonModal;
  }
}
</script>

<style lang="scss" scoped></style>
