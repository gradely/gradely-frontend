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
          Remove Child Profile
        </div>

        <div class="info-text color-ash text-center mgb-10">
          You will no longer be able to access this child's record.
        </div>

        <div class="info-text color-ash text-center mgb-5">
          To confirm, enter the following text below <br />
          <span class="font-weight-600"> “Remove {{ child.full_name }} </span>
        </div>
        <!-- VALUE CONFIRMATION FORM  -->
        <input
          type="text"
          ref="valueEntryInput"
          v-model="validation_input"
          :placeholder="'Remove ' + child.full_name"
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
          @click="unlinkChild"
        >
          Remove Child
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "unlinkChildAccountModal",

  components: {
    modalCover,
  },

  props: {
    child: {
      type: Object,
    },
  },

  computed: {
    isDisabled() {
      return this.validation_input === `Remove ${this.child.full_name}`
        ? false
        : true;
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
    ...mapActions({ unlinkChildAccount: "general/unlinkChildAccount" }),

    unlinkChild() {
      this.handleClick("unlinkBtn", "Removing...");

      this.unlinkChildAccount(this.child.id)
        .then((response) => {
          this.handleClick("unlinkBtn", "Remove Child", false);

          if (response.code === 200) {
            this.pushAlert("Child removed successfully!", "success");
            setTimeout(() => (location.href = "/"), 2000);
          } else {
            this.pushAlert("Child was not removed", "warning");
          }
        })
        .catch(() => {
          this.handleClick("unlinkBtn", "Remove Child", false);
          this.pushAlert("An error occured while removing child", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
