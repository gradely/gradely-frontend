<template>
  <div class="main-layout-container">
    <header-top customClass="no-index">
      <template v-slot:inner-main-body>
        <div
          class="
            wrapper-main-float
            fixed-top
            w-100
            white-text-bg
            box-shadow-effect
          "
        >
          <div class="wrapper">
            <div class="header-text brand-navy font-weight-700">
              Add Questions
            </div>

            <div class="avatar close-icon pointer" @click="handle_router">
              <div class="icon-close"></div>
            </div>
          </div>
        </div>
      </template>
    </header-top>

    <!-- modal here -->
    <!--  -->

    <div class="question-select-wrapper">
      <div
        v-on-clickaway="closeSideBar"
        :class="[
          is_active_nav
            ? `wrapper-left-main-question`
            : `close-wrapper-left-main-question`,
        ]"
      >
        <div class="close-wrapper" v-if="false">
          <div class="icon icon-close"></div>
        </div>

        <aside class="sidebar-navigatation">
          <div class="browser-question-main">
            <span :class="$route.query.tour && 'mgb-20'"
              >Browse questions by topic</span
            >
            <span v-if="false">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.5">
                  <path
                    d="M12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18Z"
                    fill="#DBF5F8"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.3561 8.56034C11.8705 8.58165 11.6116 8.77702 11.5219 8.96747C11.2867 9.46718 10.691 9.68161 10.1913 9.44643C9.69158 9.21124 9.47715 8.61549 9.71233 8.11579C10.2345 7.00629 11.3595 6.60216 12.2684 6.56226C13.1427 6.52389 14.2308 6.80238 14.8327 7.58734C15.2959 8.19139 15.5562 8.9571 15.4511 9.7622C15.3445 10.5786 14.8789 11.3108 14.1233 11.8667C13.1144 12.6089 13.1162 12.9876 13.1165 13.0428C13.1165 13.0436 13.1165 13.0443 13.1165 13.045C13.1165 13.5973 12.6688 14.045 12.1165 14.045C11.5642 14.045 11.1165 13.5973 11.1165 13.045C11.1165 12.0883 11.6729 11.1864 12.9382 10.2557C13.3271 9.96956 13.4428 9.69582 13.4679 9.50333C13.4945 9.29957 13.4368 9.0536 13.2457 8.8044C13.2322 8.78687 13.1592 8.71393 12.9763 8.6482C12.8017 8.58545 12.5821 8.55042 12.3561 8.56034Z"
                    fill="#DBF5F8"
                  />
                  <path
                    d="M12 23C5.9 23 1 18.1 1 12C1 5.9 5.9 1 12 1C18.1 1 23 5.9 23 12C23 18.1 18.1 23 12 23ZM12 3C7 3 3 7 3 12C3 17 7 21 12 21C17 21 21 17 21 12C21 7 17 3 12 3Z"
                    fill="#DBF5F8"
                  />
                </g>
              </svg>
            </span>
          </div>

          <div class="search-wrapper" v-if="!$route.query.tour">
            <input
              type="text"
              placeholder="Search topic name"
              v-model="topic_search"
            />
            <div class="icon icon-search gfont-20 color-grey-dark"></div>
            <div class="loader-line" v-if="topic_hunt"></div>
          </div>

          <section class="topic-search-wrapper" v-if="topic_search">
            <template v-if="topic_prize.length">
              <div
                v-for="(topic, index) in getTopicPrize"
                :key="index"
                class="topic-card pointer mgb-12"
                :class="[active_index == index && 'active-topic-card']"
                @click="handleTopicSelection(topic, index)"
              >
                <div>
                  <div
                    class="gfont-14 font-weight-400 topic-title text-capitalize"
                    :class="[active_index == index && 'active-title']"
                  >
                    {{ topic.topic }}
                  </div>
                  <div
                    class="d-flex align-items-center mgt-1 topic-subtitle"
                    :class="[active_index == index && 'active-subtitle']"
                  >
                    <div class="gfont-12 text-capitalize">
                      {{ topic.term }} Term
                    </div>
                    <div class="mgr-5 mgl-5 gfont-13 mgb-3" v-if="false">●</div>
                    <div class="gfont-12" v-if="false">JSS 1</div>
                  </div>
                </div>
                <div
                  class="icon icon-caret-right gfont-13 black-text"
                  v-if="active_index == index"
                ></div>
              </div>
            </template>

            <div
              class="
                d-flex
                mgt-25
                mgb-20
                color-white
                align-items-center
                pointer
                moore
              "
              v-if="topic_prize.length > 4"
              @click="show_all_topics = !show_all_topics"
            >
              <div class="yellow-bar"></div>
              <div class="gfont-14 font-weight-600">
                Show {{ moreOrLess }} results
              </div>
            </div>

            <template v-if="!topic_prize.length && !topic_hunt">
              <div class="not-found-title mgt-25 gfont-14">
                Can’t find any matching topic by the name
              </div>
              <div class="white-text font-weight-600 mgb-25 mgt-8">
                “{{ topic_search }}”
              </div>
              <button
                class="btn create-button"
                :disabled="creating_topic"
                @click="addNewTopic"
              >
                {{ creating_topic ? "Creating..." : "Create Topic" }}
              </button>
            </template>
          </section>

          <section v-else>
            <section
              v-if="GET_CLASS_TOPICS && !GET_CLASS_TOPICS_LOADER"
              class="wrapper-question-sec"
            >
              <div class="section-toogle-select-class" v-if="false">
                <CustomSelectWithLabel
                  :selectOptions="get_general_global_classes"
                  customClass="select-classes"
                  @change="handle_class_id_change"
                  :value="
                    active_id
                      ? active_id
                      : GET_ASSESMENT_DETAILS.data.class.global_class_id
                  "
                />
              </div>

              <!-- TOUR TOPICS -->
              <template v-if="$route.query.tour">
                <div
                  v-for="(item, index) in TOUR_TOPICS"
                  :key="index"
                  class="container-navbar-item"
                >
                  <SidebarDrawerList
                    :is_active_list_item="true"
                    :items="item"
                    @topic_list="handleEventTopicList($event, index)"
                    :parent_list_index="index"
                    :fetch_class_question="FETCH_CLASS_QUESTIONS"
                    :week="week"
                    :isOpen="true"
                    :active_id="active_id"
                  />
                </div>
              </template>

              <template v-else>
                <div
                  v-for="(item, index) in GET_CLASS_TOPICS.data"
                  :key="index"
                  class="container-navbar-item"
                >
                  <SidebarDrawerList
                    :is_active_list_item="
                      active_list_item === index ? true : false
                    "
                    :items="item"
                    @topic_list="handleEventTopicList($event, index)"
                    :parent_list_index="index"
                    :fetch_class_question="FETCH_CLASS_QUESTIONS"
                    :week="week"
                    :isOpen="active_list_item === index ? true : false"
                    :active_id="active_id"
                  />
                </div>
              </template>

              <!-- <div class="showmore-label-title active">Show more Terms</div> -->
            </section>
            <SidebarSelectQuestionSkelectonLoader v-else />
          </section>
        </aside>
      </div>

      <main
        :class="[
          is_active_nav
            ? `wrapper-right-main-question`
            : `close-wrapper-right-main-question`,
        ]"
      >
        <div class="inner-wrapper-question">
          <div class="left-title-inner-main">
            <section>
              <button
                @click.stop="is_active_nav = !is_active_nav"
                class="hamburger-wrapper"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.5 10.0002C12.5 9.53993 12.1269 9.16683 11.6667 9.16683L3.33333 9.16683C2.8731 9.16683 2.5 9.53992 2.5 10.0002C2.5 10.4604 2.8731 10.8335 3.33333 10.8335L11.6667 10.8335C12.1269 10.8335 12.5 10.4604 12.5 10.0002Z"
                    fill="#555555"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.5 5.00016C17.5 4.53992 17.1269 4.16683 16.6667 4.16683L3.33333 4.16683C2.8731 4.16683 2.5 4.53992 2.5 5.00016C2.5 5.4604 2.8731 5.8335 3.33333 5.8335L16.6667 5.8335C17.1269 5.8335 17.5 5.4604 17.5 5.00016Z"
                    fill="#555555"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.5 15.0002C7.5 14.5399 7.1269 14.1668 6.66667 14.1668L3.33333 14.1668C2.8731 14.1668 2.5 14.5399 2.5 15.0002C2.5 15.4604 2.8731 15.8335 3.33333 15.8335L6.66667 15.8335C7.1269 15.8335 7.5 15.4604 7.5 15.0002Z"
                    fill="#555555"
                  />
                </svg>
                <span class="hamburger-text-mobile">Change&nbsp;Topic</span>
              </button>
              <span
                v-if="GET_CLASS_QUESTIONS_LOADER"
                class="title-label-left loader"
                >Basic Operations Of integers</span
              >
              <template v-else>
                <span class="title-label-left" v-if="$route.query.tour"
                  >Pronouns</span
                >
                <template v-else>
                  <span
                    v-if="!GET_CLASS_QUESTIONS_LOADER || !topic_title_text"
                    class="title-label-left"
                    >{{ topic_title_text }}</span
                  >
                </template>
              </template>
            </section>

            <router-link
              v-if="!$route.query.tour"
              :to="{ name: 'LMSCreate' }"
              class="avatar icon-main-cir"
              tag="button"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 4C12.5523 4 13 4.44772 13 5V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V5C11 4.44772 11.4477 4 12 4Z"
                  fill="#353535"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z"
                  fill="#353535"
                />
              </svg>
            </router-link>
          </div>

          <!-- TOUR QUESTIONS -->
          <template v-if="$route.query.tour">
            <question-card
              @check="handleSaveDelete"
              @question-delete="handleDelete"
              @question-edit="handleEdit"
              @question-report="handleReport"
              v-for="(item, index) in TOUR_QUESTIONS"
              :index="index"
              :question_count="selected_questions_total"
              :key="item.id"
              :question="item"
              :savedHomeWork="JSON.parse(getLocalStorage('savedHomeWork'))"
            ></question-card>
          </template>

          <template v-else>
            <!-- when there is no question to display empty question(topic) -->
            <div
              v-if="
                (!GET_CLASS_QUESTIONS && !questions_loading) ||
                (GET_CLASS_QUESTIONS &&
                  GET_CLASS_QUESTIONS.code === 406 &&
                  !GET_CLASS_QUESTIONS.data &&
                  !questions.length &&
                  !questions_loading)
              "
              class="placeholder-wrapper-render"
            >
              <div class="img-placeholder-wrapper-render">
                <img class="is-empty-holder" :src="EmptyQuestion" alt="empty" />
              </div>

              <section class="section-secound-wrapper">
                <div class="no-question-found-label">No Questions Found</div>
                <p class="no-question-description">
                  While we work to make questions available for all topics, you
                  can create your own questions, to test your students.
                </p>

                <template v-if="!$route.query.tour">
                  <button
                    @click="
                      $router.push({
                        name: 'LMSCreate',
                      })
                    "
                    class="btn btn-accent"
                  >
                    Create Questions
                  </button>
                </template>
              </section>
            </div>
            <!-- ends here with place-holder -->

            <div
              class="question-card-list"
              v-else-if="GET_CLASS_QUESTIONS_LOADER"
            >
              <QuestionCardSkelectonLoader
                v-for="item in [1, 2, 3, 4]"
                :key="item"
              />
            </div>

            <div
              class="question-card-list"
              v-else-if="GET_CLASS_QUESTIONS && GET_CLASS_QUESTIONS.data"
            >
              <question-card
                @check="handleSaveDelete"
                @question-delete="handleDelete"
                @question-edit="handleEdit"
                @question-report="handleReport"
                v-for="(item, index) in questions"
                :index="index"
                :question_count="selected_questions_total"
                :key="item.id"
                :question="item"
                :savedHomeWork="JSON.parse(getLocalStorage('savedHomeWork'))"
              ></question-card>

              <div
                v-if="page <= page_size || is_infinite"
                v-observe-visibility="getNextQuestions"
                class="infinite-loader"
              >
                <span class="icon-dotted-roller font-17 mr-2 animate"></span>
              </div>
            </div>
          </template>
        </div>
      </main>

      <question-feedback-modal
        @feedback="handle_feedback"
        v-if="is_qfeed_modal_open"
        @closeTriggered="is_qfeed_modal_open = !is_qfeed_modal_open"
        :report_id="report_id"
        :loading="GET_IS_REPORTING"
      ></question-feedback-modal>

      <assesment-delete-modal
        titleHead="DELETE QUESTION"
        titleDescription="You are about to delete this question"
        v-if="is_delete_modal_open"
        @closeTriggered="is_delete_modal_open = !is_delete_modal_open"
        @delete="deleteQuestion"
        :disabled="GET_IS_OWN_QUESTION_DELETING"
      ></assesment-delete-modal>
    </div>

    <!-- fixed footer at bottom -->
    <footer class="dashboard-root-footer">
      <template v-if="$route.query.tour">
        <div class="right-footer">
          <div>{{ selected_questions_total }}</div>
          <div>Selected</div>
        </div>
      </template>

      <template v-else>
        <div
          v-if="GET_CLASS_QUESTIONS && GET_CLASS_QUESTIONS.data"
          class="right-footer"
        >
          <div>{{ selected_questions_total }}</div>
          <div>Selected</div>
        </div>

        <div v-else-if="GET_CLASS_QUESTIONS_LOADER" class="right-footer">
          <div class="selected-question-number">0</div>
          <div class="selected-is-selected">Selected</div>
        </div>
      </template>

      <div class="left-footer">
        <button
          :disabled="
            GET_BUTTON_LOADER ||
            selected_questions_total < getTotalValidQuestion ||
            GET_CLASS_QUESTIONS_LOADER ||
            disabled
          "
          @click="handleAddQuestion"
          class="btn btn-accent position-relative"
        >
          <span class="button-inner">
            <span
              class="icon-dotted-roller icon spinner animate"
              v-show="GET_BUTTON_LOADER"
            ></span>
            <span class="text">
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
            </span>
          </span>
        </button>

        <!-- TOUR DESCRIPTION -->
        <template v-if="show_tour">
          <div class="tour-description rounded-5 h-auto smooth-animation">
            <!-- TOUR TEXT -->
            <div class="tour-text black-text">
              Nice selections, let's preview your selected questions.
            </div>
          </div>
        </template>
      </div>
    </footer>
    <!-- fixed footer stoppeed here -->
  </div>
