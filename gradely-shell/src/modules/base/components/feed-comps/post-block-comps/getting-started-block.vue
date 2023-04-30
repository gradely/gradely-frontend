<template>
  <div class="post-container-block mgb-10 border-brand position-relative">
    <!-- POST INTRO  -->
    <post-intro :intro="intro_content" :post="{ type: 'Gradely' }" />

    <!-- CONTENT AREA  -->
    <div class="content-area">
      <post-content-text :content="getDefaultPostText" />
      <post-content-text
        v-if="getAuthType === 'teacher'"
        :content="{
          custom_text: '',
        }"
      />

      <slot name="content-area"></slot>
    </div>

    <!-- TOUR DESCRIPTION TEXT -->
    <div
      class="tour-description white-text-bg rounded-5 position-absolute h-auto"
      v-if="show_tour_description"
    >
      <!-- TOUR TEXT -->
      <div class="tour-text color-text">
        Let’s add some
        {{ getAuthType === "school" ? "teachers" : "students" }} to this class.
        You can add
        {{ getAuthType === "school" ? "teachers" : "students" }} with email
        address or phone number.
      </div>

      <!-- TOUR CTA -->
      <div class="tour-cta">
        <button
          class="btn transparent-bg no-shadow color-text"
          @click="skipTour"
        >
          Skip
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import postIntro from "@/modules/base/components/feed-comps/post-block-comps/post-intro";
import postContentText from "@/modules/base/components/feed-comps/post-block-comps/post-content-comps/post-content-text";

export default {
  name: "gettingStartedBlock",

  components: {
    postIntro,
    postContentText,
  },

  props: {
    intro_content: Object,
  },

  computed: {
    ...mapGetters({ getTour: "general/getTour" }),

    getDefaultPostText() {
      if (this.getAuthType === "school")
        return {
          custom_text:
            "<p>Teachers are the heart of every classroom. With their email address or phone number, you can get your teachers into your class. Let’s add some teachers to this class</p> <p style='margin-top: -8px'>You can add as many teachers as you like to a class.</p>",
        };
      else if (this.getAuthType === "teacher")
        return {
          custom_text:
            "<p>Send class updates, assignments, quizzes and more. Start building your digital classroom community today!</p> <p style='margin-top: -8px'>To begin, first we need to get your students in. Let’s start by sending an invitation to your students.</p>",
        };
    },
  },

  watch: {
    $route: {
      handler(value) {
        if (value.query?.tour) {
          let tour_step = this.$string.decodeString(this.$route?.query?.tour);

          if (tour_step === 2) {
            setTimeout(() => (this.show_tour_description = true), 3500);

            setTimeout(
              () => (window.innerWidth <= 768 ? window.scrollTo(0, 200) : null),
              2200
            );
          } else this.show_tour_description = false;
        }
      },
      immediate: true,
    },
  },

  data: () => ({
    show_tour_description: false,
  }),

  methods: {
    ...mapActions({ updateTour: "general/updateTour" }),

    skipTour() {
      this.updateTour("ongoing");

      setTimeout(
        () =>
          this.$router.push(
            `${this.$route.path}?tour=${this.$string.encodeString(3)}`
          ),
        700
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.tour-description {
  top: toRem(240);
  left: toRem(120);

  @include breakpoint-down(sm) {
    top: toRem(230);
    left: toRem(70);
  }

  &::after {
    left: 15%;
  }

  .tour-text {
    @include font-height(12, 22);
    margin-bottom: toRem(15);

    @include breakpoint-down(sm) {
      @include font-height(11.5, 21);
      margin-bottom: toRem(10);
    }
  }

  .tour-cta {
    @include flex-row-end-nowrap;

    .btn {
      font-size: toRem(11);
    }
  }
}
</style>
