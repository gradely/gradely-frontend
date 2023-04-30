<template>
  <div class="post-input-state smooth-transition w-100 position-relative">
    <!-- POST TOP -->
    <div class="post-top w-100">
      <!-- POST TITLE TEXT -->
      <div class="post-title-text">START A DISCUSSION</div>

      <!-- POST TOP ROW -->
      <div class="post-top-row w-100">
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

          <!-- POST ATTACHMENT PREVIEW -->
          <div class="post-attachment-preview" v-if="attachments.length">
            <template v-if="isImageAttachment">
              <img-preview
                v-for="(attachment, index) in attachments"
                :key="index"
                :attachment="attachment"
              />
            </template>

            <template v-if="isVideoAttachment">
              <video-preview
                v-for="(attachment, index) in attachments"
                :key="index"
                :attachment="attachment"
              />
            </template>

            <template v-if="isFileAttachment">
              <file-preview
                v-for="(attachment, index) in attachments"
                :key="index"
                :attachment="attachment"
              />
            </template>
          </div>

          <!-- POST AUDIENCE -->
          <template v-if="isSchoolAndTeacher">
            <post-audience @updateSelectedClass="selected_class = $event" />
          </template>
        </div>
      </div>
    </div>

    <!-- POST BOTTOM -->
    <div class="post-bottom">
      <!-- LEFT COLUMN -->
      <label
        for="mediaUpload"
        class="
          left-column
          pointer
          smooth-transition
          hint--primary hint--rounded hint--bottom
        "
        aria-label="Attach a file"
      >
        <div class="icon icon-paper-clip"></div>
        <div class="text">Attach</div>

        <input
          style="display: none"
          id="mediaUpload"
          type="file"
          ref="fileUpload"
          @change="handleFileUpload"
          accept=".xlsx, .xls, .doc, .docx, .ppt, .pptx, .pdf, .jpg, .png, .jpeg, .mp4, .3gp"
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
          ref="postBtn"
          @click="startUpDiscussion"
        >
          POST
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import postAudience from "@/modules/base/components/feed-comps/post-input-comps/post-audience";