</template>

<script>
import { EXTERNAL_URL } from "@/env";
import { mapGetters, mapActions, mapMutations } from "vuex";
import {
  FETCH_CLASS_TOPICS,
  SET_CLASS_TOPICS,
  GET_CLASS_TOPICS,
  FETCH_CLASS_QUESTIONS,
  SET_CLASS_QUESTIONS,
  GET_CLASS_QUESTIONS,
  GET_CLASS_TOPICS_LOADER,
  GET_CLASS_QUESTIONS_LOADER,
  ADD_QUESTIONS_TO_HOMEWORK,
  GET_BUTTON_LOADER,
  SET_CLASS_QUESTIONS_LOADER,
  GET_ADD_QUESTIONS_TO_HOMEWORK,
  SET_GENERAL_GLOBAL_CLASSES,
  GET_GENERAL_GLOBAL_CLASSES,
  REMOVE_QUESTIONS_FROM_HOMEWORK,
  DELETE_OWN_QUESTION,
  GET_DELETE_OWN_QUESTION_DATA,
  GET_IS_OWN_QUESTION_DELETING,
} from "./store.module.QuestionSelect.Module/constant";

import { CREATE_TOPIC } from "../../pages/QuestionCreate/store.module.QuestionCreateModule/constants";

import SidebarSelectQuestionSkelectonLoader from "./QuestionSelectSidebarSkelectonLoader.vue";
import HeaderTop from "@/components/GlobalComps/HeaderTop";
import EmptyQuestion from "../../assets/static/empty_questions.svg";
import QuestionCard from "@/components/QuestionCard";
import QuestionFeedbackModal from "@/components/QuestionFeedbackModal.vue";
import AssesmentDeleteModal from "@/components/AssessmentDeleteModal.vue";
import SidebarDrawerList from "../../components/SidebarDrawerList.vue";
import CustomSelectWithLabel from "../../components/CustomLabelSelect/CustomLabelSelect.vue";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "../../services/localStorageMgt";
import QuestionCardSkelectonLoader from "./QuestionCardSkelecton.vue";
import { getTruncatedText } from "../../services/stringMgt";
import { TOAST_ACTION } from "../../components/SideNotificationSnack/store.module/constants";
import {
  GET_ASSESMENT_DETAILS_ACTION,
  GET_ASSESMENT_DETAILS,
  SET_ASSESMENT_DETAILS,
} from "../AssesmentQuestions/store.module.AssesmentQuestions/constants";
import {
  GET_TEACHER_CLASSES_ACTION,
  GET_TEACHER_CLASSES,
  GET_IS_REPORTING,
  REPORT_ACTION,
  GET_REPORT_DETAILS,
} from "../../store/module/general/constant";

