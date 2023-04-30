<template>
  <div class="review-option-column">
    <div
      class="avatar option-indicator rounded-circle brand-green-bg"
      v-if="option.selected"
    >
      <div class="value icon brand-navy icon-accept"></div>
    </div>

    <div class="avatar option-indicator rounded-circle" v-else>
      <div class="value color-ash">{{ option.title }}</div>
    </div>

    <img
      v-if="isImageOption"
      class="option-img"
      v-lazy="
        'https://images.unsplash.com/photo-1638913662539-46e7ccd6d912?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaGs90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
      "
      alt=""
    />

    <!-- TEXT OPTION -->
    <div class="option-text" v-else v-html="option.value"></div>

    <script
      type="application/javascript"
      defer
      async="true"
      src="https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image"
    ></script>
  </div>
</template>

<script>
export default {
  name: "reviewOptionColumn",

  props: {
    question_type: {
      type: String,
      default: "multiple",
    },

    option: {
      type: Object,
      default: {
        title: "a",
        value: "Option 1",
        selected: false,
      },
    },
  },

  computed: {
    isImageOption() {
      return this.option.value.startsWith("http") ? true : false;
    },
  },

  watch: {
    option: {
      handler(value) {
        if (Object.keys(value).length) this.formatOption();
      },
      immediate: true,
    },
  },

  methods: {
    // FORMAT OPTION
    formatOption() {
      this.$nextTick(() => {
        let small_screen = window.matchMedia("(max-width: 568px)");
        let extra_small_screen = window.matchMedia("(max-width: 450px)");

        document
          .querySelectorAll(".review-option-column")
          .forEach((element) => {
            element.querySelectorAll(".option-text").forEach((elm) => {
              // REMOVE BREAK TAGS
              elm.querySelectorAll("br").forEach((ele) => ele.remove());

              if (elm.querySelector("p"))
                elm.querySelector("p").style.margin = "0px";

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
$body_font: "Noto Sans JP", Roboto, Segoe UI, Open Sans, sans-serif;

.review-option-column {
  @include flex-row-start-nowrap;
  margin-bottom: toRem(20);
  margin-right: 5%;
  width: 35%;

  .option-indicator {
    @include square-shape(32);
    background: $color-white;
    margin-right: toRem(15);

    .value {
      @include center-placement;
      font-size: toRem(13);

      @include breakpoint-down(xs) {
        font-size: toRem(13);
      }
    }

    .icon {
      font-size: toRem(18);
    }
  }

  .option-text {
    font-family: $body_font !important;
    @include font-height(12.5, 19);

    @include breakpoint-down(xs) {
      @include font-height(12, 18);
    }

    p {
      font-family: $body_font !important;
    }
  }

  .option-img {
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
}
</style>