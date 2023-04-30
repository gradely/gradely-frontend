<template>
  <div>
    <div
      @click="is_drawer_topic_open = !is_drawer_topic_open"
      class="first-label-title"
    >
      <div class="header-list-term-left">
        {{ `${items.term.toUpperCase()}` }}
        {{ $route.query.tour ? "" : " Term" }}
      </div>
      <div
        :class="[
          is_drawer_topic_open
            ? `header-list-term-right icon-caret-down`
            : `header-list-term-right icon-caret-right`,
        ]"
      ></div>
    </div>

    <ol v-if="is_drawer_topic_open" class="wrapper-question-section">
      <li
        v-for="(question_section, index) in items.topics"
        :key="index"
        @click="handlegetTopicQuestion(question_section)"
        :class="[
          current_tab === question_section.id && is_active_list_item
            ? `item-main-question-item active`
            : `item-main-question-item`,
        ]"
      >
        <span :title="question_section.title">
          <!-- why getTruncatedText,  wasnt this thought of as filters -->
          <span>{{ index + 1 }}.</span>&nbsp;<span>{{
            getTruncatedText(question_section.topic, 40)
          }}</span>
        </span>
      </li>
    </ol>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getTruncatedText } from "../services/stringMgt";
import { GET_CLASS_TOPICS_LOADER } from "../pages/QuestionSelect/store.module.QuestionSelect.Module/constant";
import { GET_ASSESMENT_DETAILS } from "../pages/AssesmentQuestions/store.module.AssesmentQuestions/constants";
export default {
  name: "SidebarDrawerList",
  data() {
    return {
      current_tab: 0,
      is_drawer_topic_open: false,
    };
  },
  computed: {
    ...mapGetters([GET_CLASS_TOPICS_LOADER, GET_ASSESMENT_DETAILS]),
  },
  methods: {
    getTruncatedText,
    handlegetTopicQuestion(question_section) {
      this.$emit("topic_list", question_section);
      this.current_tab = question_section.id;
      this.fetch_class_question({
        data: question_section,
        global_class_id:
          Number(this.active_id) ||
          this[GET_ASSESMENT_DETAILS]?.data?.class?.global_class_id,
      });
    },
  },
  props: {
    items: {
      type: Object,
      default: () => {},
    },
    active_id: {},
    fetch_class_question: {
      type: Function,
    },
    is_active_list_item: {
      type: Boolean,
      default: false,
    },
    parent_list_index: {
      type: Number,
      default: null,
    },
    week: {},
    isOpen: {},
  },
  watch: {
    items() {
      this.current_tab = this.items.topics[0]?.id;
    },
  },
  mounted() {
    if (this.isOpen) {
      this.is_drawer_topic_open = this.isOpen;
    }
    if (this.week) {
      const number = Number(this.week);
      if (number > this.items.topics.length) {
        this.current_tab = this.items.topics[this.items.topics.length - 1]?.id;
        return;
      }
      this.current_tab = this.items.topics[number - 1]?.id;
      return;
    }
    if (this.parent_list_index === 0)
      this.current_tab = this.items.topics[0]?.id;
  },
};
</script>

<style lang="scss" scoped>
.first-label-title {
  @include flex-row-between-nowrap;
  font-style: normal;
  font-weight: bold;
  font-size: 0.875rem;
  line-height: 19px;
  display: flex;
  align-items: center;
  color: #dbf5f8;
  margin: 0rem 1rem;
  padding: 0.67rem 10px;
  cursor: pointer;
  transition: all 0.34s;
  border-radius: 10px;
  .header-list-term-right,
  .header-list-term-left {
    cursor: pointer;
  }
}
.first-label-title:hover {
  background: #08192a;
  color: #ffffff;
  border-radius: 10px;
}
.showmore-label-title {
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 160%;
  display: flex;
  align-items: center;
  color: #f5f5f5;
  margin: 1rem 1rem;
  padding: 0rem 1rem;
}
.showmore-label-title.active {
  border-left: 4px solid $brand-accent;
  padding-left: 5px;
}
.item-main-question-item {
  font-style: normal;
  font-weight: normal;
  font-size: 0.75rem;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: #d5d5d5;
  line-height: 16px;
  @include flex-row-between-nowrap;
  color: #fff;
  padding: 0.5rem 0.68rem;
  border-radius: 10px;
  margin: 0.5rem 0.78rem;
  cursor: pointer;
}
.item-main-question-item:hover {
  background: #dbf5f8;
  color: #2a4f77;
  transition: all 0.34s ease-in;
}
.item-main-question-item.active {
  background: #dbf5f8;
  color: #2a4f77;
  transition: all 0.34s ease-in;
}
</style>
