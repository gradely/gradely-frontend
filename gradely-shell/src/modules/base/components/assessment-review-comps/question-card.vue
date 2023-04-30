<template>
  <div class="question-card white-text-bg rounded-3 box-shadow-effect mgb-7">
    <!-- COUNTER  -->
    <div class="counter position-relative">
      <div class="icon icon-chat-card brand-navy"></div>
      <div class="count white-text">{{ counter }}</div>
    </div>

    <!-- QUESTION  -->
    <div class="wrapper wrapper-content">
      <div class="question-text color-text" v-html="question.question"></div>

      <!-- QUESTION IMAGE -->
      <div
        class="question-image mgt-14 mgb-0 position-relative w-auto"
        v-if="question.image"
      >
        <img :src="question.image" alt="Question Image" class="pointer" />

        <!-- IMGAE LENS -->
        <div
          class="avatar brand-inverse-light-bg pointer smooth-transition"
          title="View image"
          @click="togglePreviewer"
        >
          <div class="icon icon-zoom-in brand-navy"></div>
        </div>
      </div>
    </div>

    <script
      type="application/javascript"
      defer
      async="true"
      src="https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image"
    ></script>

    <portal to="gradely-modals">
      <transition name="fade" mode="out-in" v-if="show_previewer">
        <media-viewer
          :user="{
            image: getAuthUser.image,
            full_name: getAuthUser.full_name,
            date: '',
          }"
          :media="{
            resources: [question.image],
            sharable: false,
            type: 'image',
          }"
          @closeTriggered="togglePreviewer"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import mediaViewer from "@/shared/components/media-viewer";

export default {
  name: "questionCard",

  components: {
    mediaViewer,
  },

  props: {
    counter: Number,
    question: {
      type: Object,
      default: () => ({
        id: 1,
        image: "",
        question: "What is the logarithmic characteristic of 1.345?",
      }),
    },
  },

  watch: {
    question: {
      handler(value) {
        if (Object.keys(value).length) this.formatQuestion();
      },
      immediate: true,
    },
  },

  data: () => ({
    show_previewer: false,
  }),

  methods: {
    togglePreviewer() {
      this.show_previewer = !this.show_previewer;
    },

    // FORMAT QUESTION
    formatQuestion() {
      this.$nextTick(() => {
        let small_screen = window.matchMedia("(max-width: 568px)");
        let extra_small_screen = window.matchMedia("(max-width: 450px)");

        document.querySelectorAll(".wrapper-content").forEach((element) => {
          let children = Array.from(element?.children) ?? [];

          children?.forEach((elm) => {
            // REMOVE BREAK TAGS
            elm.querySelectorAll("br").forEach((ele) => ele.remove());

            this.$nextTick(() =>
              this.question?.image ? elm.querySelector("img:not(.pointer)")?.classList.add("d-none") : null
            );

            elm.querySelectorAll("figure").forEach((figure) => {
              figure.querySelector("img").style.minWidth = "25%";
              figure.querySelector("img").style.width = "auto";
              figure.querySelector("img").style.maxWidth = "50%";
              figure.querySelector("img").style.height = "auto";
              figure.querySelector("img").style.maxHeight = "260px";

              // WATCH FOR CHANGES IN SCREEN SIZES
              if (small_screen.matches)
                figure.querySelector("img").style.maxWidth = "60%";

              if (extra_small_screen.matches)
                figure.querySelector("img").style.maxHeight = "200px";
            });
          });
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.question-card {
  @include flex-row-start-nowrap;
  align-items: flex-start;
  padding: toRem(13);

  .counter {
    margin-right: toRem(10);
    margin-left: toRem(-21);

    @include breakpoint-down(xs) {
      margin-right: toRem(7);
    }

    .icon {
      font-size: toRem(38);

      @include breakpoint-down(xs) {
        font-size: toRem(36);
      }
    }

    .count {
      @include center-placement;
      font-size: toRem(10);
      margin-top: toRem(-2.75);

      @include breakpoint-down(xs) {
        font-size: toRem(8.5);
        margin-top: toRem(-2.25);
      }
    }
  }

  .question-text {
    @include font-height(13.25, 23);
    margin-top: toRem(5);
    margin-bottom: toRem(5);

    @include breakpoint-down(xs) {
      @include font-height(12.75, 21);
    }
  }
}

.question-image {
  img {
    min-width: 25%;
    width: auto;
    max-width: 50%;
    height: auto;
    max-height: toRem(260);

    @include breakpoint-down(sm) {
      max-width: 60%;
    }

    @include breakpoint-down(xs) {
      max-height: toRem(200);
    }
  }

  .avatar {
    @include square-shape(34);
    top: toRem(-12);
    left: toRem(5);

    @include breakpoint-down(xs) {
      @include square-shape(30);
    }

    &:hover {
      background: $brand-accent-light !important;
    }

    .icon {
      @include center-placement;
      font-size: toRem(16);
    }
  }
}
</style>
