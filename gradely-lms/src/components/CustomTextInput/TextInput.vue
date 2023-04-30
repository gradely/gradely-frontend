<template>
  <div :style="cssVars">
    <div
      class="text-editor-section rounded-5"
      :class="basic ? 'min-height-100' : null"
    >
      <ckeditor
        v-if="action === 'edit'"
        :editor="editor"
        :config="getEditorConfig"
        v-model="editor_value"
        @ready="handle_ready"
        @keydown="handle_input"
      ></ckeditor>
      <ckeditor
        v-else
        :editor="editor"
        :config="getEditorConfig"
        v-model="value"
        @ready="handle_ready"
        @input="handle_input"
      ></ckeditor>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@gradely-editor/gradely-editor-build-classic";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getLocalStorage } from "../../services/localStorageMgt";
import { API_VERSION, API_BASE_URL } from "../../env.js";
export default {
  name: "TextEditor",

  props: {
    action: {
      type: String,
      default: "create",
    },
    content: String,
    basic: Boolean,
    name: String,
    format: {
      type: Boolean,
      default: true,
    },
    height: {
      type: Number,
      default: 150,
    },
  },

  computed: {
    editor_value: {
      set: function(val) {
        this.$emit("input", { name: this.name, value: val });
      },
      get: function() {
        return this.content;
      },
    },

    cssVars() {
      return {
        "--editor-height": this.height + "px",
      };
    },

    getEditorConfig() {
      return {
        math: {
          engine: "mathjax", // or katex or function. E.g. (equation, element, display) => { ... }
          lazyLoad: undefined, // async () => { ... }, called once before rendering first equation if engine doesn't exist. After resolving promise, plugin renders equations.
          outputType: "script", // or span
          forceOutputType: false, // forces output to use outputType
          enablePreview: true, // Enable preview view
          previewClassName: [], // Class names to add to previews
          popupClassName: [], // Class names to add to math popup balloon
        },
        height: "130px",
        autoGrow_minHeight: "40",
        fontSize_sizes: "14.5px",
        toolbar: this.format
          ? [
              "bold",
              "|",
              "italic",
              "|",
              "link",
              "|",
              "undo",
              "|",
              "redo",
              "|",
              "numberedList",
              "|",
              "bulletedList",
              "|",
              "imageUpload",
              "|",
              "mathType",
              "|",
              "chemType",
            ]
          : [],
        removePlugins: ["EasyImage"],
        ckfinder: {
          // Upload the images to the server using the CKFinder QuickUpload command
          uploadUrl: `${API_BASE_URL}/${API_VERSION}/aws/upload-file-with-token/test?base64=0&token=${getLocalStorage(
            "gradelyAuthToken"
          )}`,
        },
      };
    },
  },

  watch: {
    content: {
      handler(update) {
        this.$emit("input", { name: this.name, value: update });
        if (!this.isReady) return;
        this.value = update;
      },
      immediate: true,
    },

    value: {
      handler(update) {
        this.$emit("input", { name: this.name, value: update });
        if (!this.isReady) return;
        this.value = update;
      },
      immediate: true,
    },
  },
  methods: {
    handle_ready() {
      this.value = this.content;
      this.isReady = true;
    },

    handle_input(event) {
      // console.log("some inner inner input", event);
    },
  },
  data() {
    return {
      value: this.content,
      editor: ClassicEditor,
      editorConfig: {
        math: {
          engine: "mathjax", // or katex or function. E.g. (equation, element, display) => { ... }
          lazyLoad: undefined, // async () => { ... }, called once before rendering first equation if engine doesn't exist. After resolving promise, plugin renders equations.
          outputType: "script", // or span
          forceOutputType: false, // forces output to use outputType
          enablePreview: true, // Enable preview view
          previewClassName: [], // Class names to add to previews
          popupClassName: [], // Class names to add to math popup balloon
        },
        height: "130px",
        autoGrow_minHeight: "40",
        fontSize_sizes: "14.5px",
        toolbar: [
          "bold",
          "|",
          "italic",
          "|",
          "link",
          "|",
          "undo",
          "|",
          "redo",
          "|",
          "numberedList",
          "|",
          "bulletedList",
          "|",
          "imageUpload",
          // "|",
          // "mathType",
          // "|",
          // "chemType",
        ],
        removePlugins: ["EasyImage"],
        ckfinder: {
          // Upload the images to the server using the CKFinder QuickUpload command.
          uploadUrl: `${API_BASE_URL}/${API_VERSION}/aws/upload-file-with-token/test?base64=0&token=${getLocalStorage(
            "gradelyAuthToken"
          )}`,
        },
      },
      isReady: false,
    };
  },

  mounted() {
    // this.value = this.content;
    // console.log(ClassicEditor.builtinPlugins);
  },
};
</script>

<style lang="scss">
.ck-editor__editable {
  min-height: var(--editor-height) !important;
}
</style>

<style>
/* div.wrs_tickContainer {
  display: none !important;
  z-index: -99 !important;
} */
</style>
