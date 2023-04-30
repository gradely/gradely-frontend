<template>
  <modal-cover @closeModal="$emit('closeTriggered')" :show_close_btn="true">
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase"></div>
        <div class="modal-cover-meta">
          UPDATE ASSESMENT
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-body">
        <div class="assesment-header-collector">Assessment Type</div>
        <div class="tag-button-wrappers">
          <button
            v-for="singleTag in tags"
            :key="singleTag"
            :class="singleTag === tag ? 'active' : ''"
            class="btn"
            @click="tag = singleTag"
          >
            {{ singleTag }}
          </button>
        </div>
        <div class="assesment-title-input">
          <label for="title-input">Title</label>
          <input
            v-model="title"
            class="homework-title"
            type="text"
            id="title-input"
          />
        </div>
        <div v-if="false" class="selector-footer">
          <div class="duration-input">
            <label for="duration-input">Duration</label>
            <input type="text" id="duration-input" />
          </div>
          <div class="select-wrapper">
            <label for="select-dropdown">Assign To</label>
            <select name="select" id="select-dropdown">
              <option value="all">All Students</option>
              <option value="selected">Select Students</option>
            </select>
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-end">
        <button
          @click="handleAssesmentEdit"
          :disabled="disabled || !title"
          class="btn-accent btn"
        >
          <span
            v-if="disabled"
            class="icon-dotted-roller font-17 mr-2 animate"
          ></span>
          <span class="text">
            UPDATE DETAILS
          </span>
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import ModalCover from "@/components/ModalComps/ModalCover";
export default {
  name: "AssesmentPublishModal",
  data() {
    return {
      title: "",
      tag: "",
      tags: ["homework", "exam", "quiz"]
    };
  },

  components: {
    ModalCover
  },
  props: {
    assessmentTitle: {
      type: String,
      default: "Asessment"
    },
    buttonText: {
      type: String,
      default: "Return to Class"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    currentTag: {
      type: String,
      default: "homework"
    }
  },
  methods: {
    handleAssesmentEdit() {
      this.$emit("edit", {
        tag: this.tag,
        title: this.title
      });
    }
  },
  mounted() {
    this.title = this.assessmentTitle;
    this.tag = this.currentTag;
  },
  watch: {
    assessmentTitle() {
      this.title = this.assessmentTitle;
    },
    currentTag() {
      this.tag = this.currentTag;
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-cover-header {
  .modal-cover-meta {
    font-weight: bold;
    font-size: toRem(16);
    line-height: toRem(22);
    display: flex;
    align-items: center;
    text-transform: uppercase;
    color: #353535;
  }
}
.modal-body {
  .assesment-header-collector {
    font-weight: bold;
    font-size: toRem(14);
    line-height: toRem(19);
    @include flex-row-start-wrap;
    text-transform: uppercase;
    color: #757575;
  }
  .tag-button-wrappers {
    display: flex;
    margin-top: 1rem;
    .btn {
      color: #113255;
      background: none;
      border-radius: 35px;
      box-shadow: none;
      border: 1px solid transparent;
      margin: 5px;
      @include breakpoint-custom-down(370) {
        padding: 8px;
      }
    }
    .btn:hover {
      box-shadow: none;
    }
    .btn.active {
      color: #113255;
      background: #fceacf;
      border: 1px solid #faa017;
      box-sizing: border-box;
    }
  }
  .assesment-title-input {
    display: flex;
    flex-direction: column;
    .homework-title {
    }
  }
  .selector-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    @include breakpoint-custom-down(570) {
      flex-direction: column;
    }
    .duration-input {
      flex: 40%;
      @include breakpoint-custom-down(570) {
        flex: none;
        width: 100%;
      }
    }
    .select-wrapper {
      flex: 50%;
      @include breakpoint-custom-down(570) {
        flex: none;
        width: 100%;
      }
    }
  }
}
input,
select {
  background: #ffffff;
  border: 1px solid #d5d5d5;
  box-sizing: border-box;
  border-radius: 5px;
  color: #353535;
  padding: 0.5rem;
  @include breakpoint-custom-down(570) {
    width: 100%;
  }
}
select {
  width: 100%;
}
label {
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: #757575;
  margin-top: 2rem;
}
</style>
