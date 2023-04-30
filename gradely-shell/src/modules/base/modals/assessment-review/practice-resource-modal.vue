<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-sm-md-avg' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header position-relative brand-navy-bg">
        <div class="practice-image avatar rounded-10">
          <img
            :src="resource.topic[topic_index].image"
            class="avatar-img"
            alt=""
          />
        </div>

        <!-- NAV OPTIONS -->
        <div class="nav-options mgt-25">
          <template v-if="resource.topic.length > 1">
            <div
              class="dot"
              @click="updateIndex(index)"
              :class="index === topic_index && 'dot-active'"
              v-for="(topic, index) in resource.topic"
              :key="index"
            ></div>
          </template>
        </div>

        <!-- INDICATOR -->
        <div class="practice-indicator">
          <div class="icon icon-practice-card brand-navy"></div>
        </div>

        <!-- NAVIGATION -->
        <template v-if="resource.topic.length > 1">
          <div class="nav left-nav" title="Slide Left" @click="movePrev">
            <div class="wrapper">
              <div class="icon icon-caret-left"></div>
            </div>
          </div>

          <div class="nav right-nav" title="Slide Right" @click="moveNext">
            <div class="wrapper">
              <div class="icon icon-caret-right"></div>
            </div>
          </div>
        </template>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <!-- TOPIC AREA -->
        <div class="topic-area mgt-15 mgb-22">
          <div class="title-text brand-accent font-weight-700 mgb-1">
            PRACTICE
          </div>
          <div class="topic-text brand-navy font-weight-700 mgb-11">
            {{ resource.title }}
          </div>

          <div class="options">
            <div class="column mgr-20">
              <div class="icon icon-help-circle"></div>
              <div class="text">{{ resource.question_count }} Questions</div>
            </div>

            <div class="column">
              <div class="icon icon-bar-chart"></div>
              <div class="text text-capitalize">{{ resource.category }}</div>
            </div>
          </div>
        </div>

        <!-- RECOMMENDATION ROW -->
        <div class="recommendation-row mgb-12">
          <div class="text border-grey-dark mgb-6">RECOMMENDED FOR</div>

          <div class="data-row">
            <div class="children">
              <div
                class="child avatar rounded-10 brand-inverse-light-bg"
                v-for="(child, index) in students"
                :key="index"
                :title="`${child.firstname} ${child.lastname}`"
              >
                <img
                  v-if="child.image.startsWith('http')"
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
            </div>

            <!-- RECOMMEND BUTTON -->
            <button
              class="btn recommend-btn"
              :class="resource.is_recommended && 'recommend-btn-active'"
              @click="$emit('shareResource')"
            >
              <div
                class="icon"
                :class="resource.is_recommended ? 'icon-accept' : 'icon-share'"
              ></div>
              <div class="text">
                {{ resource.is_recommended ? "Shared" : "Share" }}
              </div>
            </button>
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer"> </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "practiceResourceModal",

  components: {
    modalCover,
  },

  props: {
    resource: Object,
    students: Array,
  },

  data: () => ({
    topic_index: 0,
  }),

  methods: {
    updateIndex(index) {
      this.topic_index = index;
    },

    moveNext() {
      if (this.topic_index !== this.resource.topic.length - 1)
        this.topic_index += 1;
    },

    movePrev() {
      if (this.topic_index !== 0) this.topic_index -= 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-header {
  padding: toRem(45) toRem(18) toRem(25);
  @include flex-column-center;

  .practice-image {
    @include square-shape(175);
  }

  .nav-options {
    @include flex-row-center-nowrap;

    .dot {
      @include square-shape(10);
      background: $border-grey;
      border-radius: 50%;
      margin: 0 toRem(4);
      cursor: pointer;

      &-active {
        background: $brand-accent;
      }
    }
  }

  .practice-indicator {
    position: absolute;
    @include square-shape(48);
    background: #e5e5e5;
    border-radius: 50%;
    z-index: 1;
    left: toRem(22);
    bottom: toRem(-25);

    .icon {
      @include center-placement;
      font-size: toRem(21);
    }
  }

  .nav {
    @include transition(0.4s);
    @include square-shape(34);
    @include center-y;
    background: rgba($white-text, 0.5);
    box-shadow: 0 0 toRem(4) rgba($black-text, 0.15);
    border-radius: 50%;
    cursor: pointer;
    z-index: 9;

    &:hover {
      background: rgba($white-text, 0.7);
    }

    .wrapper {
      position: relative;
      width: 100%;
      height: 100%;

      .icon {
        @include center-placement;
        color: $brand-navy;
        font-size: toRem(14);
      }
    }
  }

  .left-nav {
    left: toRem(20);
  }

  .right-nav {
    right: toRem(20);
  }
}

.modal-cover-body {
  padding: toRem(22) toRem(20) toRem(5);

  .topic-area {
    .title-text {
      @include font-height(12, 16);
    }

    .topic-text {
      @include font-height(16, 28);
    }

    .options {
      @include flex-row-start-nowrap;

      .column {
        @include flex-row-start-nowrap;

        .icon {
          color: $brand-inverse;
          font-size: toRem(18.45);
          margin-right: toRem(11);
        }

        .text {
          font-size: toRem(13.75);
          color: $color-grey-dark;
        }
      }
    }
  }

  .recommendation-row {
    .text {
      @include font-height(12.25, 16);
    }

    .data-row {
      @include flex-row-between-nowrap;

      .children {
        @include flex-row-start-nowrap;

        .child {
          margin: 0 toRem(2.25);

          &:first-of-type {
            margin-left: 0;
          }

          &:last-of-type {
            margin-right: 0;
          }
        }
      }

      .recommend-btn {
        background: $brand-accent-light;
        border: toRem(1) solid $brand-accent;
        padding: toRem(10.5) toRem(20.75);
        color: $color-text;

        .icon {
          font-size: toRem(15.5);
          margin-right: toRem(10);
        }

        .text {
          font-size: toRem(11.25);
        }

        &-active {
          background: rgba($brand-green-light, 0.75);
          border: toRem(1) solid darken($brand-green, 10%);
          color: darken($brand-green, 10%);
        }
      }
    }
  }
}
</style>
