<template>
  <div>
    <!-- header component -->
    <header-top>
      <template v-slot:inner-main-body>
        <div class="assesment-question-header-wrapper">
          <AssesmentEditModal
            @closeTriggered="isAssesmentEditModalOpen = false"
            v-if="
              isAssesmentEditModalOpen &&
              GET_ASSESMENT_DETAILS &&
              GET_ASSESMENT_DETAILS.data
            "
            @edit="handle_assesment_edit"
            :disabled="GET_IS_ASSESMENT_EDITING"
            :currentTag="`${GET_ASSESMENT_DETAILS.data.tag}`"
            :assessmentTitle="`${GET_ASSESMENT_DETAILS.data.title}`"
          />
          <AssesmentPreviewModal
            v-if="
              isPreviewModalOpen && GET_TEACHER_QUESTIONS.name === 'success'
            "
            @closeTriggered="isPreviewModalOpen = false"
            :questions="GET_TEACHER_QUESTIONS.data"
            :currentIndex="previewId"
            @change-index="previewId = $event"
            @delete="handle_question_delete"
            @edit="handle_question_edit"
          />
          <AssesmentDetailsModal
            :details="GET_ASSESMENT_DETAILS.data"
            @closeTriggered="isDetailsModalOpen = false"
            v-if="isDetailsModalOpen && !isPublishedModal"
            :isLoading="GET_IS_ASSESMENT_DETAILS_LOADING"
            @delete="handle_details_delete_event"
            :disabled="
              GET_IS_ASESSMENT_PUBLISHING || !GET_TEACHER_QUESTIONS.data
            "
            :showSpinner="GET_IS_ASESSMENT_PUBLISHING"
            @publish="handle_publish"
            @edit="handle_assesment_edit_modal"
          />
          <AssesmentDeleteModal
            @closeTriggered="isDeleteModalOpen = false"
            v-if="isDeleteModalOpen"
            :disabled="GET_IS_ASESSMENT_DELETING"
            @delete="handle_delete"
          />
          <DraftModal
            @view-drafts="handle_drafts"
            @closeTriggered="isDraftModalOpen = false"
            v-if="
              isDraftModalOpen &&
              GET_ASSESMENT_DETAILS &&
              GET_ASSESMENT_DETAILS.data
            "
            :assesmentTitle="GET_ASSESMENT_DETAILS.data.title"
          />

          <!-- HANDLE TOUR PUBLISH FLOW -->
          <AssesmentPublishModal
            @return="handle_return"
            v-if="isPublishedModal && $route.query.tour"
            :assessmentTitle="GET_ASSESMENT_DETAILS.data.title"
            :tag="GET_ASSESMENT_DETAILS.data.tag"
            @closeTriggered="isPublishedModal = !isPublishedModal"
          ></AssesmentPublishModal>

          <AssesmentPublishModal
            @return="handle_return"
            v-if="
              isPublishedModal &&
              GET_ASSESMENT_DETAILS &&
              GET_ASSESMENT_DETAILS.data
            "
            :assessmentTitle="GET_ASSESMENT_DETAILS.data.title"
            :tag="GET_ASSESMENT_DETAILS.data.tag"
            @closeTriggered="isPublishedModal = !isPublishedModal"
          ></AssesmentPublishModal>

          <div class="assesment-question-inner-wrapper">
            <div class="avatar icon-library"></div>
            <div class="assesment-course-wrapper-txt">
              <div
                v-if="GET_ASSESMENT_DETAILS && GET_ASSESMENT_DETAILS.data"
                class="assesment-course-title"
              >
                {{ GET_ASSESMENT_DETAILS.data.title || "" }}
              </div>
              <div
                v-if="GET_ASSESMENT_DETAILS && GET_ASSESMENT_DETAILS.data"
                class="assesment-course-meta-title"
              >
                {{
                  GET_ASSESMENT_DETAILS.data.open_date
                    ? getShortReadableDate(GET_ASSESMENT_DETAILS.data.open_date)
                    : ""
                }}
                -
                {{
                  GET_ASSESMENT_DETAILS.data.close_date
                    ? getShortReadableDate(
                        GET_ASSESMENT_DETAILS.data.close_date
                      )
                    : ""
                }}
              </div>
            </div>
          </div>

          <div
            @click="handle_assesment_details"
            class="question-details-btn"
            v-if="!$route.query.tour"
          >
            <span class="avatar left-inner-circle icon-alert-circle"></span>
            <span class="avatar right-inner-txt">Details</span>
          </div>
        </div>
      </template>
    </header-top>

    <!-- header component ends here -->
    <section class="question-manage-section">
      <div class="assesment-question-wrapper">
        <div class="sub-meta-inner-header-wrapper">
          <span class="question-left-title">
            <span class="question-left-title-txt">Questions</span>

            <template v-if="$route.query.tour">
              <span class="question-left-title-number"
                >({{ selected_tour_questions.length }})</span
              >
            </template>

            <template v-else>
              <span
                v-if="!GET_TEACHER_QUESTIONS.data"
                class="question-left-title-number"
                >({{ 0 }})</span
              >
              <span
                v-if="GET_TEACHER_QUESTIONS.data"
                class="question-left-title-number"
                >({{ GET_TEACHER_QUESTIONS.data.length }})</span
              >
            </template>
          </span>
          <span class="question-left-title" v-if="!$route.query.tour">
            <button class="btn-right btn" toggle-type="drop-toggle">
              <span toggle-type="drop-toggle" class="icon-plus"></span>
              <span toggle-type="drop-toggle" class="questions-txt"
                >Questions</span
              >
              <ul
                :class="[
                  is_questions_btn_active
                    ? `option-select-wrapper box-shadow-effect rounded-5`
                    : `close-option-select-wrapper`,
                ]"
              >
                <router-link
                  :to="{ name: 'LMSCreate' }"
                  class="create-question-item"
                  >Create Question</router-link
                >
                <router-link
                  :to="{ name: 'LMSSelect' }"
                  class="create-question-item"
                  >Select Question</router-link
                >
              </ul>
            </button>
          </span>
        </div>
        <transition-group
          v-if="GET_IS_QUESTION_LOADING"
          name="fade"
          mode="out-in"
        >
          <div
            class="skeleton-contaner"
            v-for="item in [1, 2, 3, 4, 5]"
            :key="item"
          >
            <SkelectonQuestionCard />
          </div>
        </transition-group>

        <template v-if="$route.query.tour">
          <assesment-card
            v-for="(question, index) in selected_tour_questions"
            :key="question.id"
            :index="index"
            :question="question"
            :isIndexed="true"
            @editQuestion="handle_question_edit"
            @deleteQuestion="handle_question_delete"
            @view-details="handle_preview"
            :topicName="getTopicName(GET_TOPICS_LIST.data, question.topic_id)"
          ></assesment-card>
        </template>

        <template v-else>
          <div
            v-if="
              !GET_IS_QUESTION_LOADING &&
              GET_TEACHER_QUESTIONS.name === 'success'
            "
            class="assesments-main"
          >
            <div
              class="question-remarks"
              v-if="GET_ASSESMENT_DETAILS.data.review_remark"
            >
              {{ GET_ASSESMENT_DETAILS.data.review_remark }}
            </div>

            <assesment-card
              v-for="(question, index) in GET_TEACHER_QUESTIONS.data"
              :key="question.id"
              :index="index"
              :question="question"
              :isIndexed="true"
              @editQuestion="handle_question_edit"
              @deleteQuestion="handle_question_delete"
              @view-details="handle_preview"
              :topicName="getTopicName(GET_TOPICS_LIST.data, question.topic_id)"
            ></assesment-card>
          </div>
        </template>

        <div
          v-if="
            !GET_IS_QUESTION_LOADING &&
            GET_TEACHER_QUESTIONS.name === 'error' &&
            !GET_TEACHER_QUESTIONS.data &&
            !$route.query.tour
          "
          class="empty-section"
        >
          <div class="placeholder-wrapper-render">
            <div class="img-placeholder-wrapper-render">
              <img class="is-empty-holder" :src="EmptyQuestion" alt="empty" />
            </div>
            <section class="section-secound-wrapper">
              <div class="no-question-found-label">No Questions Found</div>
              <p class="no-question-description">
                While we work to make questions available for all topics, you
                can create your own questions, to test your students.
              </p>
              <router-link :to="{ name: 'LMSCreate' }" class="btn btn-accent"
                >Create Question</router-link
              >
              <router-link
                :to="{ name: 'LMSSelect' }"
                class="select-btn btn btn-accent"
                >Select Question</router-link
              >
            </section>
          </div>
        </div>
      </div>
    </section>

    <div class="bottom-section w-100 brand_navy_bg index-1">
      <div class="container">
        <div class="row">
          <div class="col-12 d-flex justify-content-between align-items-center">
            <!-- LEFT -->
            <div
              class="left d-flex justify-content-start align-items-center"
              :class="$route.query.tour && 'invisible'"
            >
              <!-- DECLINE ICON -->
              <div
                @click="handle_draft_modal"
                class="avatar pointer"
                title="Save Assessment as Draft"
              >
                <span
                  @click="handle_draft_modal"
                  class="icon-decline border_grey font-20 flex-center"
                ></span>
              </div>

              <!-- SEPARATOR -->
              <div class="separator"></div>

              <!-- THRASH ICON -->
              <div
                class="avatar pointer"
                @click="handle_delete_modal"
                title="Delete Assessment"
              >
                <span
                  @click="handle_delete_modal"
                  class="icon-trash border_grey font-20 flex-center"
                ></span>
              </div>
            </div>

            <!-- RIGHT -->
            <div class="right position-relative">
              <template v-if="$route.query.tour">
                <button
                  @click="handle_publish"
                  class="btn btn-md btn-accent brand_navy"
                  title="Publish Assessment"
                >
                  <span>Publish</span>
                </button>
              </template>

              <template v-else>
                <button
                  :disabled="
                    GET_IS_QUESTION_LOADING ||
                    !GET_TEACHER_QUESTIONS.data ||
                    GET_IS_ASESSMENT_PUBLISHING
                  "
                  @click="handle_publish"
                  class="btn btn-md btn-accent brand_navy"
                  title="Publish Assessment"
                >
                  <span v-if="GET_IS_ASESSMENT_PUBLISHING">
                    <span
                      class="icon-dotted-roller font-17 mr-2 animate"
                    ></span>
                    Publishing...
                  </span>
                  <span v-else>Publish</span>
                </button>
              </template>

              <!-- TOUR DESCRIPTION -->
              <template v-if="show_tour">
                <div class="tour-description rounded-5 h-auto smooth-animation">
                  <!-- TOUR TEXT -->
                  <div class="tour-text black-text">
                    Satisfied with your questions? Let’s share the assessment
                    with your class.
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EXTERNAL_URL, API_VERSION_NEW, API_BASE_URL_NEW } from "@/env";
import { mapActions, mapGetters, mapMutations } from "vuex";
import AssesmentCard from "@/components/AssesmentCard.vue";
import AssesmentPublishModal from "../../components/AssesmentPublishedModal.vue";
import HeaderTop from "@/components/GlobalComps/HeaderTop.vue";
import SkelectonQuestionCard from "@/components/SkelectonQuestionCard.vue";
import AssesmentDeleteModal from "@/components/AssessmentDeleteModal.vue";
import DraftModal from "@/components/AssesmentDraft.vue";
import AssesmentDetailsModal from "@/components/AssesmentDetailsModal.vue";
import AssesmentPreviewModal from "@/components/PreviewQuestionPanelModal.vue";
import AssesmentEditModal from "@/components/AssesmentEditModal.vue";
import {
  FETCH_TEACHER_QUESTIONS,
  GET_IS_QUESTION_LOADING,
  GET_TEACHER_QUESTIONS,
  GET_IS_ASESSMENT_DELETING,
  GET_IS_ASESSMENT_PUBLISHING,
  ASSESMENT_PUBLISH_ACTION,
  ASSESMENT_DELETE_ACTION,
  GET_PUBLISHED_DATA,
  GET_DELETE_DATA,
  GET_ASSESMENT_DETAILS_ACTION,
  GET_IS_ASSESMENT_DETAILS_LOADING,
  GET_ASSESMENT_DETAILS,
  GET_IS_ASSESMENT_EDITING,
  EDIT_ASSESMENT_DETAILS_ACTION,
  GET_EDIT_ASSESMENT_DETAILS,
  SET_ASSESMENT_DETAILS,
} from "./store.module.AssesmentQuestions/constants";
import {
  removeLocalStorage,
  setLocalStorage,
  getLocalStorage,
} from "../../services/localStorageMgt";
import {
  REMOVE_QUESTIONS_FROM_HOMEWORK,
  GET_REMOVED_QUESTIONS_FROM_HOMEWORK,
} from "../QuestionSelect/store.module.QuestionSelect.Module/constant";
import { GET_TOPICS_LIST } from "../QuestionCreate/store.module.QuestionCreateModule/constants";
import { getShortReadableDate } from "../../services/dateMgt";
import { TOAST_ACTION } from "../../components/SideNotificationSnack/store.module/constants";
import {
  GET_TEACHER_CLASSES,
  GET_TEACHER_CLASSES_ACTION,
} from "../../store/module/general/constant";
import EmptyQuestion from "../../assets/static/empty_questions.svg";
import TOUR_QUESTIONS_DATA from "../QuestionSelect/questions";
import axios from "axios";

