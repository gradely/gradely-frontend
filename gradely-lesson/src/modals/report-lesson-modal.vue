<template>
  <modal-cover @closeModal="$emit('closeTriggered')" show_close_btn>
    <div class="body-wrapper" slot="modal-cover-body">
      <div class="mgt-35 gfont-16 font-weight-700 mgb-8 text-center">What is wrong with this Lesson?</div>
      <div class="gfont-14 color-ash text-center mgb-30">Select all that applies</div>

      <div class="report-option" v-for="(report,index) in options" :key="index">
        <input type="checkbox" name id v-model="report.selected" />
        <div class="position-relative" style="bottom:4px">
          <div class="gfont-14 font-weight-700 mgb-3">{{report.title}}</div>
          <div class="gfont-12 color-grey-dark">{{report.subtitle}}</div>
        </div>
      </div>

      <div class="mgb-8">
        <span class="gfont-13 font-weight-700">Any other details?</span>

        <span class="gfont-11 font-weight-light color-grey-dark mgl-3">OPTIONAL</span>
      </div>

      <textarea
        v-model="description"
        name
        id
        cols="30"
        rows="4"
        class="feedback form-control w-100"
      ></textarea>

      <div slot="modal-cover-footer" class="d-flex justify-content-end mgt-20 mgb-20">
        <button
          @click="flagLesson"
          class="btn btn-accent gfont-11 font-weight-700"
          :disabled="disabled"
          ref="report"
        >SUBMIT FEEDBACK</button>
      </div>
    </div>
  </modal-cover>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const lesson = createNamespacedHelpers('lesson');
import modalCover from '@/components/global-comps/modal-cover';
export default {
  name: 'ReportLessonModal',

  props: {
    content: {
      type: Object,
      default: () => {},
    },
  },

  components: {
    modalCover,
  },

  computed: {
    getReportTitles() {
      let titles = this.options.filter((option) => option.selected);
      return titles.map((option) => option.title).join(', ');
    },

    getReportSubtitles() {
      let subtitles = this.options.filter((option) => option.selected);
      let description = subtitles.length
        ? ', ' + this.description
        : this.description;
      return (
        subtitles.map((option) => option.subtitle).join(', ') + description
      );
    },

    getFlagPayload() {
      return {
        reference_id: this.content?.id,
        title: this.getReportTitles,
        description: this.getReportSubtitles,
      };
    },

    disabled() {
      return !this.description && !this.getReportSubtitles;
    },
  },

  data() {
    return {
      description: '',

      options: [
        {
          title: 'Labelling Problem',
          subtitle:
            'Wrong title topic, or assigned to the wrong subject / class',
          selected: false,
        },

        {
          title: 'Content Issue',
          subtitle: 'Incorrect concept, poor explanation or grammar',
          selected: false,
        },

        {
          title: 'Formating Error',
          subtitle: 'Wrong spellings, poor formula presentation',
          selected: false,
        },
      ],
    };
  },

  methods: {
    ...lesson.mapActions(['reportLesson']),

    flagLesson() {
      this.handleClick('report', 'submitting');

      this.reportLesson(this.getFlagPayload)
        .then((response) => {
          if (response.code == 200) {
            this.pushAlert('Feeback submitted', 'success');
            this.handleClick('report', 'submitted', false);

            setTimeout(() => {
              this.$emit('closeTriggered');
            }, 850);
          } else {
            this.handleClick('report', 'submission failed', false);

            setTimeout(() => {
              this.handleClick('report', 'submit feedback', false);
            }, 700);
            this.pushAlert('Failed to submit feedback', 'warning');
          }
        })
        .catch((err) => {
          this.handleClick('report', 'submission failed', false);

          setTimeout(() => {
            this.handleClick('report', 'submit feedback', false);
          }, 700);
          this.pushAlert('Error submitting feeback', 'error');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.body-wrapper {
  padding: toRem(10) toRem(32);

  @include breakpoint-down(md) {
    padding: toRem(10) toRem(25);
  }

  @include breakpoint-down(sm) {
    padding: toRem(10) toRem(20);
  }

  @include breakpoint-down(xs) {
    padding: toRem(10) toRem(8);
  }
}

.report-option {
  @include flex-row-start-nowrap;
  align-items: flex-start;
  gap: 0 toRem(5);
  margin-bottom: toRem(24);

  &:last-child {
    margin-bottom: 0;
  }
}
</style>