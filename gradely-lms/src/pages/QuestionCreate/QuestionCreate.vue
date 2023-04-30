<template>
  <main class="question-create-container">
    <!-- header component -->
    <header-top>
      <template v-slot:inner-main-body>
        <div class="create-question-header-wrapper">
          <router-link
            :to="{ name: 'LMSQuestion' }"
            class="create-question-inner-wrapper"
          >
            <div class="avatar icon-caret-left"></div>
            <div class="create-course-wrapper-txt">
              <div class="create-course-title">Create Questions</div>
              <div
                v-if="GET_ASSESMENT_DETAILS"
                class="create-course-meta-title"
              >
                {{
                  GET_ASSESMENT_DETAILS ? GET_ASSESMENT_DETAILS.data.title : ""
                }}
              </div>
            </div>
          </router-link>
        </div>
      </template>
    </header-top>
    <!-- header component ends here -->

    <div class="btn-wrapper-container-group">
      <router-link
        :to="{ name: 'LMSCreate' }"
        :class="$route.path.includes('create-question') ? 'active' : ''"
        class="elm-btn-main btn"
        >Create Questions</router-link
      >
      <router-link
        :to="{ name: 'LMSBulkUpload' }"
        class="elm-btn-main btn"
        :class="$route.path.includes('bulk-upload') ? 'active' : ''"
        >Upload Questions</router-link
      >
    </div>
    <div class="header-main-wrapper">
      <div
        class="title-main-header"
        v-if="$route.path.includes('create-question')"
      >
        Create Questions
      </div>
      <div class="title-main-header" v-if="$route.path.includes('bulk-upload')">
        Upload Questions
      </div>
      <div
        class="meta-title-sub-header"
        v-if="$route.path.includes('create-question')"
      >
        Create as many questions as you want for this assessment.
      </div>
      <div
        class="meta-title-sub-header"
        v-if="$route.path.includes('bulk-upload')"
      >
        Upload a excel (.xls) or text (.txt) file of your questions. Please make
        sure it follows they are formated as in the image below.
      </div>
    </div>
    <main class="question-create-main">
      <!-- test modal here -->

      <!--  -->

      <transition name="fade" mode="out-in">
        <create-questions-card
          :items="reArrangedTopics"
          @create-question="handle_create_question"
          v-if="$route.path.includes('create-question')"
          :ajaxFunction="searchTopicsFunction"
          @disable="isButtonDisabled = true"
          @enable="isButtonDisabled = false"
          @get-single-question="get_single_question"
          @edit-question="handle_edit_question"
        ></create-questions-card>
      </transition>
      <transition name="fade" mode="out-in">
        <upload-questions-card
          :ajaxFunction="searchTopicsFunction"
          :items="reArrangedTopics"
          v-if="$route.path.includes('bulk-upload')"
          @disable="isButtonDisabled = true"
          @enable="isButtonDisabled = false"
        ></upload-questions-card>
      </transition>
    </main>
    <footer
      v-if="!$route.path.includes('bulk-upload')"
      class="footer-main-wrapper"
    >
      <span class="left-btn-wrapper-main">
        <button
          @click="$router.push({ name: 'LMSQuestion' })"
          :disabled="isButtonDisabled"
          class="btn btn-accent"
        >
          Add to
          {{
            `${
              GET_ASSESMENT_DETAILS &&
              GET_ASSESMENT_DETAILS.data &&
              GET_ASSESMENT_DETAILS.data.tag
                ? GET_ASSESMENT_DETAILS.data.tag
                : "HOMEWORK"
            }`
          }}
        </button>
      </span>
    </footer>
  </main>
</template>

