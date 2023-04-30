<template>
  <div class="post-input-state smooth-transition">
    <!-- POST TOP -->
    <div class="post-top">
      <!-- POST TITLE TEXT -->
      <div class="post-title-text">SHARE A LESSON</div>

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

          <!-- FILE PREVIEW  -->
          <template v-if="attachments.length">
            <file-preview
              v-for="(attachment, index) in attachments"
              :key="index"
              :attachment="attachment"
            />
          </template>
        </div>
      </div>

      <!-- ASSESSEMENT SUBJECT-->
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

      <!-- ASSESSEMENT LESSON SUMMARY -->
      <div class="post-input-field" v-if="false">
        <div class="icon icon-tag"></div>

        <!-- INPUT BOX -->
        <div class="input-box">
          <div class="select-input" @click="toggleTopic">
            <!-- INPUT -->
            <div class="single-line">
              <div class="input-title">Topic:</div>
              <div class="input-entry">Select a topic</div>
            </div>

            <div
              class="icon icon-caret-down"
              :class="{ 'rotate-180': show_topic_dropdown }"
            ></div>
          </div>

          <!-- POST TOPIC SELECTOR -->
          <post-selector
            v-if="show_topic_dropdown"
            @hideDropdown="toggleTopic"
          />
        </div>
      </div>

      <div class="post-input-field">
        <div class="icon icon-file-text"></div>

        <div class="input-box">
          <div class="form-input">
            <div class="input-title">Lesson Summary:</div>

            <!-- FORM ROW -->
            <div class="form-data-row w-100">
              <!-- SSUMMARY -->
              <textarea
                rows="4"
                v-model="form.lesson_description"
                class="form-control w-100 color-grey-dark gfont-12-5"
                placeholder="Write a brief summary of your lesson"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- ASSIGNED CLASSES-->
      <div class="post-input-field">
        <div class="icon icon-teacher-class"></div>

        <!-- INPUT BOX -->
        <div class="input-box">
          <div class="select-input" @click="toggleClassList">
            <!-- INPUT -->
            <div>
              <div class="input-title">Assigned Class:</div>

              <div
                class="d-flex justify-content-start align-items-start flex-wrap mgt-8"
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

      <!-- ASSIGNED STUDENTS-->
      <div class="post-input-field" v-if="false">
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
    <div class="post-bottom">
      <!-- LEFT COLUMN -->
      <label
        for="mediaUpload"
        class="left-column pointer smooth-transition hint--primary hint--rounded hint--bottom"
        aria-label="Attach a file"
      >
        <div class="icon icon-paper-clip"></div>
        <div class="text">Attach</div>

        <input
          style="display: none"
          id="mediaUpload"
          type="file"
          @change="handlerFileUpload"
          ref="fileUpload"
          accept=".xlsx, .xls, .doc, .docx, .ppt, .pptx, .pdf"
        />
      </label>

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
          ref="shareBtn"
          @click="shareLessonNote"
        >
          Share
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import postSelector from "@/modules/base/components/feed-comps/post-input-comps/post-selector";
import filePreview from "@/modules/base/components/feed-comps/post-input-comps/file-preview";
import selectViewCard from "@/modules/base/components/feed-comps/post-input-comps/select-view-card";

