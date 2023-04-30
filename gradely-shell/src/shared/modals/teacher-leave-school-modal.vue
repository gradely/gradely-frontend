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
          <img
            v-lazy="mxStaticImg('Disconnect.png')"
            alt=""
            class="w-100 h-100"
          />
        </div>

        <!-- TITLE  -->
        <div class="title-text brand-navy font-weight-700 mgt-20 mgb-15">
          Disconnect From School
        </div>

        <div class="info-text color-ash text-center mgb-3">
          You about to disconnect from
          <span class="font-weight-600">{{school_name}}</span>. You will no
          longer be able to access any record or classes from this school.
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div
        class="
          modal-cover-footer
          d-flex
          flex-column
          align-items-center
          justify-content-center
          mgb-15
        "
      >
        <button
          class="btn modal-btn btn-soft-tonic mgb-17"
          ref="unlinkBtn"
          @click="leaveSchool"
        >
          Yes, Disconnect from School
        </button>

        <button
          class="btn modal-btn btn-soft-grey"
          @click="$emit('closeTriggered')"
        >
          No, Remain In School
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "teacherLeaveSchoolModal",

  components: {
    modalCover,
  },

  props: {
    school_id: Number,
    school_name: String,
  },

  computed: {
    isDisabled() {
      return this.validation_input === "leave school" ? false : true;
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
    ...mapActions({ teacherLeaveSchool: "general/teacherLeaveSchool" }),

    leaveSchool() {
      this.handleClick("unlinkBtn", "Disconnecting...");

      this.teacherLeaveSchool(this.school_id)
        .then((response) => {
          this.handleClick("unlinkBtn", "Yes, Disconnect from School", false);

          if (response.code === 200) {
            this.pushAlert("Successfully disconnected from school", "success");
            location.href = "/feed/0";
          } else {
            this.pushAlert("Unable to leave school", "warning");
          }
        })
        .catch(() =>
          this.pushAlert("An error occured while leaving school", "error")
        );
    },
  },
};
</script>

<style lang="scss" scoped></style>
