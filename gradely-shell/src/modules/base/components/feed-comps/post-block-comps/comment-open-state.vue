<template>
  <div class="post-open-state smooth-transition">
    <iframe
      name="commentField"
      contenteditable="true"
      spellcheck="false"
      id="frameContainer"
      style="height: 100px"
      class="extended-textarea comment-area mb-0"
    ></iframe>

    <!-- ATTACHMENT AREA  -->
    <div class="attachment-area w-100 h-auto" v-if="image_loaded">
      <div class="image-wrapper">
        <img v-lazy="image_loaded" alt="" />

        <!-- LOADING ICON -->
        <div class="loading-icon smooth-transition" v-if="!loading_complete">
          <div class="icon icon-dotted-spinner color-white animate"></div>
        </div>

        <!-- CANCEL TRIGGER -->
        <div
          class="cancel-trigger pointer"
          title="Cancel"
          @click="cancelFileUpload"
        >
          <div class="position-relative w-100 h-100">
            <div class="icon icon-close white-text"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- TOOLBAR  -->
    <div class="toolbar brand-inverse-light-bg">
      <!-- TOOL COLUMN  -->
      <div class="tool-column">
        <!-- BOLD TYPE  -->
        <div class="avatar">
          <div
            class="icon icon-bold"
            :class="{ selected: types.is_bold }"
            title="Bold Text"
            @click="selectType('bold')"
          ></div>
        </div>

        <!-- ITALIC TYPE  -->
        <div class="avatar">
          <div
            class="icon icon-italic"
            :class="{ selected: types.is_italic }"
            title="Italicize Text"
            @click="selectType('italic')"
          ></div>
        </div>

        <!-- UNDERLINE TYPE  -->
        <div class="avatar">
          <div
            class="icon icon-underline"
            :class="{ selected: types.is_underline }"
            title="Underline Text"
            @click="selectType('underline')"
          ></div>
        </div>

        <!-- DIVIDER  -->
        <div class="divider"></div>

        <!-- ATTACH ICON  -->
        <label for="mediaUpload">
          <div class="avatar">
            <div class="icon icon-paper-clip" title="Attachment"></div>
          </div>

          <input
            style="display: none"
            id="mediaUpload"
            type="file"
            accept=".jpg, .png, .jpeg"
            ref="fileUpload"
            @change="fileHandler"
          />
        </label>
      </div>

      <!-- BUTTON COLUMN  -->
      <div class="button-column">
        <!-- CLEAR  -->
        <div class="avatar" @click="$emit('switchState')">
          <div class="icon icon-clear" title="Clear and Close"></div>
        </div>

        <!-- DIVIDER  -->
        <div class="divider"></div>

        <!-- COMMENT BTN  -->
        <button
          class="btn btn-accent no-shadow"
          ref="postBtn"
          @click="getInput"
        >
          Post
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "commentOpenState",

  props: {
    post: {
      type: Object,
    },
  },

  computed: {
    ...mapGetters({
      getFileProgress: "aws/getFileProgress",
    }),
  },

  data: () => ({
    types: {
      is_bold: false,
      is_italic: false,
      is_underline: false,
    },

    previous_type: null,
    comment: null,

    image_loaded: "",
    loading_complete: false,

    attachment: "",
  }),

  created() {
    this.$bus.$on("clearFileState", () => {
      this.image_loaded = null;
      this.loading_complete = false;
    });
  },

  mounted() {
    this.$nextTick(() => {
      commentField.document.designMode = "On";
      commentField.document.body.style.fontFamily = "Noto Sans";
      commentField.document.body.style.fontSize = 13 + "px";

      commentField.document.body.focus();
    });
  },

  methods: {
    ...mapActions({
      uploadToBucket: "aws/uploadToBucket",
      resetProgressStatus: "aws/resetProgressStatus",
      deleteFromBucket: "aws/deleteFromBucket",
      cancelOngoingRequest: "aws/cancelOngoingRequest",
      postFeedComment: "dbFeeds/postFeedComment",
    }),

    // HANDLE USER FILE UPLOAD
    fileHandler($event) {
      const file = $event.target.files[0];

      // CHECK IF FILE SIZE EXCEEDS 15MB
      if (file.size < 5500000) {
        let payload = {
          name: file.name,
          folder: "files/image",
          file,
        };

        let reader = new FileReader();
        reader.onload = () => (this.image_loaded = reader.result);
        reader.readAsDataURL(file);

        this.$refs.fileUpload.value = "";

        // SEND TO BUCKET
        this.processFile(payload);
      } else this.pushAlert("Please upload an image less than 5mb!", "warning");
    },

    // PROCESS FILE TO S3 BUCKET
    processFile(payload) {
      this.uploadToBucket(payload)
        .then((response) => {
          if (response.code === 200) {
            this.loading_complete = true;
            this.resetProgressStatus();
            this.attachment = response.data.ObjectURL;
          } else this.pushAlert("File upload was cancelled!", "warning");
        })
        .catch(() =>
          this.pushAlert("An error occured while uploading image", "warning")
        );
    },

    cancelFileUpload() {
      this.image_loaded = null;
      this.loading_complete = false;
      // STILL UPLOADING
      if (this.getFileProgress.uploading) this.cancelOngoingRequest();
      // UPLOADING COMPLETE
      else
        this.deleteFromBucket(this.attachment).then(
          () => (this.attachment = null)
        );
    },

    selectType(type) {
      this.resetType(); // RESET TYPES
      if (
        (this.previous_type === "bold" && type === "bold") ||
        (this.previous_type === "italic" && type === "italic") ||
        (this.previous_type === "underline" && type === "underline")
      ) {
        this.$nextTick(() => {
          document.execCommand("removeFormat", false, this.previous_type);
          this.previous_type = null;
        });
      } else {
        if (type === "bold") this.types.is_bold = true;
        if (type === "italic") this.types.is_italic = true;
        if (type === "underline") this.types.is_underline = true;

        this.previous_type = type;
        this.$nextTick(() =>
          commentField.document.execCommand(type, false, null)
        );
      }
    },

    resetType() {
      Object.keys(this.types).forEach((key) => (this.types[key] = false));
    },

    getInput() {
      let frameObj = document.getElementById("frameContainer");
      let comment = frameObj.contentWindow.document.body.innerHTML;

      this.handleClick("postBtn", "Posting");

      if (comment.length) {
        let payload = {
          comment,
          attachment: this.attachment,
        };

        this.postFeedComment({ feed_id: this.post.id, payload })
          .then((response) => {
            this.handleClick("postBtn", "Post", false);
            // console.log(response);

            if (response.code === 200) {
              this.pushAlert("Comment posted successfully!", "success");

              this.$bus.$emit("addToComment", {
                comment: response.data,
                id: this.post.id,
              });

              this.$bus.$emit("increaseCommentCount", this.post.id);

              setTimeout(() => this.$emit("switchState"), 1500);
            } else {
              this.pushAlert("Posting comment failed", "warning");
            }
          })
          .catch(() => {
            this.handleClick("postBtn", "Post", false);
            this.pushAlert("An error occured while posting comment", "error");
          });
      } else {
        setTimeout(() => {
          this.handleClick("postBtn", "Post", false);
          this.pushAlert("Please enter a comment text!", "warning");
        }, 1000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.post-open-state {
  .extended-textarea[contenteditable] {
    &:empty {
      &::before {
        content: "Write a comment here...";
      }
    }
  }

  .extended-textarea {
    @include font-height(13.25, 19);
    padding: toRem(10);
    color: $brand-black;
    min-height: toRem(40);

    @include breakpoint-down(xs) {
      padding: toRem(6);
    }

    body {
      color: $brand-black;
    }
  }

  .attachment-area {
    @include flex-row-start-wrap;
    padding: 0 toRem(18) toRem(10);

    .image-wrapper {
      @include rectangle-shape(120, 100);
      border-radius: toRem(5);
      margin-right: toRem(20);
      position: relative;

      img {
        @include background-cover;
        border-radius: toRem(5);
      }

      .loading-icon {
        @include center-placement;
        .icon {
          font-size: toRem(25);
        }
      }

      .cancel-trigger {
        @include transition(0.4s);
        @include square-shape(22);
        background: $black-text;
        position: absolute;
        border-radius: 50%;
        right: toRem(-5);
        top: toRem(-5);
        display: none;
        z-index: 1;

        .icon {
          @include center-placement;
          font-size: toRem(12);
        }

        &:hover {
          background: $brand-tonic;
        }
      }

      &:hover {
        .cancel-trigger {
          display: unset;
        }
      }
    }
  }

  .toolbar {
    @include flex-row-between-nowrap;
    padding: toRem(6) toRem(10);

    @include breakpoint-down(xs) {
      padding: toRem(5) toRem(6);
    }

    .tool-column {
      @include flex-row-start-nowrap;
    }

    .button-column {
      @include flex-row-end-nowrap;

      .btn {
        padding: toRem(8) toRem(16);
        font-size: toRem(9);

        @include breakpoint-down(xs) {
          padding: toRem(7) toRem(14);
          font-size: toRem(8.5);
        }
      }
    }

    .avatar {
      @include square-shape(28);

      @include breakpoint-down(xs) {
        @include square-shape(24);
      }

      .icon {
        @include center-placement;
        @include transition(0.4s);
        font-size: toRem(20);
        color: $color-grey-dark;
        cursor: pointer;

        @include breakpoint-down(xs) {
          font-size: toRem(18);
        }

        &:hover {
          color: darken($brand-accent, 5%);
        }
      }

      .selected {
        color: darken($brand-accent, 5%);
      }

      .icon-paper-clip {
        font-size: toRem(18);

        @include breakpoint-down(xs) {
          font-size: toRem(16);
        }
      }

      .icon-clear {
        font-size: toRem(21);

        @include breakpoint-down(xs) {
          font-size: toRem(18.5);
        }

        &:hover {
          color: $brand-red;
        }
      }
    }

    .divider {
      width: toRem(1);
      height: toRem(22);
      background: $border-grey;
      margin: 0 toRem(9);

      @include breakpoint-down(xs) {
        margin: 0 toRem(5);
      }
    }
  }
}
</style>
