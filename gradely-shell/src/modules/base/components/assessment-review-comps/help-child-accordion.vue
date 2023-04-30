<template>
  <div
    class="
      help-child-accordion
      white-text-bg
      rounded-2
      overflow-hidden
      position-relative
      mgb-5
    "
  >
    <!-- TOP SECTION  -->
    <div class="top-section" @click="toggleAccordion">
      <!-- LEFT  -->
      <div class="left">
        <div class="avatar avatar-square smooth-transition">
          <div
            class="icon color-grey-dark smooth-transition"
            :class="show_accordion ? 'icon-caret-down' : 'icon-caret-right'"
          ></div>
        </div>
      </div>

      <!-- RIGHT  -->
      <div class="right wrapper-content">
        <div
          class="top-text color-text font-weight-500"
          v-html="question.question"
        ></div>

        <div class="bottom-text color-grey-dark">
          {{
            question.wrong_students.length ? question.wrong_students.length : 0
          }}
          of {{ total_students ? total_students : 0 }} students struggled with
          this question
        </div>
      </div>
    </div>

    <!-- BOTTOM SECTION  -->
    <div class="bottom-section" v-if="show_accordion">
      <!-- LEFT  -->
      <div class="left">
        <div class="avatar avatar-square"></div>
      </div>

      <!-- RIGHT  -->
      <div class="right">
        <div
          class="student"
          v-for="(student, index) in question.wrong_students"
          :key="index"
        >
          <!-- AVATAR  -->
          <div class="avatar">
            <img
              v-lazy="student.image"
              :alt="
                $string.getStringInitials(
                  `${student.lastname} ${student.firstname}`
                )
              "
              class="avatar-img"
              v-if="student.image"
            />

            <div
              class="avatar-text"
              v-else
              :class="
                $color.getProfileBgColor(
                  `${student.lastname} ${student.firstname}`
                )
              "
            >
              {{
                $string.getStringInitials(
                  `${student.lastname} ${student.firstname}`
                )
              }}
            </div>
          </div>
          <!-- NAME  -->
          <div class="name color-text">
            {{ `${student.lastname} ${student.firstname}` }}
          </div>
        </div>
      </div>
    </div>

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
  name: "helpChildAccordion",

  props: {
    question: {
      type: Object,
      default: () => ({
        question: "What is the logarithmic characteristic of 1.345?",
        image: "",
        wrong_students: [
          {
            id: 1,
            full_name: "Aisha Bello",
            image: "",
          },
        ],
      }),
    },
    total_students: {
      type: Number,
      default: 0,
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
    show_accordion: false,
  }),

  methods: {
    toggleAccordion() {
      this.show_accordion = !this.show_accordion;
    },

    // FORMAT QUESTION
    formatQuestion() {
      this.$nextTick(() => {
        let small_screen = window.matchMedia("(max-width: 568px)");
        let extra_small_screen = window.matchMedia("(max-width: 450px)");

        document.querySelectorAll(".wrapper-content").forEach((element) => {
          let children = Array.from(element?.children) ?? [];

          children.forEach((elm) => {
            // REMOVE BREAK TAGS
            elm.querySelectorAll("br").forEach((ele) => ele.remove());

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
@keyframes panel-slide-down {
  0%,
  30% {
    margin-top: -20px;
    opacity: 0;
  }

  to {
    margin-top: 0;
    opacity: 1;
  }
}

.help-child-accordion {
  border: toRem(1) solid #e5e5e5;

  .top-section {
    @include flex-row-start-nowrap;
    align-items: flex-start;
    @include transition(0.4s);
    padding: toRem(13) toRem(24);
    cursor: pointer;

    @include breakpoint-down(sm) {
      padding: toRem(13) toRem(20);
    }

    @include breakpoint-down(xs) {
      padding: toRem(12) toRem(13);
    }

    &:hover {
      background: rgba($brand-inverse-light, 0.4) !important;
    }

    .left {
      .avatar {
        @include rectangle-shape(36, 30);
        overflow: unset;
        margin-left: toRem(-10);
        margin-top: 10%;
        border: toRem(1) solid transparent;

        @include breakpoint-down(xs) {
          margin-left: toRem(-11);
        }

        @include breakpoint-custom-down(360) {
          margin-left: toRem(-13);
        }

        .icon {
          margin-top: toRem(8);
          margin-left: toRem(7);
          font-size: toRem(12);

          @include breakpoint-down(xs) {
            margin-left: toRem(10);
          }

          @include breakpoint-custom-down(360) {
            margin-left: toRem(11.5);
          }
        }
      }
    }

    .right {
      .top-text {
        @include font-height(12.75, 19);
        // margin-bottom: toRem(2);

        @include breakpoint-down(xs) {
          @include font-height(12.25, 17);
        }

        @include breakpoint-custom-down(360) {
          @include font-height(11.25, 15);
        }
      }

      .bottom-text {
        @include font-height(11, 14);

        @include breakpoint-down(xs) {
          @include font-height(10.75, 14);
        }

        @include breakpoint-custom-down(360) {
          @include font-height(10.5, 14);
        }
      }
    }
  }

  .bottom-section {
    @include flex-row-start-nowrap;
    padding: toRem(12) toRem(24);
    border-top: toRem(1) solid #e5e5e5;
    transition: top 0.5s ease-in-out;
    animation: panel-slide-down 0.5s ease-in-out forwards;

    @include breakpoint-down(sm) {
      padding: toRem(12) toRem(20);
    }

    @include breakpoint-down(xs) {
      padding: toRem(12) toRem(13);
    }

    @include breakpoint-custom-down(360) {
      padding: toRem(12) toRem(11);
    }

    .left {
      .avatar {
        @include rectangle-shape(36, 30);
        margin-left: toRem(-10);
        border: toRem(1) solid transparent;
      }
    }

    .right {
      @include flex-row-start-nowrap;

      .student {
        @include flex-row-start-nowrap;
        margin-right: toRem(30);
        margin-bottom: toRem(10);

        @include breakpoint-down(xs) {
          margin-right: toRem(22);
        }

        .avatar {
          @include square-shape(30);
          margin-right: toRem(15);

          @include breakpoint-down(xs) {
            margin-right: toRem(13);
          }

          @include breakpoint-custom-down(360) {
            margin-right: toRem(10);
          }

          .avatar-text {
            font-size: toRem(11.5);
          }
        }

        .name {
          @include font-height(12.25, 17);

          @include breakpoint-down(xs) {
            @include font-height(11.75, 17);
          }

          @include breakpoint-custom-down(360) {
            @include font-height(11.25, 17);
          }
        }
      }
    }
  }
}
</style>
