<template>
  <div class="post-input-state smooth-transition">
    <!-- POST TOP -->
    <div class="post-top">
      <!-- POST TITLE TEXT -->
      <div class="post-title-text">SCHEDULE A LIVE CLASS</div>

      <!-- POST TOP ROW -->
      <div class="post-top-row">
        <div class="avatar">
          <img
            v-lazy="getAuthUser.image"
            :alt="$string.getStringInitials(getAuthUser.full_name)"
            class="avatar-img"
            v-if="getAuthUser.image"
          />

          <div
            v-else
            class="avatar-text"
            :class="$color.getProfileBgColor(getAuthUser.full_name)"
          >
            {{ $string.getStringInitials(getAuthUser.full_name) }}
          </div>
        </div>

        <div class="wrapper w-100">
          <!-- POST INPUT -->
          <div
            class="extended-textarea rounded-12"
            role="textbox"
            ref="inputBox"
            contenteditable
            @paste="handleEditablePasteEvent($event)"
          ></div>
        </div>
      </div>

      <!-- LESSON PERIOD -->
      <div class="post-input-field">
        <div class="icon icon-calendar"></div>

        <div class="input-box">
          <div class="form-input">
            <div class="input-title">Lesson Time:</div>

            <!-- FORM ROW -->
            <div class="form-data-row w-100">
              <!-- START TIME -->
              <div class="period-input">
                <div class="label-text">Date</div>
                <div class="form-input-wrapper">
                  <date-picker
                    v-model="start_date"
                    type="date"
                    valuetype="format"
                    input-class="form-control"
                    :default-value="new Date()"
                    :disabled-date="disabledBeforeToday"
                  ></date-picker>

                  <!-- ICON -->
                  <div class="icon icon-calendar"></div>
                </div>
              </div>

              <!-- END TIME -->
              <div class="period-input">
                <div class="label-text">Time</div>
                <div class="form-input-wrapper">
                  <date-picker
                    v-model="start_time"
                    type="time"
                    valuetype="format"
                    input-class="form-control"
                    format="h:mm a"
                    :default-value="new Date()"
                    :showSecond="false"
                    placeholder="Select time"
                    :disabled-time="notBeforeTwoHoursCurrentTime"
                    :time-picker-options="{
                      start: '07:00',
                      step: '00:30',
                      end: '20:00',
                      format: 'h:mm a',
                    }"
                  ></date-picker>

                  <!-- ICON -->
                  <div class="icon icon-clock"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ASSESSEMENT SUBJECT -->
      <div class="post-input-field">
        <div class="icon icon-book-cover"></div>

        <!-- INPUT BOX -->
        <div class="input-box">
          <div class="select-input" @click="toggleSubject">
            <!-- INPUT -->
            <div class="single-line">
              <div class="input-title">Subject:</div>
              <div class="input-entry">
                {{
                  selected_subject.length
                    ? selected_subject[0].name
                    : "Select a subject"
                }}
              </div>
            </div>

            <div
              class="icon icon-caret-down"
              :class="{ 'rotate-180': show_subject_dropdown }"
            ></div>
          </div>

          <!-- POST SUBJECT SELECTOR -->
          <post-selector
            v-if="show_subject_dropdown"
            :multi_select="false"
            :pre_selected="selected_subject"
            :data_set="subject_list"
            @resolveSelection="processSubjectSelection"
            @hideDropdown="toggleSubject"
          />
        </div>
      </div>

      <!-- ASSESSEMENT TOPIC -->
      <div class="post-input-field" v-if="getAuthUser.is_tutor">
        <div class="icon icon-note-text"></div>

        <!-- INPUT BOX -->
        <div class="input-box">
          <div class="select-input" @click="toggleTopic">
            <!-- INPUT -->
            <div class="single-line">
              <div class="input-title">Topic:</div>
              <div class="input-entry">
                {{
                  selected_topic.length
                    ? selected_topic[0].name
                    : "Select a topic"
                }}
              </div>
            </div>

            <div
              class="icon icon-caret-down"
              :class="{ 'rotate-180': show_topic_dropdown }"
            ></div>
          </div>

          <!-- POST TOPIC SELECTOR -->
          <post-selector
            v-if="show_topic_dropdown"
            :multi_select="false"
            :pre_selected="selected_topic"
            :data_set="topic_list"
            @resolveSelection="processTopicSelection"
            @hideDropdown="toggleTopic"
          />
        </div>
      </div>

      <!-- ASSESSEMENT REPEAT -->
      <div class="post-input-field" v-if="false">
        <div class="icon icon-swap"></div>

        <!-- INPUT BOX -->
        <div class="input-box">
          <div class="select-input" @click="toggleInterval">
            <!-- INPUT -->
            <div class="single-line">
              <div class="input-title">Repeat Class:</div>
              <div class="input-entry">Select interval</div>
            </div>

            <div
              class="icon icon-caret-down"
              :class="{ 'rotate-180': show_interval_dropdown }"
            ></div>
          </div>

          <!-- POST INTERVAL SELECTOR -->
          <post-selector
            v-if="show_interval_dropdown"
            @hideDropdown="toggleInterval"
          />
        </div>
      </div>

      <!-- ASSIGNED CLASSES -->
      <div class="post-input-field">
        <div class="icon icon-teacher-class"></div>

        <!-- INPUT BOX -->
        <div class="input-box">
          <div class="select-input" @click="toggleClassList">
            <!-- INPUT -->
            <div>
              <div class="input-title">Assigned Class:</div>

              <div
                class="
                  d-flex
                  justify-content-start
                  align-items-start
                  flex-wrap
                  mgt-8
                "
                v-if="selected_class.length"
              >
                <select-view-card
                  v-for="(item, index) in selected_class"
                  :key="index"
                  :detail="item"
                  @removeSelection="removeClass"
                />
              </div>
            </div>

            <div
              class="icon icon-caret-down"
              :class="{ 'rotate-180': show_class_dropdown }"
            ></div>
          </div>

          <!-- POST CLASS SELECTOR -->
          <post-selector
            v-if="show_class_dropdown"
            :pre_selected="selected_class"
            :data_set="class_list"
            @resolveSelection="processClassSelection"
            @hideDropdown="toggleClassList"
          />
        </div>
      </div>

      <!-- ASSIGNED STUDENTS -->
      <div class="post-input-field">
        <div class="icon icon-group-users"></div>

        <!-- INPUT BOX -->
        <div class="input-box">
          <div class="select-input" @click="toggleStudentList">
            <!-- INPUT -->
            <div>
              <div class="input-title">Assigned Students:</div>
            </div>

            <div
              class="icon icon-caret-down"
              :class="{ 'rotate-180': show_student_dropdown }"
            ></div>
          </div>

          <!-- POST CLASS SELECTOR -->
          <post-selector
            v-if="show_student_dropdown"
            @hideDropdown="toggleStudentList"
          />
        </div>
      </div>
    </div>

    <!-- POST BOTTOM -->
    <div class="post-bottom d-flex justify-content-end">
      <!-- RIGHT COLUMN -->
      <div class="right-column">
        <div
          class="icon icon-trash"
          title="Close"
          @click="$emit('closeOpenState')"
        ></div>

        <div class="line"></div>

        <button
          class="btn btn-accent rounded-17"
          ref="scheduleBtn"
          @click="scheduleClass"
        >
          Schedule
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DatePicker from "vue2-datepicker";
import postSelector from "@/modules/base/components/feed-comps/post-input-comps/post-selector";
import selectViewCard from "@/modules/base/components/feed-comps/post-input-comps/select-view-card";

