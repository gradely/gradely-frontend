<template>
  <div>
    <div
      class="text-editor-section rounded-5"
      :class="basic ? 'min-height-100' : null"
    >
      <ckeditor
        v-if="action === 'edit'"
        :editor="editor"
        :config="editorConfig"
        v-model="editor_value"
      ></ckeditor>
      <ckeditor
        v-else
        :editor="editor"
        :config="editorConfig"
        v-model="value"
      ></ckeditor>
    </div>
  </div>
</template>

<script>
import { getLocalStorage } from "../scripts/localStorageMgt";
import ClassicEditor from "@gradely-editor/gradely-editor-build-classic";

export default {
  name: "TextEditor",

  props: {
    action: {
      type: String,
      default: "create"
    },
    content: String,
    basic: Boolean,
    name: String
  },

  computed: {
    editor_value: {
      set: function(val) {
        this.$emit("input", { name: this.name, value: val });
      },
      get: function() {
        return this.content;
      }
    }
  },

  watch: {
    content: {
      handler(update) {
        this.$emit("input", { name: this.name, value: update });
        this.value = update;
      },
      immediate: true
    },

    value: {
      handler(update) {
        this.$emit("input", { name: this.name, value: update });
        this.value = update;
      },
      immediate: true
    }
  },
  methods: {},
  data() {
    return {
      value: this.content,
      editor: ClassicEditor,
      editorConfig: {
        height: "130px",
        filebrowserBrowseUrl: "",
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
          "mathType",
          "|",
          "chemType",
          "|",
          "ImageUpload"
        ],
        removePlugins: ["EasyImage"],
        ckfinder: {
          // Upload the images to the server using the CKFinder QuickUpload command.
          uploadUrl: `https://testapi.gradely.ng/v2/aws/upload-file-with-token/test?base64=0&token=${getLocalStorage(
            "gradelyAuthToken"
          )}`
        }
      }
    };
  },

  mounted() {
    // this.value = this.content;
    // ClassicEditor.replace("editor1", {
    //   height: 300,
    //   // Configure your file manager integration. This example uses CKFinder 3 for PHP.
    //   filebrowserBrowseUrl: "/apps/ckfinder/3.4.5/ckfinder.html",
    //   filebrowserImageBrowseUrl:
    //     "/apps/ckfinder/3.4.5/ckfinder.html?type=Images",
    //   filebrowserUploadUrl:
    //     "/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files",
    //   filebrowserImageUploadUrl:
    //     "/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Images",
    //   removeButtons: "PasteFromWord"
    // });
  }
};
</script>

<style lang="scss">
.ck-editor__editable {
  min-height: 150px !important;
}
</style>