<script>
import CreateQuestionsCard from "@/components/CreatQuestionCard.vue";
import UploadQuestionsCard from "@/components/UploadQuestionsCard.vue";
import HeaderTop from "@/components/GlobalComps/HeaderTop";
import {
  FETCH_TOPIC_LIST,
  POST_CREATE_QUESTIONS,
  GET_TOPICS_LIST,
  SEARCH_TOPICS,
  FETCH_CLASS_QUESTION_DETAILS,
  PUT_EDIT_QUESTION,
} from "./store.module.QuestionCreateModule/constants";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { removeLocalStorage } from "../../services/localStorageMgt";
import {
  POST_UPLOAD_FILE,
  GET_UPLOAD_DETAILS,
  GET_TEACHER_CLASSES_ACTION,
  GET_TEACHER_CLASSES,
} from "../../store/module/general/constant";
import {
  FETCH_TEACHER_QUESTIONS,
  GET_ASSESMENT_DETAILS,
  GET_ASSESMENT_DETAILS_ACTION,
  GET_TEACHER_QUESTIONS,
  SET_ASSESMENT_DETAILS,
} from "../AssesmentQuestions/store.module.AssesmentQuestions/constants";

export default {
  name: "createQuestions",
  data() {
    return {
      isButtonDisabled: false,
      uploadPayload: {},
      isUpdate: false,
    };
  },
  components: {
    CreateQuestionsCard,
    UploadQuestionsCard,
    HeaderTop,
  },

  computed: {
    ...mapGetters([
      GET_TOPICS_LIST,
      GET_ASSESMENT_DETAILS,
      GET_TEACHER_QUESTIONS,
      GET_UPLOAD_DETAILS,
      GET_TEACHER_CLASSES,
    ]),
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
  methods: {
    ...mapActions([
      POST_CREATE_QUESTIONS,
      FETCH_CLASS_QUESTION_DETAILS,
      FETCH_TOPIC_LIST,
      SEARCH_TOPICS,
      PUT_EDIT_QUESTION,
      POST_UPLOAD_FILE,
      FETCH_TEACHER_QUESTIONS,
      GET_ASSESMENT_DETAILS_ACTION,
      GET_TEACHER_CLASSES_ACTION,
    ]),
    ...mapMutations([SET_ASSESMENT_DETAILS]),
    async get_single_question(e, performRoute = true) {
      if (parseInt(e) == parseInt(this.$route.query.id, 10)) {
        return;
      }
      await this[FETCH_CLASS_QUESTION_DETAILS]({ question_id: e });
      if (!performRoute) {
        return;
      }
      this.$router.push({
        query: {
          action: "edit",
          id: e,
        },
      });
    },
    async handle_create_question(payload) {
      if (payload.fileMeta) {
        const formData = new FormData();
        formData.append("file", payload?.fileMeta?.file);
        await this[POST_UPLOAD_FILE](formData);
        this.uploadPayload = payload;
        return;
      }
      await this[POST_CREATE_QUESTIONS]({
        ...payload,
      });
    },
    async handle_edit_question(payload) {
      if (payload.fileMeta) {
        const formData = new FormData();
        formData.append("file", payload?.fileMeta?.file);
        await this[POST_UPLOAD_FILE](formData);
        this.uploadPayload = payload;
        return;
      }
      await this[PUT_EDIT_QUESTION]({
        ...payload,
      });
    },
    searchTopicsFunction(e) {
      this[SEARCH_TOPICS]({
        subject_id: this[GET_ASSESMENT_DETAILS]?.data?.subject?.id,
        ...this[GET_ASSESMENT_DETAILS]?.data?.class,
        topic: e,
      });
    },
  },
  mounted() {
    const homework_id = this.$route?.params?.id;

    if (!homework_id) {
      removeLocalStorage("HOME_WORK");
      removeLocalStorage("savedHomeWork");
      this.$router.push({
        name: "CreateHomeWork",
      });
    }

    if (!this[GET_ASSESMENT_DETAILS]) {
      if (homework_id) {
        this[GET_ASSESMENT_DETAILS_ACTION](homework_id);
      }
    } else {
      this[FETCH_TEACHER_QUESTIONS](this.$route?.params?.id);
      this[FETCH_TOPIC_LIST]({
        class_id: this[GET_ASSESMENT_DETAILS]?.data?.class_id,
        subject_id: this[GET_ASSESMENT_DETAILS]?.data?.subject?.id,
        ...this[GET_ASSESMENT_DETAILS]?.data?.class,
      });
    }
  },
  watch: {
    GET_UPLOAD_DETAILS() {
      if (
        this[GET_UPLOAD_DETAILS]?.code === 200 &&
        this[GET_UPLOAD_DETAILS]?.name === "success" &&
        this[GET_UPLOAD_DETAILS]?.message === "Success" &&
        this[GET_UPLOAD_DETAILS]?.data &&
        this[GET_UPLOAD_DETAILS]?.data?.ObjectURL
      ) {
        this.uploadPayload.data.image = this[
          GET_UPLOAD_DETAILS
        ]?.data?.ObjectURL;
        delete this.uploadPayload.fileMeta;
        if (this?.$route?.query?.action === "edit") {
          this.handle_edit_question(this.uploadPayload);
          return;
        }
        this.handle_create_question(this.uploadPayload);
      }
    },
    GET_TEACHER_QUESTIONS() {
      if (
        this[GET_TEACHER_QUESTIONS]?.code !== 200 &&
        this[GET_TEACHER_QUESTIONS]?.message === "Validation failed"
      ) {
        removeLocalStorage("HOME_WORK");
        removeLocalStorage("savedHomeWork");
        this.$router.push({
          name: "CreateHomeWork",
        });
      }
    },
    GET_ASSESMENT_DETAILS() {
      if (
        this[GET_ASSESMENT_DETAILS] &&
        this[GET_ASSESMENT_DETAILS]?.code === 200 &&
        this[GET_ASSESMENT_DETAILS]?.data &&
        this[GET_ASSESMENT_DETAILS]?.message === "Homework record found" &&
        this[GET_ASSESMENT_DETAILS]?.name === "success"
      ) {
        if (this.isUpdate) {
          this.isUpdate = false;
          return;
        }
        this[GET_TEACHER_CLASSES_ACTION](
          this[GET_ASSESMENT_DETAILS]?.data?.class?.global_class_id
        );
        this[FETCH_TEACHER_QUESTIONS](this.$route?.params?.id);
      } else {
        this.$router.push({
          name: "CreateHomeWork",
        });
        return;
      }
    },
    GET_TEACHER_CLASSES() {
      if (
        this[GET_TEACHER_CLASSES] &&
        this[GET_TEACHER_CLASSES]?.code === 200 &&
        this[GET_TEACHER_CLASSES]?.data &&
        this[GET_TEACHER_CLASSES]?.message === "Possible topics to be seen" &&
        this[GET_TEACHER_CLASSES]?.name === "success"
      ) {
        // let data = this[GET_ASSESMENT_DETAILS]?.data;
        // data = {
        //   ...data,
        //   class: {
        //     ...this[GET_ASSESMENT_DETAILS]?.data?.class,
        //     global_class_id: this[GET_TEACHER_CLASSES]?.data[0]?.global_class_id
        //   }
        // };
        // this.isUpdate = true;
        // this[SET_ASSESMENT_DETAILS]({ ...this[GET_ASSESMENT_DETAILS], data });
        this[FETCH_TOPIC_LIST]({
          class_id: this[GET_ASSESMENT_DETAILS]?.data?.class_id,
          subject_id: this[GET_ASSESMENT_DETAILS]?.data?.subject?.id,
          ...this[GET_ASSESMENT_DETAILS]?.data?.class,
        });
      } else {
        this.$router.push({
          name: "CreateHomeWork",
        });

        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.question-create-container {
  position: relative;
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
.btn-wrapper-container-group {
  @include flex-row-center-nowrap;
  margin: 1rem auto;
  .elm-btn-main {
    border-radius: 5px;
    margin: 1rem;
    background: #f5f5f5;
    color: #757575;
    font-weight: bold;
    font-size: 0.875rem;
    line-height: 19px;

    @include breakpoint-down(md) {
      border-radius: 5px;
      margin: 0.47rem;
      background: #f5f5f5;
      color: #757575;
      font-size: 0.575rem;
      line-height: 19px;
      padding: 0.78125rem 0.6625rem;
    }
  }
  .elm-btn-main.active {
    background: $brand-navy;
    color: #fff;
  }
  .elm-btn-main.btn.active:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
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
.question-create-main {
  margin: 0 auto;
  margin-bottom: 7rem;
  max-width: 70rem;
  padding: 0.625rem;
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
  z-index: 3;
}
</style>
