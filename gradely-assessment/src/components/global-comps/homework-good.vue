<template>
  <modal-cover @closeModal="$emit('closeTriggered')">
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div class="left-section-image">
          <img :src="BetterImage" alt="Celebrate" />
        </div>
        <div class="right-section">
          <div class="title-main">
            {{ can_see_score ? "You can do better" : "Exam Completed" }}
          </div>
          <div class="text">
            {{
              can_see_score
                ? "You’ve tried, but you can still do better. There is a genius in you."
                : "Thank you for completing your exam, your exam result will be released soon by your school admin"
            }}
          </div>

          <div class="progress-section" v-if="can_see_score">
            <div class="progress-text">
              <span class="score">You Scored</span>
              <span>
                <span class="score fraction-score">{{ getScoreFraction }}</span>
                <span class="percent">({{ fill }}%)</span>
              </span>
            </div>
            <div class="progress-bar">
              <progress-bar
                :fill="fill"
                fillClass="fill"
                mainClass="main-progress"
                backgroundClass="bacground"
              />
            </div>
          </div>

          <button class="btn btn-accent" @click="$emit('review')">
            Review {{ tag }}
          </button>
        </div>
      </div>
    </template>
  </modal-cover>
</template>
<script>
import modalCover from "@/components/global-comps/modal-cover";
import BetterImage from "@/assets/dynamic/homework-better-image.png";
import ProgressBar from "@/components/global-comps/progress-bar";

export default {
  name: "GreatJobModal",

  components: { modalCover, ProgressBar },

  data() {
    return {
      BetterImage,
    };
  },

  computed: {
    getScoreFraction() {
      let score = Math.round((this.fill / 100) * this.total);
      return `${score}/${this.total}`;
    },
  },

  props: {
    fill: {
      type: [Number, Object, String],
      default: 0,
    },

    tag: {
      type: String,
      default: "Homework",
    },

    can_see_score: {
      type: Number,
      default: 1,
    },

    total: {
      type: Number,
      default: 0,
    },
  },
};
</script>
<style lang="scss">
.modal-cover-body {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  .left-section-image {
    @include breakpoint-custom-down(430) {
      display: none;
    }
  }
  .right-section {
    margin-left: 2rem;
    @include breakpoint-custom-down(430) {
      margin-left: 0px;
    }
    .title-main {
      font-weight: bold;
      font-size: 21px;
      line-height: 29px;
      color: #113255;
    }
    .text {
      font-size: 14px;
      line-height: 165%;
      display: flex;
      align-items: center;
      color: #353535;
      margin-top: 1rem;
      font-weight: 600;
    }
    .progress-section {
      margin-top: 1rem;
      .progress-text {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 5px;
        .score {
          font-weight: normal;
          font-size: 12px;
          line-height: 165%;
          color: #555555;
        }
        .fraction-score {
          font-weight: bold;
          font-size: 14px;
          color: #113255;
          margin-right: 7px;
        }
        .percent {
          font-weight: bold;
          font-size: 13px;
          line-height: 165%;
          color: #113255;
        }
      }
      .progress-bar {
        border-radius: 30px;
        background-color: transparent !important;
        .main-progress {
          height: 6px;
          .fill {
            background: #faa017 !important;
          }
        }
      }
    }
    .btn {
      margin-top: 1rem;
    }
  }
}
</style>