import { mixin as clickaway } from "vue-clickaway";
import { encodeString } from "@/services/stringMgt";
import TOUR_TOPICS_DATA from "./topics";
import TOUR_QUESTIONS_DATA from "./questions";

export default {
  name: "QuestionSelect",

  mixins: [clickaway],

  data() {
    return {
      EmptyQuestion,
      getLocalStorage,
      disable_all: false,
      active_list_item: 0,
      current_tab: 0,
      is_modal_open: false,
      get_general_global_classes: [],
      is_qfeed_modal_open: false,
      is_delete_modal_open: false,
      is_active_nav: false,
      selected_questions_total: 0,
      topic_title_text: "",
      disabled: false,
      isUpdate: false,
      innerWidth: window.innerWidth,
      report_id: "",
      page: 1,
      week: null,
      delete_id: null,
      is_lazy: false,
      questions: [],
      page_size: null,
      is_infinite: true,
      question_section: null,
      questions_loading: true,
      active_id: null,
      active_index: -1,
      topic_search: "",
      topic_hunt: false,
      topic_prize: [],
      show_all_topics: false,
      creating_topic: false,

      show_tour: false,
      TOUR_TOPICS: TOUR_TOPICS_DATA,
      TOUR_QUESTIONS: TOUR_QUESTIONS_DATA,
    };
  },
  components: {
    HeaderTop,
    QuestionCard,
    QuestionFeedbackModal,
    AssesmentDeleteModal,
    CustomSelectWithLabel,
    SidebarDrawerList,
    SidebarSelectQuestionSkelectonLoader,
    QuestionCardSkelectonLoader,
  },

  metaInfo: {
    title: "Question Library",
  },

  computed: {
    ...mapGetters([
      GET_CLASS_TOPICS,
      GET_CLASS_QUESTIONS,
      GET_CLASS_QUESTIONS_LOADER,
      GET_CLASS_TOPICS_LOADER,
      GET_BUTTON_LOADER,
      GET_ADD_QUESTIONS_TO_HOMEWORK,
      GET_GENERAL_GLOBAL_CLASSES,
      GET_ASSESMENT_DETAILS,
      GET_TEACHER_CLASSES,
      GET_IS_REPORTING,
      GET_REPORT_DETAILS,
      GET_IS_OWN_QUESTION_DELETING,
      GET_DELETE_OWN_QUESTION_DATA,
    ]),

    getTopicPrize() {
      return this.show_all_topics
        ? this.topic_prize
        : this.topic_prize.slice(0, 4);
    },

    moreOrLess() {
      return this.show_all_topics ? "less" : "more";
    },

    getNewTopicPayload() {
      return {
        topic: this.topic_search,
        subject_id: this.GET_ASSESMENT_DETAILS.data.subject.id,
        class_id: this.GET_ASSESMENT_DETAILS.data.class_id,
        term: this.getAuthUser?.term || "first",
      };
    },

    getAuthUser() {
      return JSON.parse(localStorage.getItem("authUser"));
    },

    computedTopicName() {
      if (!this[GET_CLASS_TOPICS]?.data?.length) {
        return "";
      }
      let weekNumber = Number(this.week);
      if (
        weekNumber >
        this[GET_CLASS_TOPICS]?.data[this.active_list_item]?.topics?.length
      ) {
        weekNumber =
          this[GET_CLASS_TOPICS]?.data[this.active_list_item]?.topics?.length;
      }

      return this[GET_CLASS_TOPICS]?.data[this.active_list_item]?.topics[
        Number(weekNumber - 1)
      ]?.topic;
    },

    getTotalValidQuestion() {
      return this.$route?.query?.tour ? 5 : 1;
    },
  },

  methods: {
    ...mapActions([
      FETCH_CLASS_TOPICS,
      FETCH_CLASS_QUESTIONS,
      ADD_QUESTIONS_TO_HOMEWORK,
      TOAST_ACTION,
      GET_ASSESMENT_DETAILS_ACTION,
      GET_TEACHER_CLASSES_ACTION,
      REPORT_ACTION,
      DELETE_OWN_QUESTION,
      CREATE_TOPIC,
      "searchTopics",
    ]),
    ...mapMutations([
      SET_CLASS_TOPICS,
      SET_CLASS_QUESTIONS_LOADER,
      SET_CLASS_QUESTIONS,
      SET_GENERAL_GLOBAL_CLASSES,
      SET_ASSESMENT_DETAILS,
      REMOVE_QUESTIONS_FROM_HOMEWORK,
      SET_CLASS_QUESTIONS,
    ]),

    getTruncatedText,

    async searchForTopic(topic) {
      try {
        if (!topic) {
          this.topic_prize = [];
          this.active_index = -1;
          this.show_all_topics = false;
          this.topic_hunt = false;
          return;
        }
        this.show_all_topics = false;
        this.topic_hunt = true;
        let response = await this.searchTopics({
          subject_id: this[GET_ASSESMENT_DETAILS]?.data?.subject?.id,
          ...this[GET_ASSESMENT_DETAILS]?.data?.class,
          topic,
        });

        this.topic_prize =
          response?.data?.code === 200 ? response?.data?.data : [];
        this.topic_hunt = false;
      } catch (err) {
        this.topic_hunt = false;
        console.log("error getting topics>>>", err);
      }
    },

    sendToast(message, state) {
      this[TOAST_ACTION]({
        toastData: {
          toastOpen: true,
          toastText: message,
          toastState: state,
          showBtn: true,
        },
        timeout: 3500,
      });
    },

    addNewTopic() {
      this.creating_topic = true;
      this.CREATE_TOPIC(this.getNewTopicPayload)
        .then((response) => {
          this.creating_topic = false;
          if (response?.code == 200) {
            this.searchForTopic(this.topic_search);
            setTimeout(() => {
              this.sendToast(
                `${this.topic_search} created and added to topic list`,
                "success"
              );
            }, 500);
          } else {
            this.sendToast(`Topic creation failed`, "error");
          }
        })
        .catch((err) => {
          this.creating_topic = false;
          console.log("error trying to create new topic", err);
          this.sendToast(`Topic creation failed`, "error");
        });
    },

    handle_router() {
      if (this.$route.query.tour) {
        let origin =
          process.env.NODE_ENV === "development"
            ? "http://localhost:8093"
            : window.location.origin;

        window.location = `${origin}/feed/${
          this.$route.query.class_tour_id
        }?tour=${encodeString(4)}`;
      } else if (this.disable_all) {
        let url = EXTERNAL_URL(`assessment/published/0`);
        location.href = this.environment === "development" ? url.dev : url.prod;
      } else this.$router.push({ name: "LMSQuestion" });
    },

    async deleteQuestion() {
      await this[DELETE_OWN_QUESTION](this.delete_id);
    },

    getNextQuestions(isVisible, _) {
      if (
        !isVisible ||
        this.is_infinite ||
        this.page > this.page_size ||
        page <= 1
      ) {
        return;
      }
      this.is_infinite = true;
      const page = this.page;
      if (this.question_section) {
        this[FETCH_CLASS_QUESTIONS]({
          data: this.question_section,
          global_class_id:
            Number(this.active_id) ||
            this[GET_ASSESMENT_DETAILS]?.data?.class?.global_class_id,
          page,
          tour: this.$route.query.tour ? true : false,
          dont_show_loader: true,
        });
        return;
      }

      let weekNumber = Number(this.week);
      if (
        weekNumber >
        this[GET_CLASS_TOPICS]?.data[this.active_list_item]?.topics?.length
      ) {
        weekNumber =
          this[GET_CLASS_TOPICS]?.data[this.active_list_item]?.topics?.length;
      }
      this[FETCH_CLASS_QUESTIONS]({
        data: this[GET_CLASS_TOPICS]?.data[this.active_list_item]?.topics[
          Number(weekNumber - 1)
        ],
        global_class_id:
          Number(this.active_id) ||
          this[GET_ASSESMENT_DETAILS]?.data?.class?.global_class_id,
        page,
        tour: this.$route.query.tour ? true : false,
        dont_show_loader: true,
      });
    },

    handle_class_id_change(e) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.active_id = Number(e.event.target.value);
      this.page = 1;
      this.page_size = null;
      this.questions = [];
      this.isUpdate = true;
      this.handleFetchTopics({
        class_id: this[GET_ASSESMENT_DETAILS]?.data?.class_id,
        subject_id: this[GET_ASSESMENT_DETAILS]?.data?.subject?.id,
        global_class_id: e.event.target.value,
        tour: this.$route.query.tour ? true : false,
      });
    },
    handle_feedback(e) {
      this[REPORT_ACTION](e);
    },
    handle_resize(e) {
      this.innerWidth = e.target.innerWidth;
    },
    handleDelete(e) {
      // toogle state fr modal to open
      this.is_delete_modal_open = !this.is_delete_modal_open;
      this.delete_id = e;
    },

    handleEdit(payload) {
      // this.is_delete_modal_open = !this.is_delete_modal_open;
      this.$router.push({
        name: "LMSCreate",
        query: {
          action: "edit",
          id: payload,
        },
      });
    },

    async handleAddQuestion() {
      if (this.$route.query.tour) {
        localStorage.setItem(
          "selectedTourQuestions",
          getLocalStorage("savedHomeWork")
        );

        this.$router.push({
          name: "LMSQuestion",
          params: { id: this.$route.params.id },
          query: { tour: true, class_tour_id: this.$route.query.class_tour_id },
        });
      } else {
        const homeworkPayload = this[GET_ASSESMENT_DETAILS]?.data;
        if (!homeworkPayload) {
          return;
        }
        const data = {
          questions: JSON.parse(getLocalStorage("savedHomeWork")),
          class_id: homeworkPayload?.class?.global_class_id,
          subject_id: homeworkPayload?.subject?.id,
        };
        await this[ADD_QUESTIONS_TO_HOMEWORK]({
          urlParams: { homework_id: homeworkPayload.id },
          data,
        });
      }
    },

    handleReport(payload) {
      // toogle state fr modal to open
      this.report_id = payload;
      this.is_qfeed_modal_open = !this.is_qfeed_modal_open;
    },

    handlegetTopicQuestion(question_section) {
      // this set is active for sidebar items
      this.current_tab = question_section.id;
      this.question_section = question_section;
      //call the corresponding question when topics are clicked
      // const page = this.page;
      this.page = 1;
      this[FETCH_CLASS_QUESTIONS]({
        data: question_section,
        global_class_id:
          Number(this.active_id) ||
          this[GET_ASSESMENT_DETAILS]?.data?.class?.global_class_id,
        page: 1,
        tour: this.$route.query.tour ? true : false,
      });
    },

    handleTopicSelection(topic, index) {
      this.active_index = index;
      let timeout = 500;

      setTimeout(() => {
        this.topic_prize = [];
        this.active_index = -1;
        this.show_all_topics = false;
        this.topic_hunt = false;
        this.topic_search = "";
      }, timeout);

      this.handleEventTopicList(topic, this.active_list_item, timeout);

      this[FETCH_CLASS_QUESTIONS]({
        data: topic,
        global_class_id:
          Number(this.active_id) ||
          this[GET_ASSESMENT_DETAILS]?.data?.class?.global_class_id,
        tour: this.$route.query.tour ? true : false,
      });
    },

    closeSideBar() {
      // this.topic_prize = [];
      // this.active_index = -1;
      // this.show_all_topics = false;
      // this.topic_hunt = false;
      // this.topic_search = "";
      // this.is_active_nav = false;
    },

    handleEventTopicList(payload, index, timeout = 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      // removeLocalStorage("savedHomeWork");
      // this.selected_questions_total = 0;
      this.questions = [];
      this.page = 1;
      this.page_size = null;
      this.active_list_item = index;
      this.topic_title_text = payload?.topic;
      this.question_section = payload;
      if (this.innerWidth > 992) {
        return;
      }
      setTimeout(() => {
        this.is_active_nav = false;
      }, timeout);
    },
    handleFetchTopics(payload) {
      this[SET_CLASS_QUESTIONS_LOADER](true);
      this[FETCH_CLASS_TOPICS](payload);
      this.selected_questions_total =
        JSON.parse(getLocalStorage("savedHomeWork"))?.length || 0;
    },
    handleSaveDelete(payload) {
      const savedHomeWork = JSON.parse(getLocalStorage("savedHomeWork"));
      if (!savedHomeWork) {
        setLocalStorage("savedHomeWork", [payload]);
        this.selected_questions_total = 1;
        return;
      }
      const filter = savedHomeWork.filter((e) => e === payload);
      if (filter.length) {
        const newItem = savedHomeWork.filter((e) => e !== payload);
        if (newItem?.length) {
          setLocalStorage("savedHomeWork", [...newItem]);
          this.selected_questions_total = newItem.length;
        } else {
          removeLocalStorage("savedHomeWork");
          this.selected_questions_total = 0;
        }
      } else {
        const newItem = [...savedHomeWork, payload];
        setLocalStorage("savedHomeWork", newItem);
        this.selected_questions_total = newItem.length;
      }
    },
  },

  async mounted() {
    const lsPayload = JSON.parse(localStorage.getItem("authUser"));
    let term;
    if (!lsPayload) {
      term = 0;
      this.week = 1;
    } else {
      switch (lsPayload?.term?.toLowerCase()) {
        case "first":
          term = 0;
          break;
        case "second":
          term = 1;
          break;
        case "third":
          term = 2;
          break;

        default:
          term = 0;
          break;
      }
      this.active_list_item = term;
      this.week = lsPayload?.week;
    }

    if (this.innerWidth > 992) {
      this.is_active_nav = true;
    }
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
      this.handleFetchTopics({
        class_id: this[GET_ASSESMENT_DETAILS]?.data?.class_id,
        subject_id: this[GET_ASSESMENT_DETAILS]?.data?.subject?.id,
        global_class_id:
          this[GET_ASSESMENT_DETAILS]?.data?.class?.global_class_id,
        tour: this.$route.query.tour ? true : false,
      });

      if (!this.get_general_global_classes.length) {
        const newClassesArray = [];
        this[GET_TEACHER_CLASSES].data.forEach((item) => {
          const object = {
            value: item?.id,
            text: item?.description,
          };
          newClassesArray.push(object);
        });
        this.get_general_global_classes = newClassesArray;
      }
    }
  },

  created() {
    window.addEventListener("resize", this.handle_resize);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.handle_resize);
  },

  watch: {
    selected_questions_total: {
      handler(value) {
        // this.show_tour = false;
        // console.log(value);

        setTimeout(() => {
          if (value >= 5 && this.$route.query.tour) this.show_tour = true;
        }, 3000);
      },
      immediate: true,
    },

    topic_search(topic) {
      this.searchForTopic(topic);
    },

    GET_CLASS_QUESTIONS_LOADER() {
      this.is_infinite = this[GET_CLASS_QUESTIONS_LOADER];
      this.questions_loading = this[GET_CLASS_QUESTIONS_LOADER];
    },
    GET_ASSESMENT_DETAILS() {
      if (this.isUpdate) {
        this.isUpdate = false;
        return;
      }
      if (
        this[GET_ASSESMENT_DETAILS] &&
        this[GET_ASSESMENT_DETAILS]?.code === 200 &&
        this[GET_ASSESMENT_DETAILS]?.data &&
        this[GET_ASSESMENT_DETAILS]?.message === "Homework record found" &&
        this[GET_ASSESMENT_DETAILS]?.name === "success"
      ) {
        this[GET_TEACHER_CLASSES_ACTION](
          this[GET_ASSESMENT_DETAILS]?.data?.class?.global_class_id
        );
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
        const newClassesArray = [];
        this[GET_TEACHER_CLASSES].data.forEach((item) => {
          const object = {
            value: item?.id,
            text: item?.description,
          };
          newClassesArray.push(object);
        });
        this.get_general_global_classes = newClassesArray;
        this.handleFetchTopics({
          class_id: this[GET_ASSESMENT_DETAILS]?.data?.class_id,
          subject_id: this[GET_ASSESMENT_DETAILS]?.data?.subject?.id,
          global_class_id:
            this[GET_ASSESMENT_DETAILS]?.data?.class?.global_class_id,
          tour: this.$route.query.tour ? true : false,
        });
      } else {
        this.$router.push({
          name: "CreateHomeWork",
        });
        return;
      }
    },

    GET_CLASS_TOPICS() {
      if (
        this[GET_CLASS_TOPICS]?.code === 200 &&
        this[GET_CLASS_TOPICS]?.data
      ) {
        let weekNumber = Number(this.week);
        this.disable_all = false;
        if (
          weekNumber >
          this[GET_CLASS_TOPICS]?.data[this.active_list_item]?.topics?.length
        ) {
          weekNumber =
            this[GET_CLASS_TOPICS]?.data[this.active_list_item]?.topics?.length;
        }
        if (
          this[GET_CLASS_TOPICS]?.data[this.active_list_item]?.topics[
            Number(weekNumber - 1)
          ]
        ) {
          this.question_section =
            this[GET_CLASS_TOPICS]?.data[this.active_list_item]?.topics[
              Number(weekNumber - 1)
            ];
          this[FETCH_CLASS_QUESTIONS]({
            data: this[GET_CLASS_TOPICS]?.data[this.active_list_item]?.topics[
              Number(weekNumber - 1)
            ],
            global_class_id:
              Number(this.active_id) ||
              this[GET_ASSESMENT_DETAILS]?.data?.class?.global_class_id,
            tour: this.$route.query.tour ? true : false,
          });
          this.topic_title_text =
            this[GET_CLASS_TOPICS]?.data[this.active_list_item]?.topics[
              Number(weekNumber - 1)
            ]?.topic;
        } else {
          this.disable_all = true;
          this.questions_loading = false;
          this[SET_CLASS_QUESTIONS_LOADER](false);
          this[SET_CLASS_QUESTIONS](null);
        }
      } else {
        this.$router.push({
          name: "CreateHomeWork",
        });
        return;
      }
    },
    computedTopicName() {
      this.topic_title_text = this.computedTopicName;
    },

    GET_ADD_QUESTIONS_TO_HOMEWORK() {
      if (
        this[GET_ADD_QUESTIONS_TO_HOMEWORK] &&
        this[GET_ADD_QUESTIONS_TO_HOMEWORK]?.status === 200 &&
        this[GET_ADD_QUESTIONS_TO_HOMEWORK]?.data &&
        this[GET_ADD_QUESTIONS_TO_HOMEWORK]?.data?.code === 200 &&
        this[GET_ADD_QUESTIONS_TO_HOMEWORK]?.data?.message === "Record inserted"
      ) {
        this.disabled = true;

        let tour = this.$route?.query?.tour ?? null;
        let class_tour_id = this.$route?.query?.class_tour_id ?? null;

        this[TOAST_ACTION]({
          toastData: {
            toastOpen: true,
            toastText: "Questions Added",
            toastState: "success",
            showBtn: false,
          },
          timeout: 3000,
          callback: () => {
            this.$router.push({
              name: "LMSQuestion",
              query: tour ? { tour, class_tour_id } : null,
            });
          },
        });
        return;
      } else {
        this[TOAST_ACTION]({
          toastData: {
            toastOpen: true,
            toastText:
              this[GET_ADD_QUESTIONS_TO_HOMEWORK]?.data?.message ||
              "please we encountered an error",
            toastState: "error",
            showBtn: false,
          },
          timeout: 3000,
        });
      }
    },
    innerWidth() {
      if (this.innerWidth > 992) {
        this.is_active_nav = true;
      } else {
        this.is_active_nav = false;
      }
    },
    GET_REPORT_DETAILS() {
      if (
        this[GET_REPORT_DETAILS]?.code === 200 &&
        this[GET_REPORT_DETAILS]?.message === "Record inserted" &&
        this[GET_REPORT_DETAILS]?.name === "success"
      ) {
        this.is_qfeed_modal_open = false;
        this[TOAST_ACTION]({
          toastData: {
            toastOpen: true,
            toastText: this[GET_REPORT_DETAILS]?.message || "Record Created",
            toastState: "success",
            showBtn: false,
          },
          timeout: 3000,
        });
      } else {
        this[TOAST_ACTION]({
          toastData: {
            toastOpen: true,
            toastText:
              this[GET_REPORT_DETAILS]?.message || "Record Not Created",
            toastState: "error",
            showBtn: false,
          },
          timeout: 3000,
        });
      }
    },
    GET_CLASS_QUESTIONS() {
      if (
        this[GET_CLASS_QUESTIONS]?.code === 200 &&
        this[GET_CLASS_QUESTIONS]?.name === "success"
      ) {
        this.questions = [
          ...this.questions,
          ...this[GET_CLASS_QUESTIONS]?.data,
        ];
        this.page = this.page + 1;
        this.is_infinite = false;
        if (!this.page_size) {
          this.page_size = this[GET_CLASS_QUESTIONS]?.pagination?.pageCount;
        }
      }
    },
    GET_DELETE_OWN_QUESTION_DATA() {
      if (this[GET_DELETE_OWN_QUESTION_DATA]?.code !== 200) {
        this[TOAST_ACTION]({
          toastData: {
            toastOpen: true,
            toastText:
              this[GET_DELETE_OWN_QUESTION_DATA]?.message ||
              "Record Not Deleted",
            toastState: "error",
            showBtn: false,
          },
          timeout: 3000,
          callback: () => (this.is_delete_modal_open = false),
        });
        return;
      } else {
        const callback = () => {
          this.page = 1;
          this.is_delete_modal_open = false;
          if (!this.question_section) {
            let weekNumber = Number(this.week);
            if (
              weekNumber >
              this[GET_CLASS_TOPICS]?.data[this.active_list_item]?.topics
                ?.length
            ) {
              weekNumber =
                this[GET_CLASS_TOPICS]?.data[this.active_list_item]?.topics
                  ?.length;
            }
            this[FETCH_CLASS_QUESTIONS]({
              data: this[GET_CLASS_TOPICS]?.data[this.active_list_item]?.topics[
                Number(weekNumber - 1)
              ],
              global_class_id:
                Number(this.active_id) ||
                this[GET_ASSESMENT_DETAILS]?.data?.class?.global_class_id,
              page: this.page,
              tour: this.$route.query.tour ? true : false,
            });
            return;
          } else {
            this[FETCH_CLASS_QUESTIONS]({
              data: this.question_section,
              global_class_id:
                Number(this.active_id) ||
                this[GET_ASSESMENT_DETAILS]?.data?.class?.global_class_id,
              page: this.page,
              tour: this.$route.query.tour ? true : false,
            });
          }
        };
        this[TOAST_ACTION]({
          toastData: {
            toastOpen: true,
            toastText:
              this[GET_DELETE_OWN_QUESTION_DATA]?.message || "Record Deleted",
            toastState: "success",
            showBtn: false,
          },
          timeout: 3000,
          callback,
        });
      }
    },
  },
};
</script>