export default {
  name: "AssesmentQuestions",

  data() {
    return {
      is_questions_btn_active: false,
      getShortReadableDate,
      date: null,
      isDeleteModalOpen: false,
      isDraftModalOpen: false,
      isPublishedModal: false,
      isDetailsModalOpen: false,
      isPreviewModalOpen: false,
      previewId: 1,
      isAssesmentEditModalOpen: false,
      isUpdate: false,
      EmptyQuestion,
      environment: process.env.NODE_ENV,
      show_tour: false,

      selected_tour_questions: [],
    };
  },
  components: {
    AssesmentCard,
    AssesmentPublishModal,
    AssesmentPreviewModal,
    HeaderTop,
    SkelectonQuestionCard,
    AssesmentDeleteModal,
    DraftModal,
    AssesmentDetailsModal,
    AssesmentEditModal,
  },
  methods: {
    ...mapActions([
      FETCH_TEACHER_QUESTIONS,
      REMOVE_QUESTIONS_FROM_HOMEWORK,
      ASSESMENT_PUBLISH_ACTION,
      ASSESMENT_DELETE_ACTION,
      GET_ASSESMENT_DETAILS_ACTION,
      EDIT_ASSESMENT_DETAILS_ACTION,
      TOAST_ACTION,
      GET_TEACHER_CLASSES_ACTION,
    ]),
    ...mapMutations([SET_ASSESMENT_DETAILS]),

    getTopicName(topics, topic_id) {
      if (!Object.keys(this.GET_TOPICS_LIST).length) return "";
      let found_topic = topics.find(
        (topic) => (topic?.topic_id || topic?.id) === topic_id
      );
      return found_topic ? found_topic?.topic : "";
    },

    handle_click_away(e) {
      if (e.target.getAttribute("toggle-type") === "drop-toggle") {
        this.is_questions_btn_active = !this.is_questions_btn_active;
        return;
      }
      this.is_questions_btn_active = false;
    },
    async handle_question_edit(id) {
      this.$router.push({
        name: "LMSCreate",
        query: {
          action: "edit",
          id,
        },
      });
    },
    handle_assesment_edit_modal() {
      this.isDetailsModalOpen = false;
      this.isAssesmentEditModalOpen = true;
    },
    handle_draft_modal() {
      this.isDraftModalOpen = true;
    },
    handle_delete_modal() {
      this.isDeleteModalOpen = true;
    },
    handle_preview(event) {
      this.previewId = event;
      this.isPreviewModalOpen = true;
    },
    async handle_question_delete(id) {
      this.isPreviewModalOpen = false;
      if (!this[GET_TEACHER_QUESTIONS]?.data?.length) {
        return;
      }
      await this[REMOVE_QUESTIONS_FROM_HOMEWORK]({
        question_id: id,
        homework_id: this[GET_ASSESMENT_DETAILS]?.data?.id,
      });
    },

    async handle_publish() {
      if (this.$route?.query?.tour) {
        // UPDATE LOGGER
        let name = `SAVED_TOUR_${this.$route.params.id}`;
        let value = getLocalStorage("selectedTourQuestions");
        let type = this.getAuthType;

        let url = `${API_BASE_URL_NEW}/${API_VERSION_NEW}/logger/feature-user-logger?name=${name}&type=${type}&value=${value}`;
        let apiheaders = {
          headers: {
            Authorization: `Bearer ${getLocalStorage("gradelyAuthToken")}`,
          },
        };

        // PUBLISH ASSESSMENT TEMPORARILY
        localStorage.setItem("tourPosts", JSON.stringify([1]));
        await axios.put(url, {}, apiheaders);

        this.isPublishedModal = true;
      } else {
        await this[ASSESMENT_PUBLISH_ACTION](this.$route.params.id);
      }
    },

    handle_drafts() {
      let class_id = this[GET_ASSESMENT_DETAILS]?.data?.class_id ?? 0;
      let url = EXTERNAL_URL(`assessment/draft/${Number(class_id)}`);
      location.href =
        process.env.NODE_ENV === "development" ? url.dev : url.prod;
    },

    handle_return() {
      let tour = this.$route?.query?.tour ?? null;
      let class_tour_id = this.$route?.query?.class_tour_id ?? null;

      let tag = this[GET_ASSESMENT_DETAILS]?.data?.tag;

      let class_id = this[GET_ASSESMENT_DETAILS]?.data?.class_id ?? 0;
      let append_url =
        tag === "exam"
          ? `/assessment/in-review/${Number(class_id)}`
          : `/assessment/published/${Number(class_id)}`;

      let origin =
        process.env.NODE_ENV === "development"
          ? "http://localhost:8093"
          : window.location.origin;

      window.location = tour
        ? `${window.location.origin}/feed/${class_tour_id}?tour=7`
        : `${origin}${append_url}`;
    },

    handle_details_delete_event() {
      this.isDetailsModalOpen = false;
      this.isDeleteModalOpen = true;
    },

    async handle_delete() {
      await this[ASSESMENT_DELETE_ACTION](
        this[GET_ASSESMENT_DETAILS]?.data?.id
      );

      setTimeout(() => {
        let class_id = this[GET_ASSESMENT_DETAILS]?.data?.class_id ?? 0;
        let url = EXTERNAL_URL(`feed/${Number(class_id)}`);
        location.href =
          process.env.NODE_ENV === "development" ? url.dev : url.prod;
      }, 500);
    },

    async handle_assesment_details() {
      this.isDetailsModalOpen = true;
      this.isUpdate = true;
      // if (this[GET_ASSESMENT_DETAILS]) {
      //   return;
      // }
      await this[GET_ASSESMENT_DETAILS_ACTION](
        this[GET_ASSESMENT_DETAILS]?.data?.id
      );
    },

    async handle_assesment_edit(payload) {
      const homework_id = this[GET_ASSESMENT_DETAILS]?.data.id;
      const payloadItem = { data: { ...payload }, homework_id };
      await this[EDIT_ASSESMENT_DETAILS_ACTION](payloadItem);
    },

    loadSelectedTourQuestions() {
      this.selected_tour_questions = [];
      let selected = getLocalStorage("selectedTourQuestions");

      TOUR_QUESTIONS_DATA.map((question) => {
        if (selected.includes(question.id))
          this.selected_tour_questions.push(question);
      });
    },
  },

  computed: {
    ...mapGetters([
      GET_IS_QUESTION_LOADING,
      GET_TEACHER_QUESTIONS,
      GET_REMOVED_QUESTIONS_FROM_HOMEWORK,
      GET_IS_ASESSMENT_DELETING,
      GET_IS_ASESSMENT_PUBLISHING,
      GET_PUBLISHED_DATA,
      GET_DELETE_DATA,
      GET_IS_ASSESMENT_DETAILS_LOADING,
      GET_ASSESMENT_DETAILS,
      GET_IS_ASSESMENT_EDITING,
      GET_EDIT_ASSESMENT_DETAILS,
      GET_TEACHER_CLASSES,
      GET_TOPICS_LIST,
    ]),
  },
  mounted() {
    const homework_id = this.$route?.params?.id;

    if (!homework_id) {
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
    }

    window.addEventListener("click", this.handle_click_away);

    if (this.$route.query.tour) this.loadSelectedTourQuestions();
  },

  watch: {
    $route: {
      handler(value) {
        setTimeout(
          () => (this.show_tour = value.query.tour ? true : false),
          3200
        );
      },
      immediate: true,
    },

    GET_TEACHER_QUESTIONS() {
      if (
        (this[GET_TEACHER_QUESTIONS] &&
          this[GET_TEACHER_QUESTIONS]?.code === 200 &&
          this[GET_TEACHER_QUESTIONS]?.message === "Question found" &&
          this[GET_TEACHER_QUESTIONS]?.name === "success") ||
        (this[GET_TEACHER_QUESTIONS] &&
          this[GET_TEACHER_QUESTIONS]?.code === 406 &&
          this[GET_TEACHER_QUESTIONS]?.message === "Record not found" &&
          this[GET_TEACHER_QUESTIONS]?.name === "error")
      ) {
        if (this[GET_TEACHER_QUESTIONS]?.data) {
          setLocalStorage(
            "savedHomeWork",
            this[GET_TEACHER_QUESTIONS]?.data?.map((question) => question?.id)
          );
        } else {
          removeLocalStorage("savedHomeWork");
        }
        return;
      }
      removeLocalStorage("HOME_WORK");
      removeLocalStorage("savedHomeWork");
      this.$router.push({
        name: "CreateHomeWork",
      });
    },

    GET_REMOVED_QUESTIONS_FROM_HOMEWORK() {
      if (
        this[GET_REMOVED_QUESTIONS_FROM_HOMEWORK] &&
        this[GET_REMOVED_QUESTIONS_FROM_HOMEWORK]?.status === 200 &&
        this[GET_REMOVED_QUESTIONS_FROM_HOMEWORK]?.data?.code === 200 &&
        this[GET_REMOVED_QUESTIONS_FROM_HOMEWORK]?.data?.message ===
          "Question deleted"
      ) {
        this[FETCH_TEACHER_QUESTIONS](this[GET_ASSESMENT_DETAILS]?.data?.id);

        this[TOAST_ACTION]({
          toastData: {
            toastOpen: true,
            toastText: "Question deleted",
            toastState: "success",
            showBtn: false,
          },
          timeout: 3000,
        });
      } else {
        this[FETCH_TEACHER_QUESTIONS](this[GET_ASSESMENT_DETAILS]?.data?.id);

        this[TOAST_ACTION]({
          toastData: {
            toastOpen: true,
            toastText:
              this[GET_REMOVED_QUESTIONS_FROM_HOMEWORK]?.data?.message ||
              "please we encountered an error",
            toastState: "error",
            showBtn: false,
          },
          timeout: 3000,
        });
      }
    },

    GET_PUBLISHED_DATA() {
      if (
        this[GET_PUBLISHED_DATA]?.code === 200 &&
        this[GET_PUBLISHED_DATA]?.name === "success" &&
        (this[GET_PUBLISHED_DATA]?.message ===
          "Homework successfully published" ||
        this[GET_PUBLISHED_DATA]?.message === "Homework already published"
          ? true
          : false)
      ) {
        removeLocalStorage("savedHomeWork");
        this.isPublishedModal = true;
        return;
      }
    },

    GET_DELETE_DATA() {
      removeLocalStorage("HOME_WORK");
      removeLocalStorage("savedHomeWork");
      if (
        this[GET_DELETE_DATA] &&
        this[GET_DELETE_DATA]?.code === 200 &&
        this[GET_DELETE_DATA]?.message === "Homework record deleted" &&
        this[GET_DELETE_DATA]?.name === "success"
      ) {
        this[TOAST_ACTION]({
          toastData: {
            toastOpen: true,
            toastText:
              this[GET_DELETE_DATA]?.message ||
              "please we encountered an error",
            toastState: "success",
            showBtn: false,
          },
          timeout: 2000,
          callback: () => {
            this.isDeleteModalOpen = false;
            window.location = `${window.location.origin}/`;
          },
        });
      } else {
        this[TOAST_ACTION]({
          toastData: {
            toastOpen: true,
            toastText:
              this[GET_DELETE_DATA]?.message ||
              "please we encountered an error",
            toastState: "error",
            showBtn: false,
          },
          timeout: 2000,
          callback: () => {
            this.isDeleteModalOpen = false;
            window.location = `${window.location.origin}/`;
          },
        });
      }
    },

    GET_ASSESMENT_DETAILS(updated, old) {
      if (
        this[GET_ASSESMENT_DETAILS] &&
        this[GET_ASSESMENT_DETAILS]?.code === 200 &&
        this[GET_ASSESMENT_DETAILS]?.data &&
        this[GET_ASSESMENT_DETAILS]?.message === "Homework record found" &&
        this[GET_ASSESMENT_DETAILS]?.name === "success"
      ) {
        if (this.isDetailsModalOpen && !this.isUpdate) {
          return;
        }
        if (this.isUpdate) {
          this.isUpdate = false;
          if (this.isDetailsModalOpen) {
            this[SET_ASSESMENT_DETAILS]({
              ...updated,
              data: {
                ...updated?.data,
                class: {
                  ...this[GET_ASSESMENT_DETAILS]?.data?.class,
                  global_class_id: old?.data?.class?.global_class_id,
                },
              },
            });
          }
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
        let data = this[GET_ASSESMENT_DETAILS]?.data;
        data = {
          ...data,
          global_class_id: this[GET_TEACHER_CLASSES]?.data[0]?.global_class_id,
        };
        this.isUpdate = true;
        this[SET_ASSESMENT_DETAILS]({ ...this[GET_ASSESMENT_DETAILS], data });
      } else {
        this.$router.push({
          name: "CreateHomeWork",
        });
        return;
      }
    },

    GET_EDIT_ASSESMENT_DETAILS() {
      if (
        this[GET_EDIT_ASSESMENT_DETAILS] &&
        this[GET_EDIT_ASSESMENT_DETAILS]?.code === 200 &&
        this[GET_EDIT_ASSESMENT_DETAILS]?.name === "success" &&
        this[GET_EDIT_ASSESMENT_DETAILS]?.message ===
          "Homework record updated successfully" &&
        this[GET_EDIT_ASSESMENT_DETAILS]?.data
      ) {
        this.isUpdate = true;
        this[SET_ASSESMENT_DETAILS]({
          ...this[GET_ASSESMENT_DETAILS],
          data: {
            ...this[GET_ASSESMENT_DETAILS]?.data,
            title: this[GET_EDIT_ASSESMENT_DETAILS]?.data?.title,
            tag: this[GET_EDIT_ASSESMENT_DETAILS]?.data?.tag,
            questionCount:
              this[GET_EDIT_ASSESMENT_DETAILS]?.data?.questionCount,
          },
        });
        this[TOAST_ACTION]({
          toastData: {
            toastOpen: true,
            toastText:
              this[GET_EDIT_ASSESMENT_DETAILS]?.message ||
              "please we encountered an error",
            toastState: "success",
            showBtn: false,
          },
          timeout: 1000,
          callback: () => (this.isAssesmentEditModalOpen = false),
        });
      }
    },

    isPublishedModal() {
      this.isDetailsModalOpen = false;
    },

    isPreviewModalOpen() {
      if (!this.isPreviewModalOpen) {
        this.previewId = 1;
      }
    },
  },
  updated() {
    window?.MathJax?.typeset();
  },
  beforeDestroy() {
    window.removeEventListener("click", this.handle_click_away);
  },
};
</script>

<style lang="scss" scoped>
.question-manage-section {
  margin-bottom: 5rem;
}

.assesment-question-header-wrapper {
  @include flex-row-between-nowrap;
  max-width: 100rem;
  margin: 0 auto;
  padding: 0.56rem 1rem;

  @include breakpoint-down(sm) {
    padding: 6px 10px;
  }

  .icon-alert-circle:before {
    color: $brand-black;
    font-size: 1.4rem;
  }

  .right-inner-txt {
    color: $brand-black;
    font-size: 1.1rem;
    padding-left: 0.7rem;

    // @include breakpoint-down(sm) {
    //   font-size: 15px;
    //   padding-left: 0;
    // }
  }

  .assesment-question-inner-wrapper {
    @include flex-row-start-nowrap;

    .assesment-course-wrapper-txt {
      .assesment-course-title {
        font-style: normal;
        font-weight: 800;
        line-height: 22px;
        display: flex;
        align-items: center;
        color: $brand-black;

        @include breakpoint-down(sm) {
          font-size: 14.5px;
        }
      }
      .assesment-course-meta-title {
        @include flex-row-start-nowrap;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
        color: $color-grey-dark;

        @include breakpoint-down(sm) {
          font-size: 11px;
        }
      }
    }
    .icon-library {
      @include flex-row-center-nowrap;
      color: #113255;
      background: #dbf5f8;
      border-radius: 5px;
      margin: 0.76rem;

      @include breakpoint-down(sm) {
        margin-left: 0;
        margin-right: 10px;
      }
    }
    .icon-library:before {
      font-size: 1.4rem;

      @include breakpoint-down(sm) {
        font-size: 1.25rem;
      }
    }
  }
}

.right-inner-txt {
  @include breakpoint-down(md) {
    display: none;
  }
}

.assesment-question-wrapper {
  max-width: 70rem;
  margin: 0 auto;
  padding: 0.56123rem;

  .sub-meta-inner-header-wrapper {
    @include flex-row-between-nowrap;
    border-bottom: 1px solid $border-grey;
    padding-bottom: 0.74rem;
    margin: 3rem 0px;

    @include breakpoint-down(sm) {
      padding-bottom: 1rem;
      margin: 1.5rem 0px;
    }

    .question-left-title {
      @include flex-row-start-wrap;
      .questions-txt {
        margin-left: 0.24rem;
        @include breakpoint-down(sm) {
          display: none;
        }
      }
      .question-left-title-txt {
        font-style: normal;
        font-weight: bold;
        font-size: 1.3125rem;
        line-height: 29px;
        display: flex;
        align-items: center;
        color: $color-text;
        @include breakpoint-down(sm) {
          font-size: 1rem;
        }
      }
      .question-left-title-number {
        padding-left: 0.34rem;
      }
    }

    .btn-right:hover {
      background: $brand-accent-light;
      border: 1px solid $brand-accent;
      @include transition(0.3s);
    }

    .btn-right {
      position: relative;
      @include flex-row-center-nowrap;
      background: $brand-inverse-light;
      border: 1px solid $brand-inverse;
      box-sizing: border-box;
      font-weight: bold;
      font-size: 0.85rem;
      line-height: 1rem;
      text-transform: uppercase;
      color: $color-text;

      @include breakpoint-down(sm) {
        padding: 0.5rem;
        @include square-shape(36);
      }

      .close-option-select-wrapper {
        display: none;
      }
      .option-select-wrapper {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        top: toRem(59);
        right: 0px;
        z-index: 999;
        background: #fff;
        padding-left: 0px;
        padding: 0.78rem;
        list-style: none;
        overflow: hidden;
        border-radius: toRem(5);

        @include breakpoint-down(sm) {
          top: toRem(40);
        }

        .create-question-item {
          padding: 1rem;

          @include breakpoint-down(sm) {
            font-size: 11.5px;
            padding: 9px 10px;
          }
        }
      }
      .icon-plus:before {
        font-size: 1.4rem;
      }
    }
  }
}
.question-details-btn {
  margin-left: 5px;
  font-size: 14px;
  color: #353535 !important;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  font-weight: 600;
}

.bottom-section {
  padding: 10px 0px;
  position: fixed;
  bottom: 0px;
  background-color: #113255 !important;

  @include breakpoint-down(md) {
    padding: 12px 4px;
  }

  @include breakpoint-down(sm) {
    padding: 12px 2px;
  }

  .left {
    span {
      font-size: 20px !important;
      @include breakpoint-down(md) {
        font-size: 18px !important;
      }

      @include breakpoint-down(xs) {
        font-size: 17px !important;
      }

      &:hover {
        color: lighten($brand_red, 8%) !important;
      }
    }
    .avatar.pointer {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .separator {
      width: 0.8px;
      height: 40px;
      background: $border_grey;
      margin: 0px 15px;

      @include breakpoint-down(md) {
        height: 24px;
        margin: 0px 10px;
      }

      @include breakpoint-down(xs) {
        height: 20px;
        margin: 0px 8px;
      }
    }
  }
  .right {
    .btn {
      @include breakpoint-down(md) {
        padding: 9px 22px !important;
        font-size: 11px;
      }
    }

    .tour-description {
      position: absolute;
      box-shadow: toRem(7) 0 toRem(25) rgba($black-text, 0.15);
      padding: toRem(18) toRem(15) toRem(16);
      width: toRem(248);
      top: toRem(-95);
      left: toRem(-120);
      background: lighten($brand-inverse, 1%);

      @include breakpoint-down(sm) {
        padding: toRem(12);
        left: toRem(-95);
        width: toRem(200);
      }

      &::after {
        content: "";
        position: absolute;
        top: 88%;
        left: 75%;
        transform: rotate(45deg);
        @include square-shape(17);
        background: lighten($brand-inverse, 1%);

        @include breakpoint-down(sm) {
          @include square-shape(15);
        }
      }

      .tour-text {
        @include font-height(12.25, 19);
        margin-bottom: toRem(15);

        @include breakpoint-down(sm) {
          @include font-height(11.75, 19);
          margin-bottom: toRem(5);
        }

        @include breakpoint-down(xs) {
          @include font-height(11.85, 19.5);
        }
      }
    }
  }
}
.placeholder-wrapper-render {
  @include flex-column-center;
  text-align: center;
  max-width: 30rem;
  margin: 10vh auto;
  @include breakpoint-down(xs) {
    @include flex-column-center;
    text-align: center;
    max-width: 30rem;
    margin: 8vh auto;
  }
  .select-btn {
    margin-top: 2rem;
  }
  .img-placeholder-wrapper-render {
    max-width: 101px;
    margin: 0.5rem auto;
    @include breakpoint-down(xs) {
      max-width: 85px;
      margin: 0.5rem auto;
    }
    .is-empty-holder {
      max-width: inherit;
      margin: inherit;
    }
  }

  .section-secound-wrapper {
    @include flex-column-center;
  }
  .no-question-found-label {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 160%;
    align-items: center;
    color: #353535;
  }
}
.no-question-description {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 160%;
  width: inherit;
  margin: 1rem 0px;
  @include breakpoint-down(lg) {
    font-style: normal;
    font-weight: normal;
    font-size: 0.8rem;
    line-height: 160%;
    width: inherit;
    margin: 1rem 0px;
  }
}
.question-remarks {
  color: #353535;
  background: #fceacf;
  border-radius: 0.5rem;
  padding: 10px 15px;
  border: 1.2px solid $brand-accent;
}
</style>
