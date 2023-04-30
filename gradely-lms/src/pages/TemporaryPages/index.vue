<template>
  <modal-cover @closeModal="$emit('closeTriggered')" :show_close_btn="true">
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase"></div>
        <div class="modal-cover-meta">
          Create Assesment
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
        <div class="class-id">
          <label for="title-input">Class Id</label>
          <input class="homework-title" v-model="class_id" type="number" />
        </div>
        <div class="duration-center">
          <div class="duration-input left">
            <label for="duration-input">open date</label>
            <input
              class="date-input"
              type="datetime-local"
              placeholder="Start date"
              v-model="open_date"
            />
          </div>
          <div class="duration-input right">
            <label for="duration-input">close date</label>
            <input
              class="date-input"
              type="datetime-local"
              placeholder="Start date"
              v-model="close_date"
            />
          </div>
        </div>
        <div class="selector-footer">
          <div class="select-wrapper left">
            <label for="select-dropdown">Subject</label>
            <select name="select" v-model="subject_id" id="select-dropdown">
              <option value="1">Mathematics</option>
              <option value="2">English</option>
            </select>
          </div>
          <div class="select-wrapper right">
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
          @click="createHomeWork"
          :disabled="
            GET_IS_LOADING ||
              disabled ||
              !title ||
              !tag ||
              !open_date ||
              !close_date ||
              !class_id
          "
          class="btn-accent btn"
        >
          <span
            v-if="GET_IS_LOADING"
            class="icon-dotted-roller font-17 mr-2 animate"
          ></span>
          <span class="text">
            Create Assesment
          </span>
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import ModalCover from "@/components/ModalComps/ModalCover";
import {
  CREATE_HOME_WORK,
  GET_HOME_WORK,
  GET_IS_LOADING
} from "./store.module.CreateHomework/constant";
import { mapActions, mapGetters } from "vuex";
import { TOAST_ACTION } from "../../components/SideNotificationSnack/store.module/constants";
import { removeLocalStorage } from "../../services/localStorageMgt";
export default {
  name: "AssesmentPublishModal",
  data() {
    return {
      title: "",
      tag: "homework",
      tags: ["homework", "exam", "quiz"],
      disabled: false,
      open_date: "",
      close_date: "",
      subject_id: "1",
      class_id: 1469,
      is_proctor: 0,
      selected_student: 0,
      selected_student_id: [],
      view_by: "class"
    };
  },

  components: {
    ModalCover
  },
  props: {
    currentTag: {
      type: String,
      default: "homework"
    }
  },
  methods: {
    ...mapActions([CREATE_HOME_WORK, TOAST_ACTION]),
    async createHomeWork() {
      await this[CREATE_HOME_WORK]({
        title: this.title,
        tag: this.tag,
        open_date: this.open_date,
        close_date: this.close_date,
        subject_id: this.subject_id,
        class_id: this.class_id,
        is_proctor: this.is_proctor,
        selected_student: this.selected_student,
        view_by: this.view_by,
        selected_student_id: this.selected_student_id
      });
    }
  },
  computed: {
    ...mapGetters([GET_HOME_WORK, GET_IS_LOADING])
  },
  mounted() {
    if (process.env.NODE_ENV === "production") {
      window.location = `${window.location.origin}/teacher/homework`;
    } else {
      removeLocalStorage("savedHomeWork");
    }
  },
  watch: {
    GET_HOME_WORK() {
      this.disabled = true;
      this.TOAST_ACTION({
        toastData: {
          toastOpen: true,
          toastText: "Homework Created",
          toastState: "success"
        },
        timeout: 3000,
        callback: () => {
          window.location = `${window.location.origin}/lms/select-question/${this[GET_HOME_WORK]?.id}`;
        }
      });
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
  width: 100%;

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
.duration-center {
  display: flex;
  @include breakpoint-custom-down(570) {
    flex-direction: column;
  }
  .duration-input {
    flex: 50%;
  }
}
.left {
  margin-right: 10px;
  @include breakpoint-custom-down(570) {
    margin-right: 0px;
  }
}
.right {
  @include breakpoint-custom-down(570) {
    margin-left: 0px;
  }
}

.date-input {
  width: 100%;
}
</style>
