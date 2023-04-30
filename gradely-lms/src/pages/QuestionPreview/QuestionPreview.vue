<template>
  <div>
    <edit-modal
      :questions="allQuestions"
      :currentQuestion="currentQuestion"
      v-if="isEditOpen"
      @closeTriggered="isEditOpen = false"
      @next="handle_next"
      @edit="handle_edit"
      :searchFunction="searchTopicsFunction"
      :items="reArrangedTopics"
      @delete="handle_delete"
    />

    <assign-assessment-topic-modal
      @closeTriggered="assignTopic = false"
      v-if="assignTopic"
      :searchFunction="searchTopicsFunction"
      :items="reArrangedTopics"
      @assignTopic="assignTopicToQuestion"
    />

    <!-- header component -->
    <header-top>
      <template v-slot:inner-main-body>
        <div class="create-question-header-wrapper">
          <router-link
            :to="{ name: 'LMSBulkUpload' }"
            class="create-question-inner-wrapper"
          >
            <div class="avatar icon-caret-left"></div>
            <div class="create-course-wrapper-txt">
              <div class="create-course-title">Preview Questions</div>
              <div class="create-course-meta-title">
                Uploaded file name here.txt
              </div>
            </div>
          </router-link>
        </div>
      </template>
    </header-top>

    <div class="header-main-wrapper">
      <div class="title-main-header">Preview Questions</div>
      <div class="meta-title-sub-header">
        Review each of the generated questions before you save.
      </div>
    </div>
    <!-- header component ends here -->

    <main class="question-create-main">
      <div v-if="GET_EXTRACTED_QUESTIONS" class="main">
        <div
          v-if="
            GET_EXTRACTED_QUESTIONS.error &&
              GET_EXTRACTED_QUESTIONS.error.errors
          "
          class="error-wrapper"
        >
          <ErrorNotificationSnack
            :errors="GET_EXTRACTED_QUESTIONS.error.errors"
            v-if="errorQuestions.length"
          />
          <AssesmentCard
            @editQuestion="handle_bulk_edit"
            :activeNumber="currentQuestion"
            @deleteQuestion="handle_bulk_delete"
            :key="question.id"
            :question="question"
            v-for="question in errorQuestions"
            :showDrop="false"
          />
        </div>
      </div>
      <success-notification-snack
        v-if="GET_EXTRACTED_QUESTIONS"
        :text="
          `${questions.length ||
            0} Questions parsed successfully and ready to be added to your assessment.`
        "
      ></success-notification-snack>

      <assign-assessment-topic-card
        @deleteSelection="$bus.$emit('clearQuestionSelection')"
        @assignTopic="toggleAssignTopicModal"
        @deleteBulk="handle_multiple_delete"
      />

      <div v-if="GET_EXTRACTED_QUESTIONS" class="questions-wrapper">
        <AssesmentCard
          check
          v-for="(question, index) in questions"
          :key="index + question.id"
          :question="question"
          @editQuestion="handle_bulk_edit"
          :activeNumber="currentQuestion"
          @deleteQuestion="handle_bulk_delete"
          @selectionUpdate="updateQuestionSelection(question, $event)"
          :topicName="getTopicName(GET_TOPICS_LIST.data, question.topic_id)"
        />
      </div>
      <div class="loader-container" v-if="isLoading">
        <SkelectonQuestionCard v-for="item in [1, 2]" :key="item" />
      </div>
    </main>
    <footer class="footer-main-wrapper index-99">
      <span class="left-btn-wrapper-main">
        <button
          v-if="GET_EXTRACTED_QUESTIONS"
          class="btn btn-accent"
          @click="handle_bulk_upload"
          :disabled="GET_IS_UPLOADING || isDisabled"
        >
          <span
            class="icon-dotted-roller icon spinner animate font-15"
            v-show="GET_IS_UPLOADING"
          ></span>
          <span class="text-area">
            {{
              GET_IS_UPLOADING
                ? "Uploading"
                : `Add to
            ${
              GET_ASSESMENT_DETAILS &&
              GET_ASSESMENT_DETAILS.data &&
              GET_ASSESMENT_DETAILS.data.tag
                ? GET_ASSESMENT_DETAILS.data.tag
                : "HOMEWORK"
            }`
            }}
          </span>
        </button>
      </span>
    </footer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import HeaderTop from "@/components/GlobalComps/HeaderTop";