export default {
  name: "postLessonState",

  components: {
    postSelector,
    filePreview,
    selectViewCard,
  },

  computed: {
    ...mapGetters({
      getTeacherSubjectList: "general/getTeacherSubjectList",
      getTeacherClassList: "general/getTeacherClassList",
    }),
  },

  watch: {
    $route: {
      handler() {
        this.loadCurrentRouteClassSelection();
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

  data: () => ({
    show_subject_dropdown: false,
    show_topic_dropdown: false,
    show_class_dropdown: false,
    show_student_dropdown: false,

    subject_list: [],
    selected_subject: [],

    class_list: [],
    selected_class: [],

    student_list: [],
    selected_student: [],

    max_file_size: 10500000, //10MB
    max_file_count: 3,
    file_uploaded_count: 0,

    attachments: [],

    form: {
      class_id: [],
      title: null,
      subject_id: null,
      view_by: "class",
      description: "",
      lesson_description: "",
      practice_attachments: [
        {
          title: "",
          filename: "",
          filetype: "",
          extension: "",
          filesize: "",
        },
      ],
    },
  }),

  created() {
    this.$bus.$on("removeUploadedFile", (file) => this.removeFileHandler(file));

    this.$bus.$on("clearFileState", () => {
      let file_index = this.attachments.findIndex(
        (attach) => attach.status === "ongoing"
      );
      this.attachments.splice(file_index, 1);
    });
  },

  mounted() {
    this.$refs.inputBox.focus();
    this.file_uploaded_count = 0;
    this.attachments = [];
  },

  methods: {
    ...mapActions({
      getClassesAssignedSubject: "general/getClassesAssignedSubject",
      createLesson: "dbFeeds/createLesson",
      uploadToBucket: "aws/uploadToBucket",
      resetProgressStatus: "aws/resetProgressStatus",
      deleteFromBucket: "aws/deleteFromBucket",
      cancelOngoingRequest: "aws/cancelOngoingRequest",
    }),

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
        (item) => item.id === selection.id
      );

      this.selected_subject = selection_index === -1 ? [selection] : [];
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

    // HANDLE LESSON FILE UPLOAD
    handlerFileUpload($event) {
      let loaded_files = [...$event.target.files];
      this.$refs.fileUpload.value = "";

      // 1. CHECK FILE COUNT
      if (
        loaded_files.length + this.file_uploaded_count >
        this.max_file_count
      ) {
        this.pushAlert("Upload a maximum of 3 files", "warning");
        return false;
      }

      // 2. CHECK FILE SIZE
      let invalid_list = [];
      loaded_files.map((file) =>
        file.size > this.max_file_size ? invalid_list.push(file) : null
      );

      if (invalid_list.length) {
        this.pushAlert(
          `Upload a maximum file size of ${(this.max_file_size - 500000) /
            1000000}mb`,
          "warning"
        );
        return false;
      }

      // 3. UPDATE FILE UPLOAD COUNT
      this.file_uploaded_count += loaded_files.length;

      // 4.LOAD INTO PRE-ATTACHMENT LIST
      loaded_files.map((file) => {
        this.attachments.push({
          title: file.name,
          filename: "",
          filetype: "document",
          extension: file.name.split(".").slice(-1)[0],
          filesize: this.generateFileSize(file.size),
          raw: file,
          status: "pending",
        });
      });

      // 5. LOAD FILE INTO S3 BUCKET
      this.attachments.map((file, index, file_data) => {
        let payload = {
          name: file.title,
          folder: "files/document",
          file: file.raw,
        };

        this.uploadToBucket(payload)
          .then((response) => {
            if (response.code === 200) {
              this.resetProgressStatus();
              this.attachments[index].filename = response.data.ObjectURL;
              this.attachments[index].status = "completed";

              if (file_data.length !== index + 1)
                this.attachments[index].status = "ongoing";
            }
          })
          .catch(() =>
            this.pushAlert("An error occured while uploading file", "warning")
          );
      });
    },

    // SHARE LESSON NOTE
    shareLessonNote() {
      this.handleClick("shareBtn", "Sharing...");

      // 1. GET ALL INPUTS
      this.form.title = this.$refs.inputBox.innerHTML;
      this.selected_subject.map(
        (subject) => (this.form.subject_id = subject.id)
      );
      this.selected_class.map((item) => this.form.class_id.push(item.id));
      this.form.class_id = [...new Set(this.form.class_id)];
      this.form.practice_attachments = [...this.attachments];

      this.form.practice_attachments.map((attach) => {
        delete attach.raw;
        delete attach.status;
      });

      // 2. CHECK EMPTY STATE
      if (!this.form.title) {
        this.pushAlert("Lesson title is required!", "warning");
        this.handleClick("shareBtn", "Share", false);
        return false;
      }

      if (!this.form.subject_id) {
        this.pushAlert("No class subject was selected!", "warning");
        this.handleClick("shareBtn", "Share", false);
        return false;
      }

      if (!this.form.class_id.length) {
        this.pushAlert("Please select a class to proceed!", "warning");
        this.handleClick("shareBtn", "Share", false);
        return false;
      }

      if (!this.form.practice_attachments.length) {
        this.pushAlert("Please attach a lesson!", "warning");
        this.handleClick("shareBtn", "Share", false);
        return false;
      }

      this.createLesson(this.form)
        .then((response) => {
          // console.log(response);
          this.handleClick("shareBtn", "Share", false);

          if (response.code === 200) {
            this.pushAlert("Lesson note shared successfully!", "success");
            this.$bus.$emit("reloadFeeds");
            this.$bus.$emit("reloadUpcoming");
            this.$emit("closeOpenState");
          }
          // FAILED CREATION
          else this.pushAlert("Lesson note sharing failed", "error");
        })
        .catch(() => {
          this.pushAlert("Lesson note sharing failed", "error");
          this.handleClick("shareBtn", "Share", false);
        });
    },

    // GENERATE THE SIZE OF THE FILE (KB AND MB)
    generateFileSize(size) {
      return size.toString().length <= 6
        ? `${(size / 1024).toFixed(1)}kb`
        : `${(size / 1024 / 1024).toFixed(1)}mb`;
    },

    // REMOVE FILE HANDLER
    removeFileHandler(file) {
      // - IF PENDING REMOVE JUST REMOVE FROM LIST
      if (file.status === "pending") {
        this.extractFileFromAttachment(file);
      }

      // - IF ONGOING CANCEL AND REMOVE FROM LIST
      else if (file.status === "ongoing") {
        this.cancelOngoingRequest();
        this.extractFileFromAttachment(file);
      }

      // - IF COMPLETED DELETE AND REMOVE FROM LIST
      else if (file.status === "completed") {
        let file_name = file.filename;
        this.extractFileFromAttachment(file);
        this.deleteFromBucket(file_name);
      }
    },

    // EXTRACT
    extractFileFromAttachment(file) {
      let file_index = this.attachments.findIndex(
        (attach) => attach.title === file.title
      );
      this.attachments.splice(file_index, 1);
    },

    toggleSubject() {
      this.show_subject_dropdown = !this.show_subject_dropdown;
    },

    toggleTopic() {
      this.show_topic_dropdown = !this.show_topic_dropdown;
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
      content: "Give your lesson a title";
    }
  }

  &:focus {
    border: toRem(1) solid $brand-accent;
  }
}
</style>
