<template>
  <div class="security-question">
    <content-container-layout>
      <template slot="content">
        <div
          class="
            d-flex
            flex-column
            align-items-center
            justify-content-start
            w-100
          "
        >
          <!-- IMAGE TOP  -->
          <div class="onboarding-image-top mgt-20">
            <img
              v-lazy="mxStaticImg('ShieldAvatar.png', 'onboarding')"
              alt=""
            />
          </div>

          <!-- TEXT TITLE  -->
          <div
            class="
              onboarding-text
              title
              brand-navy
              font-weight-700
              text-center
              mgb-20
            "
          >
            Set Security Question
          </div>

          <div class="onboarding-description color-ash text-center">
            Set a security question and answer on your account. You will need
            this to change your password whenever you forget it.
          </div>

          <!-- FORM WRAPPER  -->
          <div class="onboarding-form-wrapper mgt-20 mx-auto">
            <!-- QUESTION  -->
            <div class="form-group compact-row w-100">
              <label for="questionSelect" class="label-compact label-sm"
                >Select a question
              </label>
              <select
                class="form-control"
                id="questionSelect"
                v-model="question"
              >
                <option disabled selected value="">Select a question</option>
                <option
                  v-for="(question, index) in securityQuestions"
                  :value="question.id"
                  :key="index"
                >
                  {{ question.question }}
                </option>
              </select>
            </div>

            <!-- ANSWER  -->
            <div class="form-group compact-row w-100">
              <label for="questionAnswer" class="label-compact label-sm"
                >Answer to your question
              </label>
              <input
                type="text"
                id="questionAnswer"
                class="form-control"
                placeholder="Enter your answer to the selected question"
                required
                v-model="answer"
              />
            </div>

            <!-- CONNECT BUTTON  -->
            <button
              class="btn btn-accent mgb-10"
              ref="answerBtn"
              :disabled="!question || !answer"
              @click="updateQuestion"
            >
              Continue
            </button>
          </div>
        </div>
      </template>
    </content-container-layout>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import contentContainerLayout from "@/modules/onboarding/components/global-comps/content-container-layout";

export default {
  name: "securityQuestion",

  metaInfo: {
    title: "Security Question",
  },

  components: {
    contentContainerLayout,
  },

  computed: {
    ...mapGetters({
      securityQuestions: "onboarding/getSecurityQuestions",
    }),

    getQuestionAnswer() {
      return {
        question: this.question,
        answer: this.answer,
      };
    },
  },

  async mounted() {
    if (!this.securityQuestions.length) await this.getSecurityQuestions();
  },

  data() {
    return {
      answer: "",
      question: "",
    };
  },

  methods: {
    ...mapActions({
      getSecurityQuestions: "onboarding/getSecurityQuestions",
      updateSecurityQuestion: "onboarding/updateSecurityQuestion",
    }),

    updateQuestion() {
      this.handleClick("answerBtn", "updating answer");

      this.updateSecurityQuestion(this.getQuestionAnswer)
        .then((response) => {
          this.handleClick("answerBtn", "Continue", false);
          if (response.code === 200) {
            this.pushAlert("Security answer updated", "success");

            setTimeout(() => {
              this.$router.push({ name: "StudentSelectAvatar" });
            }, 1600);
          } else {
            this.pushAlert("Failed to save answer", "warning");
          }
        })
        .catch(() => {
          this.handleClick("answerBtn", "Continue", false);
          this.pushAlert("Error saving answer", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
