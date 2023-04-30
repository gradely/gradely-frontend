<template>
  <modal-cover @closeModal="$emit('closeTriggered')" :show_close_btn="true">
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">
          Assign to topic
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <div class="info-box rounded-10 mgb-15">
          <span class="icon icon-info brand-inverse mgr-15"></span>
          <div class="info-text">
            Assigning your questions to topics helps us get a more accurate data
            on your student performance report engine.
            <a href="#" class="brand-accent">Learn more here</a>.
          </div>
        </div>
        <label for="topic" class="gfont-13 font-weight-600">Choose Topic</label>

        <select-dropdown
          :ajaxFunction="searchFunction"
          :items="items"
          isAjax
          defaultText="Select Topic"
          @change="handleTopic($event)"
          :empty_state="empty_state"
          @newAction="addNewTopic"
        />
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-center">
        <button
          class="btn btn-accent btn-sm"
          :disabled="!topicSelected"
          @click="$emit('assignTopic', question.topic_id)"
        >
          Save Changes
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import ModalCover from "@/components/ModalComps/ModalCover";
import SelectDropdown from "@/components/SelectDropdown";

import { mapActions, mapGetters } from "vuex";
import { GET_ASSESMENT_DETAILS } from "../../pages/AssesmentQuestions/store.module.AssesmentQuestions/constants";
import {
  CREATE_TOPIC,
  GET_TOPIC_STATUS,
} from "../../pages/QuestionCreate/store.module.QuestionCreateModule/constants";
import { TOAST_ACTION } from "../../components/SideNotificationSnack/store.module/constants";

export default {
  name: "AssignAssessmentTopicModal",

  components: {
    ModalCover,
    SelectDropdown,
  },

  props: {
    items: {
      type: Array,
      default: () => [],
    },

    searchFunction: {
      type: Function,
    },
  },

  computed: {
    ...mapGetters([GET_ASSESMENT_DETAILS, GET_TOPIC_STATUS]),

    getNewTopicPayload() {
      return {
        topic: this.topic_title,
        subject_id: this.GET_ASSESMENT_DETAILS.data.subject.id,
        class_id: this.GET_ASSESMENT_DETAILS.data.class_id,
        term: this.getAuthUser.term,
      };
    },

    getAuthUser() {
      return JSON.parse(localStorage.getItem("authUser"));
    },

    topicSelected() {
      return Object.keys(this.question).length;
    },
  },

  data() {
    return {
      question: {},

      topic_title: "",

      empty_state: {
        message: "Topic not found",
        action_name: "Create topic",
        loading: "",
      },
    };
  },

  methods: {
    ...mapActions([CREATE_TOPIC, TOAST_ACTION]),

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

    handleTopic(e) {
      if (!e) {
        this.$set(this.question, "topic_id", "");
        return;
      }
      this.$set(this.question, "topic_id", parseInt(e, 10));
    },

    updateTopicTitle(title) {
      this.topic_title = title;
    },

    updateEmptyState(message, action_name, loading) {
      this.empty_state = { message, action_name, loading };
    },

    addNewTopic(title) {
      this.topic_title = title;

      this.updateEmptyState(
        "Please wait while new topic is created...",
        "Create Topic",
        "Creating Topic"
      );

      this.CREATE_TOPIC(this.getNewTopicPayload)
        .then((response) => {
          this.updateEmptyState("Topic not found", "Create Topic", "");

          if (response.code == 200) {
            setTimeout(() => {
              this.sendToast(
                `${this.topic_title} created and added to topic list`,
                "success"
              );
            }, 500);
          } else {
            setTimeout(() => {
              this.sendToast(`Topic creation failed`, "error");
            }, 500);
          }
        })
        .catch((err) => {
          console.log("error trying to create new topic", err);
          setTimeout(() => {
            this.updateEmptyState("Topic not found", "Create Topic", "");
            this.sendToast(`Topic creation failed`, "error");
          }, 500);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.info-box {
  background: $color-white;
  padding: toRem(15);
  @include flex-row-start-nowrap;
  align-items: flex-start;

  .info-text {
    font-size: 0.9rem;
    line-height: 165%;
  }

  .icon-info {
    transform: translateY(5px);
  }
}
</style>