<style lang="scss">
// header style
.wrapper-main-float {
  .wrapper {
    @include flex-row-between-nowrap;
    padding: toRem(14) toRem(34);

    @include breakpoint-down(sm) {
      padding: toRem(14) toRem(12);
    }

    .header-text {
      font-size: 15px;

      @include breakpoint-down(sm) {
        font-size: 13.75px;
      }
    }

    .close-icon {
      background: darken($color-white, 5%);
      @include transition(0.4s);

      &:hover {
        background: $brand-red-light;
      }

      .icon-close {
        @include center-placement;
        color: $color-text;
      }
    }
  }
}

.main-layout-container {
  max-width: 143.5rem;
  position: relative;

  .btn {
    padding: 0.8125rem 1rem;
  }
  .dashboard-root-footer {
    @include flex-row-between-nowrap;
    position: fixed;
    bottom: 0px;
    width: 100%;
    padding: 10px 2rem 10px 30.5rem;
    background: #fff;
    z-index: 77;
    box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.15);
    @include breakpoint-down(lg) {
      position: fixed;
      bottom: 0px;
      width: 100%;
      padding: 10px 1rem 10px 1rem;
      background: #fff;
    }
    .right-footer {
      @include flex-column-center;
      text-align: center;

      @include breakpoint-down(sm) {
        font-size: toRem(14);
      }

      .selected-question-number {
        background: #d5d5d5;
        color: transparent;
        border-radius: 5px;
        user-select: none; /* supported by Chrome and Opera */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
      }
      .selected-is-selected {
        background: #d5d5d5;
        color: transparent;
        margin: 0.45rem auto;
        border-radius: 5px;
        user-select: none; /* supported by Chrome and Opera */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
      }
    }
    .left-footer {
      position: relative;

      button {
        @include breakpoint-down(sm) {
          font-size: toRem(10);
        }

        .button-inner {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .icon.spinner {
          font-size: 15px;
          display: block;
          margin-right: 8px;
        }
      }

      .tour-description {
        position: absolute;
        box-shadow: toRem(7) 0 toRem(25) rgba($black-text, 0.15);
        padding: toRem(18) toRem(15) toRem(16);
        width: toRem(215);
        top: toRem(-90);
        left: toRem(-60);
        background: lighten($brand-inverse, 1%);

        @include breakpoint-down(sm) {
          padding: toRem(12);
          top: toRem(-76);
          left: toRem(-37);
          width: toRem(185);
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
            @include square-shape(14);
          }
        }

        .tour-text {
          @include font-height(12.25, 19);
          margin-bottom: toRem(15);

          @include breakpoint-down(sm) {
            @include font-height(11.75, 19);
            margin-bottom: toRem(8);
          }

          @include breakpoint-down(xs) {
            @include font-height(11.5, 19);
          }
        }
      }
    }
  }

  .question-select-wrapper {
    @include flex-row-start-nowrap;
    margin-top: 1rem;
    .close-wrapper-left-main-question {
      position: fixed;
      bottom: 0px;
      top: 0px;
      left: -2234px;
      width: 28.5rem;
      max-width: 28.5rem;
      overflow-x: hidden;
      background: #113255;
      height: 100%;
      z-index: 88;
      transition: all 0.43s;
    }
    .wrapper-left-main-question {
      position: fixed;
      bottom: 0px;
      top: 0px;
      left: 0px;
      width: 28.5rem;
      max-width: 28.5rem;
      overflow-x: hidden;
      background: #113255;
      height: 100%;
      z-index: 88;
      transition: all 0.43s;
      @include breakpoint-down(lg) {
        width: 100%;
      }

      .close-wrapper {
        background: $brand-inverse-light;
        @include square-shape(30);
        position: fixed;
        left: calc(100% - 30px);
        top: 30px;

        .icon-close {
          @include center-placement;
        }
      }

      .sidebar-navigatation {
        padding: 5rem 1rem 1rem 1rem;
        height: inherit;
        width: 100%;
        .browser-question-main {
          @include flex-row-between-nowrap;
          font-style: normal;
          font-weight: bold;
          font-size: 16px;
          line-height: 22px;
          display: flex;
          align-items: center;
          text-transform: uppercase;
          color: #959595;
          margin: 1rem 1rem;
          // padding: 1rem 0px;
          margin-bottom: 0px;
          padding-bottom: 0px;
        }
        .wrapper-question-sec {
          .section-toogle-select-class {
            .custom-dropdown-label-wrapper {
              margin: 1rem;
            }
            .select-classes {
              background: rgba(0, 0, 0, 0.5);
              color: #fff;
            }
          }
          .wrapper-question-section {
            padding-left: 2px;
            padding-bottom: 2.5px;
          }
        }
      }
    }
    .close-wrapper-right-main-question {
      padding: 0.57rem 0.57rem 5rem 0.57rem;
      width: 100%;
      height: 100%;
      @include breakpoint-down(lg) {
        padding: 0.57rem 0.57rem 5rem 0.57rem;
        width: 100%;
        height: 100%;
      }
      .inner-wrapper-question {
        padding-top: 2rem;
        position: relative;
      }

      .placeholder-wrapper-render {
        @include flex-column-center;
        text-align: center;
        max-width: 30rem;
        margin: 20vh auto;
        @include breakpoint-down(xs) {
          @include flex-column-center;
          text-align: center;
          max-width: 30rem;
          margin: 8vh auto;
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
      .left-title-inner-main {
        margin-top: 1rem;
        @include flex-row-between-nowrap;
        .hamburger-wrapper {
          display: none;
          @include breakpoint-down(lg) {
            display: block;
            background: $white-text;
            border-radius: 4px;
            padding: 0.625rem;
            margin: 0.65rem 0px;
            @include flex-row-start-nowrap;
            .hamburger-text-mobile {
              font-size: 0.75rem;
            }
          }
        }
        .title-label-left {
          font-weight: 700;
          font-size: 1.3125rem;
          line-height: 160%;
          display: flex;
          align-items: center;
          color: #353535;
          margin: 1rem 0px;

          @include breakpoint-down(lg) {
            font-style: normal;
            font-weight: 700;
            font-size: 1rem;
            line-height: 160%;
            display: flex;
            align-items: center;
            color: #353535;
          }

          @include breakpoint-down(sm) {
            @include font-height(14.5, 22);
          }
        }

        .icon-main-cir {
          @include flex-column-center;
          background: $brand-accent;

          @include breakpoint-down(sm) {
            @include square-shape(34);
            top: toRem(-30);
          }
        }
      }
    }
    .wrapper-right-main-question {
      padding: 3.4rem 2rem 5rem 30.5rem;
      width: 100%;
      height: 100%;
      @include breakpoint-down(lg) {
        padding: 3.4rem 0.57rem 5rem 0.57rem;
        width: 100%;
        height: 100%;
      }
      .inner-wrapper-question {
        padding: 0rem;
        position: relative;
      }

      .placeholder-wrapper-render {
        @include flex-column-center;
        text-align: center;
        max-width: 30rem;
        margin: 20vh auto;
        @include breakpoint-down(xs) {
          @include flex-column-center;
          text-align: center;
          max-width: 30rem;
          margin: 8vh auto;
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
      .left-title-inner-main {
        margin-top: 1rem;
        @include flex-row-between-nowrap;
        .hamburger-wrapper {
          display: none;
          @include breakpoint-down(lg) {
            display: block;
            background: $white-text;
            border-radius: 4px;
            padding: 0.625rem;
            margin: 0.65rem 0px;
            @include flex-row-start-nowrap;
            .hamburger-text-mobile {
              font-size: 0.75rem;
            }
          }
        }
        .title-label-left {
          @include font-height(18, 24);
          font-weight: 700;
          display: flex;
          color: $color-text;
          margin: 1rem 0px;

          @include breakpoint-down(lg) {
            @include font-height(16, 24);
          }

          @include breakpoint-down(sm) {
            @include font-height(14, 22);
          }
        }

        .icon-main-cir {
          @include flex-column-center;
          @include square-shape(38);
          background: $brand-accent;
          @include transition(0.4s);

          &:hover {
            background: $brand-inverse;
          }
        }
      }
    }
  }
  .title-label-left.loader {
    background: #d5d5d5;
    color: transparent !important;
    border-radius: 5px;
    user-select: none; /* supported by Chrome and Opera */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
  }
  .infinite-loader {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    margin: 1rem 0rem;
    color: #0000006b;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}

.topic-search-wrapper {
  margin: auto;
  width: 90%;
  padding-bottom: toRem(20);

  .topic-card {
    padding: toRem(6) toRem(14);
    border-radius: toRem(7);
    @include flex-row-between-nowrap;
    transition: all ease-in-out 0.32s;

    &:hover {
      background: #dbf5f8;

      .topic-title {
        text-transform: capitalize;
        color: $brand-navy;
      }

      .topic-subtitle {
        color: #757575;
      }
    }

    .topic-title {
      transition: all ease-in-out 0.32s;
      color: rgba(255, 255, 255, 0.9);
    }

    .active-title {
      color: $brand-navy;
    }

    .topic-subtitle {
      transition: all ease-in-out 0.32s;
      color: rgba(255, 255, 255, 0.4);
    }

    .active-subtitle {
      color: #757575;
    }
  }

  .active-topic-card {
    background: #dbf5f8;
  }

  .yellow-bar {
    width: toRem(4);
    height: toRem(22);
    background: $brand-accent;
    margin-right: toRem(12);
  }

  .not-found-title {
    color: rgba(255, 255, 255, 0.7);
  }

  .create-button {
    border: 1.5px solid $brand-accent;
    padding: toRem(8) toRem(18);
    font-weight: 700 !important;
    font-size: 0.8rem;
    color: $brand-navy;
    background: #fceacf;

    &:hover {
      filter: brightness(1.15);
    }

    &:disabled {
      filter: brightness(0.75);
    }
  }
}

.search-wrapper {
  width: 90%;
  margin: toRem(12) auto toRem(15) auto;
  height: 37px;
  position: relative;
  border-radius: toRem(5);
  background: rgba(0, 0, 0, 0.5);

  .loader-line {
    width: 100%;
    height: toRem(3);
    position: relative;
    top: 100%;
    overflow: hidden;
    background-color: #ddd;
    margin: auto;
    border-radius: toRem(20);
  }

  .loader-line:before {
    content: "";
    position: absolute;
    left: -50%;
    height: toRem(3);
    width: 40%;
    background-color: $brand-inverse;
    animation: lineAnim 1s linear infinite;
    border-radius: toRem(20);
  }

  input {
    height: 100%;
    width: 100%;
    outline: 0;
    border: 1.2px solid transparent;
    border-radius: inherit;
    position: absolute;
    background: transparent;
    inset: 0;
    padding-left: toRem(15);
    transition: border-color ease-in-out 0.25s;
    color: #fff;
    font-size: 0.9rem;

    &:focus {
      border-color: $brand-inverse-light;
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.82rem;
      position: relative;
      top: -2px;
    }
  }

  .icon-search {
    @include center-y;
    left: calc(100% - 30px);
  }
}

.moore {
  &:hover {
    filter: brightness(0.9);
  }
}

@keyframes lineAnim {
  0% {
    left: -40%;
  }
  50% {
    left: 20%;
    width: 80%;
  }
  100% {
    left: 100%;
    width: 100%;
  }
}
</style>