export default {
  name: "postLiveClassState",

  components: {
    DatePicker,
    postSelector,
    selectViewCard,
  },

  computed: {
    ...mapGetters({
      getTeacherSubjectList: "general/getTeacherSubjectList",
      getTeacherClassList: "general/getTeacherClassList",
      getSelectedClass: "general/getSelectedClass",
    }),
  },

  watch: {
    $route: {
      handler() {
        this.loadCurrentRouteClassSelection();
        this.subject_list = [];
      },
    },

    getTeacherSubjectList: {
      handler(value) {
        this.loadTeacherSubject(value);
      },
      immediate: true,
    },

    selected_subject: {
      handler() {
        this.loadClassesLinkedToSubject();
        this.loadAllTopicsForSubject();
      },
    },

    getTeacherClassList: {
      handler(value) {
        this.loadTeacherClass(value.classes);
      },
      immediate: true,
    },

    class_list: {
      handler() {
        this.loadCurrentRouteClassSelection();
      },
      immediate: true,
    },
  },

  data() {
    return {
      show_subject_dropdown: false,
      show_topic_dropdown: false,
      show_interval_dropdown: false,
      show_class_dropdown: false,
      show_student_dropdown: false,

      min_date: "",
      min_time: "",

      start_date: "",
      start_time: "",

      form: {
        subject_id: null,
        repetition: "once",
        availability: null, //"2020-09-03 09:00",
        title: null,
        class_id: [],
        topic_id: null,
        view_by: "class",
        description: "",
      },

      subject_list: [],
      selected_subject: [],

      topic_list: [],
      selected_topic: [],

      class_list: [],
      selected_class: [],

      student_list: [],
      selected_student: [],
    };
  },

  mounted() {
    this.$refs.inputBox.focus();
    this.setupPrefilledDateTime();
  },

  methods: {
    ...mapActions({
      createLiveClass: "dbFeeds/createLiveClass",
      fetchTeacherTopics: "dbFeeds/fetchTeacherTopics",
      getClassesAssignedSubject: "general/getClassesAssignedSubject",
    }),

    setupPrefilledDateTime() {
      let schedule = new Date();
      schedule.setHours(schedule.getHours() + 2);

      schedule.getMinutes() < 30
        ? schedule.setMinutes(0)
        : schedule.setMinutes(30);

      let year = schedule.getFullYear(),
        month =
          schedule.getMonth() + 1 > 9
            ? schedule.getMonth() + 1
            : `0${schedule.getMonth() + 1}`,
        day =
          schedule.getDate() > 9
            ? schedule.getDate()
            : `0${schedule.getDate()}`,
        hours =
          schedule.getHours() > 9
            ? schedule.getHours()
            : `0${schedule.getHours()}`,
        minutes =
          schedule.getMinutes() > 9
            ? schedule.getMinutes()
            : `0${schedule.getMinutes()}`;

      let { d2, m2, y1, h1, b2, a0 } = this.$date
        .formatDate(`${year}-${month}-${day}T${hours}:${minutes}:00Z`)
        .getAll();

      this.start_date = `${y1}-${m2}-${d2}`;
      this.start_time = `${h1}:${b2} ${a0}`;
    },

    disabledBeforeToday(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date < today;
    },

    notBeforeTwoHoursCurrentTime(time) {
      let today = "";
      let selected_date = new Date(this.start_date);
      let current_date = new Date();

      today =
        this.getDateMeta(selected_date) === this.getDateMeta(current_date)
          ? current_date
          : selected_date;

      return time.getHours() < today.getHours() + 2;
    },

    getDateMeta(date) {
      return `${date.getFullYear()}-${
        this.$date.monthFormat[date.getMonth()].index
      }-${date.getDate()}`;
    },

    // LOAD NEW SUBJECT SETUP
    loadTeacherSubject(subjects) {
      subjects.map((subject) => {
        this.subject_list.push({
          id: subject.subject_id,
          name: subject.name,
          image: null,
          selected: false,
        });
      });
    },

    // LOAD NEW CLASS SETUP
    loadTeacherClass(classes) {
      this.class_list = [];
      classes.map((class_data) => this.setupList(class_data, this.class_list));
    },

    loadClassesLinkedToSubject() {
      if (this.selected_subject.length) {
        this.class_list = [];

        this.getClassesAssignedSubject(this.selected_subject[0].id).then(
          (response) => {
            response.data.map((item) => {
              let data = {};
              data.id = item.id;
              data.name = item.class_name;
              data.image = null;
              data.selected = false;

              this.class_list.push(data);
            });
          }
        );
      } else this.loadTeacherClass(this.getTeacherClassList.classes);
    },

    loadAllTopicsForSubject() {
      this.topic_list = [];

      let payload = {
        global_class_id: this.getSelectedClass.global_class_id,
        subject_id: Number(this.selected_subject[0].id),
      };

      this.fetchTeacherTopics(payload)
        .then((response) => {
          response?.data?.map((item) => {
            let data = {};
            data.id = item.id;
            data.name = item.topic;
            data.image = null;
            data.selected = false;

            this.topic_list.push(data);
          });
        })
        .catch((err) => console.log(err));
    },

    loadCurrentRouteClassSelection() {
      this.selected_class = [];

      this.class_list.map((item) => {
        Number(item.id) === Number(this.$route.params.id)
          ? this.selected_class.push(item)
          : null;
      });
    },

    // REMOVE A CLASS FROM SELECTION
    removeClass($event) {
      this.selected_class = this.selected_class.filter(
        (item) => item.id !== $event
      );
    },

    setupList(object_data, list_data) {
      let data = {};
      data.id = object_data.class_id || object_data.subject_id;
      data.name = object_data.class_name || object_data.name;
      data.image = null;
      data.selected = false;

      list_data.push(data);
    },

    // HANDLE SUBJECT SELECTION
    processSubjectSelection(selection) {
      let selection_index = this.selected_subject.findIndex(
        (item) => item.id === Number(selection.id)
      );

      this.selected_subject = selection_index === -1 ? [selection] : [];
    },

    // HANDLE TOPIC SELECTION
    processTopicSelection(selection) {
      let selection_index = this.selected_topic.findIndex(
        (item) => item.id === Number(selection.id)
      );

      this.selected_topic = selection_index === -1 ? [selection] : [];
    },

    // HANDLE CLASS SELECTION
    processClassSelection(selection) {
      let selection_index = this.selected_class.findIndex(
        (item) => item.id === selection.id
      );

      selection_index === -1
        ? this.selected_class.push(selection)
        : this.selected_class.splice(selection_index, 1);
    },

    getTimeValue(time) {
      let [hour, minute] = time.split(":");
      return `${Number(hour) + 12}:${minute}`;
    },

    // SCHEDULE LIVE CLASS
    scheduleClass() {
      this.handleClick("scheduleBtn", "Scheduling...");

      let [time, meridian] = this.start_time.split(" ");
      let start_time = meridian === "am" ? time : this.getTimeValue(time);

      // GET ALL THE INPUTS
      this.form.title = this.$refs.inputBox.innerHTML;
      this.form.availability = `${this.start_date} ${start_time}`;

      this.selected_subject.map(
        (subject) => (this.form.subject_id = Number(subject.id))
      );

      this.selected_topic.map(
        (topic) => (this.form.topic_id = Number(topic.id))
      );

      this.selected_class.map((item) => this.form.class_id.push(item.id));

      // CHECK EMPTY STATE
      if (!this.form.title) {
        this.pushAlert("Live class title is required!", "warning");
        this.handleClick("scheduleBtn", "Schedule", false);
        return false;
      }

      if (!this.form.subject_id) {
        this.pushAlert("No class subject was selected!", "warning");
        this.handleClick("scheduleBtn", "Schedule", false);
        return false;
      }

      // CHECK IF USER IS TUTOR THEN CHECK TOPIC ID
      if (this.getAuthType.is_tutor) {
        if (!this.form.topic_id.length) {
          this.pushAlert("Please select a topic to proceed!", "warning");
          this.handleClick("scheduleBtn", "Schedule", false);
          return false;
        }
      }

      if (!this.form.class_id.length) {
        this.pushAlert("Please select a class to proceed!", "warning");
        this.handleClick("scheduleBtn", "Schedule", false);
        return false;
      }

      // UPDATE PAYLOAD IS USER IS TUTOR
      this.form.amount = 0;
      this.form.currency = "NGN";

      this.createLiveClass({
        tutor: this.getAuthUser.is_tutor,
        payload: this.form,
      })
        .then((response) => {
          this.handleClick("scheduleBtn", "Schedule", false);

          if ([200, 201].includes(response.code)) {
            this.pushAlert("Live class scheduled successfuly!", "success");
            this.$bus.$emit("reloadFeeds");
            this.$bus.$emit("reloadUpcoming");

            this.$emit("closeOpenState");
          }
          // FAILED CREATION
          else this.pushAlert("Live class scheduling failed", "error");
        })
        .catch(() => {
          this.pushAlert("Live class scheduling failed", "error");
          this.handleClick("scheduleBtn", "Schedule", false);
        });
    },

    toggleSubject() {
      this.show_subject_dropdown = !this.show_subject_dropdown;
    },

    toggleTopic() {
      this.show_topic_dropdown = !this.show_topic_dropdown;
    },

    toggleInterval() {
      this.show_interval_dropdown = !this.show_interval_dropdown;
    },

    toggleClassList() {
      this.show_class_dropdown = !this.show_class_dropdown;
    },

    toggleStudentList() {
      this.show_student_dropdown = !this.show_student_dropdown;
    },
  },
};
</script>

<style lang="scss" scoped>
.extended-textarea[contenteditable] {
  border: toRem(1) solid #e5e5e5;
  padding: toRem(10) toRem(12);

  &:empty {
    &::before {
      content: "Give your live class a title";
    }
  }

  &:focus {
    border: toRem(1) solid $brand-accent;
  }
}
</style>