import SuccessNotificationSnack from "@/components/SuccessNotification.vue";
import AssignAssessmentTopicCard from "@/components/AssignAssessmentTopicCard";
import ErrorNotificationSnack from "@/components/ErrorNotificationSnack.vue";
import SkelectonQuestionCard from "@/components/SkelectonQuestionCard.vue";
import AssesmentCard from "@/components/AssesmentCard.vue";
import EditModal from "@/components/questionEditModal.vue";
import AssignAssessmentTopicModal from "@/components/ModalComps/AssignAssessmentTopicModal";
import {
  GET_EXTRACTED_QUESTIONS,
  POST_BULK_QUESTIONS,
  GET_IS_UPLOADING,
  GET_BULK_QUESTIONS,
  FETCH_TOPIC_LIST,
  SEARCH_TOPICS,
  GET_TOPICS_LIST,
} from "../QuestionCreate/store.module.QuestionCreateModule/constants";
import { TOAST_ACTION } from "@/components/SideNotificationSnack/store.module/constants";
import { GET_ASSESMENT_DETAILS } from "../AssesmentQuestions/store.module.AssesmentQuestions/constants";
import { isEmpty } from "../../services/stringMgt";
export default {
  name: "PreviewQuestion",
  components: {
    SkelectonQuestionCard,
    SuccessNotificationSnack,
    AssignAssessmentTopicCard,
    AssesmentCard,
    HeaderTop,
    ErrorNotificationSnack,
    EditModal,
    AssignAssessmentTopicModal,
  },
  data() {
    return {
      isLoading: false,
      topic_id: 0,
      isEditOpen: false,
      currentQuestion: 1,
      questions: [],
      topicAssignedQuestions: [],
      errorQuestions: [],
      allQuestions: [],
      isDisabled: true,
      assignTopic: false,
      show_topic_card: true,
    };
  },
  computed: {
    ...mapGetters([
      GET_EXTRACTED_QUESTIONS,
      GET_IS_UPLOADING,
      GET_BULK_QUESTIONS,
      GET_ASSESMENT_DETAILS,
      GET_TOPICS_LIST,
    ]),

    getQuestionChecked() {
      let checked = false;
      this.questions.forEach((question) => {
        if (question.checked) checked = true;
        return;
      });

      return checked;
    },

    reArrangedTopics() {
      //rearanging the topics array to make it suitable for the custom select dropdown
      const topics = [];
      this[GET_TOPICS_LIST]?.data?.forEach((topicObj) => {
        let object = {};
        (object.text = topicObj.topic),
          (object.value = topicObj?.topic_id || topicObj.id);
        topics.push(object);
      });
      return topics;
    },
  },
  mounted() {
    if (!this[GET_EXTRACTED_QUESTIONS] || !this.$route?.query?.topic_id) {
      this.$router.push({
        name: "LMSBulkUpload",
      });
      return;
    } else {
      this.questions = this.GET_EXTRACTED_QUESTIONS?.data;
      this.errorQuestions = this.GET_EXTRACTED_QUESTIONS?.error?.questions;
      this.allQuestions = [
        ...(this.GET_EXTRACTED_QUESTIONS?.error?.questions
          ? this.GET_EXTRACTED_QUESTIONS?.error?.questions
          : []),
        ...this.GET_EXTRACTED_QUESTIONS?.data,
      ];
    }
    this.topic_id = this.$route?.query?.topic_id;
    if (!this[FETCH_TOPIC_LIST]?.data) {
      this[FETCH_TOPIC_LIST]({
        class_id: this[GET_ASSESMENT_DETAILS]?.data?.class_id,
        subject_id: this[GET_ASSESMENT_DETAILS]?.data?.subject?.id,
        ...this[GET_ASSESMENT_DETAILS]?.data?.class,
      });
    }
  },
  methods: {
    ...mapActions([
      POST_BULK_QUESTIONS,
      FETCH_TOPIC_LIST,
      TOAST_ACTION,
      SEARCH_TOPICS,
    ]),

    getTopicName(topics, topic_id) {
      return (
        topics.find((topic) => (topic?.topic_id || topic?.id) === topic_id)
          ?.topic || ""
      );
    },

    updateQuestionSelection(updated_question, checked) {
      this.questions = this.questions.map((question) => {
        if (updated_question.id === question.id) question.checked = checked;
        return question;
      });

      this.allQuestions = this.allQuestions.map((question) => {
        if (updated_question.id === question.id) question.checked = checked;
        return question;
      });
    },

    assignTopicToQuestion(topic_id) {
      this.questions = this.questions.map((question) => {
        if (question.checked) question.topic_id = topic_id;
        return question;
      });

      this.allQuestions = this.allQuestions.map((question) => {
        if (question.checked) question.topic_id = topic_id;
        return question;
      });

      this.$bus.$emit("clearQuestionSelection");
      this.assignTopic = false;
    },

    toggleAssignTopicModal() {
      if (!this.getQuestionChecked) {
        this[TOAST_ACTION]({
          toastData: {
            toastOpen: true,
            toastText: "Select at least one question",
            toastState: "error",
            showBtn: true,
          },
          timeout: 3500,
        });
        return;
      }
      this.assignTopic = true;
    },

    handle_bulk_upload() {
      const uploadPayload = {
        homework_id: this[GET_ASSESMENT_DETAILS]?.data?.id,
        topic_id: this.topic_id,
        questions: this.questions,
      };
      this[POST_BULK_QUESTIONS](uploadPayload);
    },
    handle_next() {
      const mapedQuestion = this.questions.map((question) =>
        Number(question.id)
      );
      const indexOfQuestion = mapedQuestion.indexOf(
        Number(this.currentQuestion)
      );
      if (!this.questions[indexOfQuestion + 1]) {
        this.currentQuestion = mapedQuestion[0];
      } else {
        this.currentQuestion = mapedQuestion[indexOfQuestion + 1];
      }
    },
    handle_bulk_edit(e) {
      this.currentQuestion = e;
      this.isEditOpen = true;
    },

    handle_bulk_delete(e) {
      this.questions = this.questions.filter(
        (question) => Number(question.id) !== Number(e)
      );

      this.allQuestions = this.allQuestions.filter(
        (question) => Number(question.id) !== Number(e)
      );
    },

    handle_multiple_delete() {
      if (!this.getQuestionChecked) {
        this[TOAST_ACTION]({
          toastData: {
            toastOpen: true,
            toastText: "Select questions to be deleted",
            toastState: "error",
            showBtn: true,
          },
          timeout: 3500,
        });
        return;
      }

      if (confirm("Are you sure you want to delete selected questions?")) {
        this.questions = this.questions.filter((question) => !question.checked);

        this.allQuestions = this.allQuestions.filter(
          (question) => !question.checked
        );
      }
    },

    handle_edit(e) {
      const mapedQuestion = this.questions.map((question) =>
        Number(question.id)
      );
      const indexOfQuestion = mapedQuestion.indexOf(
        Number(this.currentQuestion)
      );
      const questionDuplicate = [...this.questions];
      questionDuplicate[indexOfQuestion] = e.question;
      this.questions = questionDuplicate;
      // this.isDisabled = e.disabled;
    },
    handle_delete(e) {
      // const mapedQuestion = this.questions.map((question) =>
      //   Number(question.id)
      // );
      // const indexOfQuestion = mapedQuestion.indexOf(Number(e));
      const newQuestions = this.questions.filter(
        (question) => Number(question.id) !== Number(e)
      );
      this.questions = newQuestions;
      this.isEditOpen = false;
    },
    searchTopicsFunction(e) {
      this[SEARCH_TOPICS]({
        subject_id: this[GET_ASSESMENT_DETAILS]?.data?.subject?.id,
        ...this[GET_ASSESMENT_DETAILS]?.data?.class,
        topic: e,
      });
    },
  },
  watch: {
    GET_BULK_QUESTIONS() {
      if (
        this[GET_BULK_QUESTIONS]?.code === 406 &&
        !this[GET_BULK_QUESTIONS]?.data?.length
      ) {
        this[TOAST_ACTION]({
          toastData: {
            toastOpen: true,
            toastText: "please we encountered an error questions not uploaded",
            toastState: "error",
            showBtn: false,
          },
          timeout: 3000,
        });
      } else if (
        this[GET_BULK_QUESTIONS]?.code === 200 &&
        this[GET_BULK_QUESTIONS]?.name === "success"
      ) {
        this[TOAST_ACTION]({
          toastData: {
            toastOpen: true,
            toastText: "Questions Uploaded",
            toastState: "success",
            showBtn: false,
          },
          timeout: 3000,
          callback: () => {
            this.$router.push({
              name: "LMSQuestion",
            });
          },
        });
      } else {
        this[TOAST_ACTION]({
          toastData: {
            toastOpen: true,
            toastText: this[GET_BULK_QUESTIONS]?.message,
            toastState: "error",
            showBtn: false,
          },
          timeout: 3000,
        });
      }
    },
    GET_EXTRACTED_QUESTIONS() {
      if (
        this.GET_EXTRACTED_QUESTIONS?.code === 200 &&
        this.GET_EXTRACTED_QUESTIONS?.data?.length &&
        this.GET_EXTRACTED_QUESTIONS?.message === "successful"
      ) {
        this.questions = this.GET_EXTRACTED_QUESTIONS?.data;
        this.errorQuestions = this.GET_EXTRACTED_QUESTIONS?.error?.questions;
        this.allQuestions = [
          ...this.GET_EXTRACTED_QUESTIONS?.error?.questions,
          ...this.GET_EXTRACTED_QUESTIONS?.data,
        ];
      }
    },
    questions: {
      handler() {
        let arr = [];
        this.questions.forEach((question) => {
          if (!question.topic_id) {
            question.topic_id = this.$route?.query?.topic_id;
          }

          switch (question.type) {
            case "bool":
              if (
                isEmpty(
                  question?.question?.replace("[IMAGE]", ""),
                  question?.answer,
                  question?.topic_id
                )
              ) {
                arr.push("");
              }
              break;
            case "multiple":
              if (
                isEmpty(
                  question?.question
                    ? question?.question?.replace("[IMAGE]", "")
                    : "",
                  question?.answer ? question?.answer : "",
                  question?.topic_id ? question?.topic_id : "",
                  question?.option_a
                    ? question?.option_a?.replace("[IMAGE]", "")
                    : "",
                  question?.option_b
                    ? question?.option_b?.replace("[IMAGE]", "")
                    : "",
                  question?.option_c
                    ? question?.option_c?.replace("[IMAGE]", "")
                    : "",
                  question?.option_d
                    ? question?.option_d?.replace("[IMAGE]", "")
                    : ""
                )
              ) {
                arr.push("");
              }
              break;
            case "short":
              if (
                question.type === "short" &&
                !Array.isArray(question.answer)
              ) {
                const splited = question.answer.split(",");
                if (!splited || !splited.length) {
                  question.answer = [this.question?.answer];
                } else {
                  question.answer = splited;
                }
              }
              if (
                isEmpty(
                  question?.question?.replace("[IMAGE]", ""),
                  question?.topic_id
                ) ||
                (question?.answer.length === 1 && !question?.answer[0]?.length
                  ? true
                  : false) ||
                (question?.answer.filter((e) => e.trim()).length
                  ? false
                  : true) ||
                (question?.answer?.filter((e) => e.match(/(\w+)/g)?.length > 5)
                  .length
                  ? true
                  : false)
              ) {
                arr.push("");
              }
              break;
            case "essay":
              if (
                isEmpty(
                  question?.question?.replace("[IMAGE]", ""),
                  question?.topic_id
                )
              ) {
                arr.push("");
              }
              break;
            default:
              break;
          }
        });
        arr.length ? (this.isDisabled = true) : (this.isDisabled = false);
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss">
.questions-wrapper {
  margin-bottom: 7rem;
}
.create-question-header-wrapper {
  @include flex-row-start-nowrap;
  max-width: 100rem;
  margin: 0 auto;
  padding: 0.56rem;
  .create-question-inner-wrapper {
    @include flex-row-start-nowrap;
    .create-course-wrapper-txt {
      .create-course-title {
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 22px;
        display: flex;
        align-items: center;
        color: $brand-black;
      }
      .create-course-meta-title {
        @include flex-row-start-nowrap;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
        color: $color-grey-dark;
      }
    }
    .icon-caret-left {
      @include flex-row-center-nowrap;
      color: #113255;
      background: #f5f5f5;
      margin: 0.76rem;
    }
  }
}

.header-main-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: 1rem auto;
  .title-main-header {
    font-style: normal;
    font-weight: bold;
    font-size: 1.34rem;
    line-height: 29px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #353535;
  }
  .meta-title-sub-header {
    font-style: normal;
    font-weight: normal;
    font-size: 0.98rem;
    line-height: 160%;
    display: flex;
    align-items: center;
    text-align: center;
    color: #353535;
  }
}
.footer-main-wrapper {
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  align-items: center;
  background: white;
  position: fixed;
  bottom: 0px;
  width: 100%;
  .spinner {
    margin-right: 8px;
    font-size: 15px;
  }
}

.question-create-main {
  margin: 0 auto;
  max-width: 70rem;
  padding: 0.625rem;
}
</style>
