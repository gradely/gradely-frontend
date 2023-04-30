<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body central-placement">
        <div class="top-row">
          <img v-lazy="mxStaticImg('Unlink.png')" alt="" class="w-100 h-100" />
        </div>

        <!-- TITLE  -->
        <div class="title-text brand-navy font-weight-700 mgt-20 mgb-15">
          Disconnect From Class
        </div>

        <div class="info-text color-ash text-center mgb-3">
          You will no longer be able to access this class record.
        </div>

        <div class="info-text color-ash text-center mgb-5">
          Enter <span class="font-weight-600"> leave class</span> below to
          confirm!
        </div>
        <!-- VALUE CONFIRMATION FORM  -->
        <input
          type="text"
          ref="valueEntryInput"
          v-model="validation_input"
          :placeholder="'leave class'"
          class="form-control text-center mgt-10 gfont-13"
        />
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-center mgb-10">
        <button
          class="btn modal-btn btn-accent"
          ref="unlinkBtn"
          :disabled="isDisabled"
          @click="leaveClass"
        >
          Leave Class
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "teacherLeaveClassModal",

  components: {
    modalCover,
  },

  props: {},

  computed: {
    isDisabled() {
      return this.validation_input === "leave class" ? false : true;
    },
  },

  data() {
    return {
      validation_input: "",
    };
  },

  mounted() {
    this.$refs.valueEntryInput.focus();
  },

  methods: {
    ...mapActions({ teacherLeaveClass: "general/teacherLeaveClass" }),

    leaveClass() {
      this.handleClick("unlinkBtn", "Leaving...");

      this.teacherLeaveClass(this.$route.params.id)
        .then((response) => {
          this.handleClick("unlinkBtn", "Leave Class", false);

          if (response.code === 200) {
            this.pushAlert("Class removal was successful", "success");
            location.href = "/feed/0";
          } else {
            this.pushAlert("Unable to leave class", "warning");
          }
        })
        .catch(() =>
          this.pushAlert("An error occured while leaving class", "error")
        );
    },
  },
};
</script>

<style lang="scss" scoped></style>
