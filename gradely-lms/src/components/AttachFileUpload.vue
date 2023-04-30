<template>
  <div>
    <div class="description-meta">{{ meta_header }}</div>
    <div class="meta-description">{{ meta_description }}</div>
    <label class="input-file-label-wrapper" for="upload-file-elm-main"
      >Click here to attach your solution file</label
    >
    <input
      type="file"
      accept=".xlsx, .xls, .txt"
      class="upload-file-elm"
      id="upload-file-elm-main"
      @change="uploadImage"
      ref="upload-main"
    />
    <div v-if="show_meta" class="meta-txt">
      We accept PDF, JPG, and PNG files.
    </div>
  </div>
</template>

<script>
import { getTruncatedText } from "../services/stringMgt";

export default {
  name: "UploadFile",
  props: {
    meta_description: {
      type: String,
      default: "Accepts only excel file format (Not heavier than 2MB)"
    },
    show_meta: {
      type: Boolean,
      default: true
    },
    meta_header: {
      type: String,
      default: "ATTACH FILE"
    }
  },

  methods: {
    getTruncatedText,
    uploadImage($event) {
      this.$emit("change", $event);
    }
  }
};
</script>

<style lang="scss" scoped>
.input-file-label-wrapper {
  background: #fceacf;
  border: 1px solid #faa017;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 1rem;
  width: 100%;
  text-align: center;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  color: #113255;
  cursor: pointer;
}
.description-meta {
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  text-transform: uppercase;
  color: black;
}
.meta-description {
  font-weight: normal;
  font-size: 14px;
  line-height: 165%;
  display: flex;
  align-items: center;
  line-height: 1.8;
  color: #555555;
  margin: 0.35rem 0px;
}
.meta-txt {
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #757575;
}
.upload-file-elm {
  display: none;
}
</style>
