<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">
          Update Details
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <!-- CLASS TITLE  -->
        <div class="form-group compact-row w-100">
          <label for="classTitle" class="label-compact label-sm"
            >Class Title
          </label>
          <input
            type="text"
            id="classTitle"
            class="form-control"
            v-model="form.title"
            required
          />
        </div>

        <!-- SUBJECT -->
        <div class="form-group compact-row w-100">
          <label for="subject" class="label-compact label-sm">Subject</label>
          <select id="subject" class="form-control" v-model="form.subject_id">
            <option
              :value="subject.id"
              v-for="(subject, index) in subject_list"
              :key="index"
              >{{ subject.name }}</option
            >
          </select>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-center mgb-10">
        <button
          class="btn modal-btn btn-soft-accent mgl-10"
          :disabled="isDisabled"
          ref="updateBtn"
          @click="updateClass"
        >
          Save Changes
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "updateLiveClassModal",

  components: {
    modalCover,
  },

  props: {
    post: {
      type: Object,
    },
  },

  computed: {
    ...mapGetters({
      getTeacherSubjectList: "general/getTeacherSubjectList",
    }),

    isDisabled() {
      return this.form.title && this.form.subject_id ? false : true;
    },
  },

  watch: {
    getTeacherSubjectList: {
      handler(value) {
        this.loadTeacherSubject(value);
      },
      immediate: true,
    },
  },

  data() {
    return {
      form: {
        title: this.post?.reference.title,
        subject_id: this.post?.reference.subject_id,
      },

      subject_list: [],
    };
  },

  methods: {
    ...mapActions({
      updateLiveClass: "dbFeeds/updateLiveClass",
    }),

    // LOAD NEW SUBJECT SETUP
    loadTeacherSubject(subjects) {
      subjects.map((subject) => {
        this.subject_list.push({
          id: subject.subject_id,
          name: subject.name,
        });
      });
    },

    updateClass() {
      this.handleClick("updateBtn", "Saving...");

      let payload = {
        session_id: this.post?.reference?.id,
        payload: this.form,
      };

      this.updateLiveClass(payload)
        .then((response) => {
          this.handleClick("updateBtn", "Save Changes", false);

          if (response.code === 200) {
            this.pushAlert("Live class updated successfully!", "success");
            this.$bus.$emit("reloadFeeds");
            this.$bus.$emit("reloadUpcoming");

            this.$emit("closeTriggered");
          } else this.pushAlert("Live class update failed!", "warning");
        })
        .catch((err) => {
          console.log(err);
          this.handleClick("updateBtn", "Save Changes", false);
          this.pushAlert("Live class update failed!", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-group {
  margin-top: toRem(12);
  margin-bottom: toRem(30);

  .form-control {
    font-size: toRem(12.5);
  }
}

.modal-cover-footer {
  margin-top: toRem(-30);
  margin-bottom: toRem(10);

  @include breakpoint-custom-down(340) {
    margin-top: toRem(-45);
  }
}
</style>