export default {
  name: "postDiscussionState",

  components: {
    postAudience,
    imgPreview: () =>
      import(
        /* webpackChunkName: "preview" */ "@/modules/base/components/feed-comps/post-input-comps/img-preview"
      ),
    videoPreview: () =>
      import(
        /* webpackChunkName: "preview" */ "@/modules/base/components/feed-comps/post-input-comps/video-preview"
      ),
    filePreview: () =>
      import(
        /* webpackChunkName: "preview" */ "@/modules/base/components/feed-comps/post-input-comps/file-preview"
      ),
  },

  computed: {
    ...mapGetters({
      getFileProgress: "aws/getFileProgress",
      getChildClassDetails: "general/getChildClassDetails",
    }),

    isSchoolAndTeacher() {
      return ["school", "teacher"].includes(this.getAuthType) ? true : false;
    },

    isImageAttachment() {
      return this.image_types.includes(this.attachments[0].extension)
        ? true
        : false;
    },

    isVideoAttachment() {
      return this.video_types.includes(this.attachments[0].extension)
        ? true
        : false;
    },

    isFileAttachment() {
      return this.doc_types.includes(this.attachments[0].extension)
        ? true
        : false;
    },
  },

  data: () => ({
    // FILE TYPES
    image_types: ["jpg", "png", "jpeg"],
    video_types: ["mp4", "3gp"],
    doc_types: ["xlsx", "xls", "doc", "docx", "ppt", "pptx", "pdf", "txt"],

    // FILE COUNT PER UPLOAD
    image_count: 5,
    video_count: 1,
    doc_count: 3,

    // FILE SIZES
    image_size: 5500000, // 5MB
    video_size: 100000000, // 100MB
    doc_size: 10500000, // 10MB

    attachments: [],
    file_uploaded_count: 0,

    selected_class: [],

    form: {
      type: "post",
      description: "",
      class_id: [],
      view_by: "all",
      attachments: [],
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

  // FILES => "application or text"

  // TODO
  // 1. Check file type
  // 2. Check file count
  // 3. Check file size

  methods: {
    ...mapActions({
      uploadToBucket: "aws/uploadToBucket",
      resetProgressStatus: "aws/resetProgressStatus",
      deleteFromBucket: "aws/deleteFromBucket",
      cancelOngoingRequest: "aws/cancelOngoingRequest",
      createDiscussion: "dbFeeds/createDiscussion",
    }),

    // START A DISCUSSION
    startUpDiscussion() {
      this.handleClick("postBtn", "Posting...");

      // 1. GET ALL INPUTS
      this.form.description = this.$refs.inputBox.innerHTML.trim();

      this.selected_class.map((item) => this.form.class_id.push(item.id));
      this.form.class_id = [...new Set(this.form.class_id)];
      this.form.attachments = [...this.attachments];

      this.form.attachments.map((attach) => {
        delete attach.raw;
        delete attach.status;
      });

      // 2. CHECK EMPTY STATE
      if (!this.form.description) {
        this.pushAlert("Discussion text is required!", "warning");
        this.handleClick("postBtn", "Post", false);
        return false;
      }

      if (!this.form.class_id.length)
        this.form.class_id = this.isSchoolAndTeacher
          ? this.$route.params.id
          : this.getChildClassDetails.class_detail.class_id;

      if (this.getAuthType === "parent")
        this.form.child_id = this.$route.params.id;

      let data_payload = {
        payload: this.form,
        child_id: this.getAuthType === "parent" ? this.$route.params.id : null,
      };

      this.createDiscussion(data_payload)
        .then((response) => {
          // console.log(response);
          this.handleClick("postBtn", "Post", false);

          if (response.code === 200) {
            this.pushAlert("Discussion posted successfully!", "success");

            setTimeout(() => {
              this.$bus.$emit("reloadFeeds");
              this.$bus.$emit("reloadUpcoming");
            }, 2000);

            this.$emit("closeOpenState");
          }
          // FAILED CREATION
          else this.pushAlert("Discussion posting failed", "error");
        })
        .catch(() => {
          this.pushAlert("Discussion posting failed", "error");
          this.handleClick("postBtn", "Post", false);
        });
    },

    handleFileUpload($event) {
      let loaded_files = [...$event.target.files].slice().reverse();
      this.$refs.fileUpload.value = ""; // CLEAR OUT FILE CACHE

      // IMAGE FILE
      if (loaded_files[0].type.split("/")[0] === "image") {
        // 1. CHECK IF FILE LIST CONTAINS ONLY IMAGES
        if (this.checkIfFilesHasVideoOrDoc(loaded_files) === false)
          return false;

        // 2. CHECK IF UPLOADED FILE MATCHES NEW FILE
        if (this.checkUploadedFile("image") === false) return false;

        // 3. CHECK THAT FILES LENGTH UPLOADED MEETS IMAGE MAX COUNT
        if (
          this.fileCheckerCount(loaded_files, this.image_count, "images") ===
          false
        )
          return false;

        // 4. CHECK IF ALL THE UPLOADED FILES MEET THE IMAGE FILE SIZE
        if (
          this.fileCheckerSize(loaded_files, this.image_size, "image") === false
        )
          return false;

        // 5. PUSH TO S3 BUCKET
        this.pushToBucket(loaded_files);
      }

      // VIDEO FILE
      else if (loaded_files[0].type.split("/")[0] === "video") {
        // 1. CHECK IF FILE LIST CONTAINS ONLY VIDEOS
        if (this.checkIfFilesHasImageOrDoc(loaded_files) === false)
          return false;

        // 2. CHECK IF UPLOADED FILE MATCHES NEW FILE
        if (this.checkUploadedFile("video") === false) return false;

        // 3. CHECK THAT FILES LENGTH UPLOADED MEETS VIDEO MAX COUNT
        if (
          this.fileCheckerCount(loaded_files, this.video_count, "video") ===
          false
        )
          return false;

        // 4. CHECK IF ALL THE UPLOADED FILES MEET THE VIDEO FILE SIZE
        if (
          this.fileCheckerSize(loaded_files, this.video_size, "video") === false
        )
          return false;

        // 5. PUSH TO S3 BUCKET
        this.pushToBucket(loaded_files);
      }

      // DOCUMENTS FILE
      else {
        // 1. CHECK IF FILE LIST CONTAINS ONLY DOCUMENTS
        if (this.checkIfFilesHasImageOrVideo(loaded_files) === false)
          return false;

        // 2. CHECK IF UPLOADED FILE MATCHES NEW FILE
        if (this.checkUploadedFile("document") === false) return false;

        // 3. CHECK THAT FILES LENGTH UPLOADED MEETS DOCUMENT MAX COUNT
        if (
          this.fileCheckerCount(loaded_files, this.doc_count, "documents") ===
          false
        )
          return false;

        // 4. CHECK IF ALL THE UPLOADED FILES MEET THE DOCUMENT FILE SIZE
        if (
          this.fileCheckerSize(loaded_files, this.doc_size, "document") ===
          false
        )
          return false;

        // 5. PUSH TO S3 BUCKET
        this.pushToBucket(loaded_files);
      }
    },

    // A SIMPLE FILE LIST GENERATOR
    fileCheckerSetup(files) {
      let file_list = [];
      files.map((file) => file_list.push(file.type.split("/")[0]));
      return file_list;
    },

    // A SIMPLE FILE TYPE COUNTER
    fileCheckerCount(loaded_files, counter, type) {
      if (loaded_files.length + this.file_uploaded_count > counter) {
        this.pushAlert(`Upload a maximum of ${counter} ${type}`, "warning");
        return false;
      }
    },

    // A SIMPLE FILE SIZE CHECKER
    fileCheckerSize(loaded_files, size, type) {
      let invalid_list = [];
      loaded_files.map((file) =>
        file.size > size ? invalid_list.push(file) : null
      );

      if (invalid_list.length) {
        this.pushAlert(
          `Upload a maximum ${type} size of ${(size - 500000) / 1000000}MB`,
          "warning"
        );
        return false;
      }
    },

    // check IF ALREADY UPLOADED FILE MATCHES INCOMING FILE TYPE
    checkUploadedFile(type) {
      if (this.attachments.length) {
        if (this.attachments[0].filetype !== type) {
          this.pushAlert("Please upload a similar filetype", "warning");
          return false;
        }
      } else return true;
    },

    // UPDATE FILE UPLOAD COUNTER AND PUSH TO S3 BUCKET
    pushToBucket(loaded_files) {
      this.file_uploaded_count += loaded_files.length;

      // PUSH TO ATTACHEMNTS
      loaded_files.map((file) => {
        this.attachments.push({
          title: file.name,
          filename: "",
          filetype: this.generateFileType(file),
          extension: file.name.split(".").slice(-1)[0],
          filesize: this.generateFileSize(file.size),
          raw: file,
          status: "pending",
        });
      });

      // PUSH TO S3 BUCKET
      this.attachments.map((file, index, file_data) => {
        if (file.status !== "completed") {
          let payload = {
            name: file.title,
            folder: `files/${file.filetype}`,
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
        }
      });
    },

    // GENERATE THE SIZE OF THE FILE (KB AND MB)
    generateFileSize(size) {
      return size.toString().length <= 6
        ? `${(size / 1024).toFixed(1)}kb`
        : `${(size / 1024 / 1024).toFixed(1)}mb`;
    },

    // GENERATE THE TYPE OF THE FILE (image, video and document)
    generateFileType(file) {
      if (file.type.split("/")[0] === "image") return "image";
      else if (file.type.split("/")[0] === "video") return "video";
      else return "document";
    },

    // USE IN IMAGE UPLOAD
    checkIfFilesHasVideoOrDoc(files) {
      if (
        this.fileCheckerSetup(files).includes("video") ||
        this.fileCheckerSetup(files).includes("application") ||
        this.fileCheckerSetup(files).includes("text")
      ) {
        this.pushAlert("Please upload a similar filetype", "warning");
        return false;
      }
    },

    // USE IN VIDEO UPLOAD
    checkIfFilesHasImageOrDoc(files) {
      if (
        this.fileCheckerSetup(files).includes("image") ||
        this.fileCheckerSetup(files).includes("application") ||
        this.fileCheckerSetup(files).includes("text")
      ) {
        this.pushAlert("Please upload a similar filetype", "warning");
        return false;
      }
    },

    // USE IN DOCUMENT UPLOAD
    checkIfFilesHasImageOrVideo(files) {
      if (
        this.fileCheckerSetup(files).includes("image") ||
        this.fileCheckerSetup(files).includes("video")
      ) {
        this.pushAlert("Please upload a similar filetype", "warning");
        return false;
      }
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
      else {
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
      this.file_uploaded_count -= 1;
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
      content: "";
    }
  }

  &:focus {
    border: toRem(1) solid $brand-accent;
  }
}
</style>
