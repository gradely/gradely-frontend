<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-small' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">Add Students</div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body mgt-12 pdt-5">
        <!-- CLASS SELECTION -->
        <div
          class="form-group compact-row w-100 mgb-15"
          v-if="!$route.params.id"
        >
          <label for="schoolPhone" class="label-compact label-sm color-text">
            Class to add students to
          </label>

          <select
            name="class"
            id="class"
            class="form-control"
            v-model="assigned_class"
          >
            <option value="" disabled>Select Class</option>
            <option
              :value="arm.id"
              v-for="(arm, index) in classes"
              :key="index"
            >
              {{ arm.name }}
            </option>
          </select>
        </div>

        <!-- TOP AREA  -->
        <div class="top-area">
          <label class="control-label color-text"
            >Invite students with
            <span class="font-weight-400">(Email or Phone)</span>
            <span
              class="
                icon-help-circle
                brand-inverse
                gfont-16
                position-relative
                pointer
              "
              style="top: 3px; left: 4px"
              title="Click the 'SPACE BAR' after contact entry"
            ></span>
          </label>

          <input-entry-card
            type="student"
            :class_id="class_id ? class_id : Number(processClassSelection.id)"
            :school_id="school_id"
            @close="$emit('closeTriggered')"
          />
        </div>

        <!-- BOTTOM AREA  -->
        <div
          class="bottom-area mgb-12 smooth-transition"
          v-if="class_code_state"
        >
          <div class="title-text color-ash mgb-6">
            Students can join with the class link.
          </div>

          <div class="class-link-section brand-navy-bg rounded-10">
            <div class="left">
              <div class="top mgb-4">Class Link</div>
              <div class="bottom color-white font-weight-700">
                {{ getInvitationLink }}
              </div>

              <input
                type="text"
                ref="invitationLink"
                :value="getInvitationLink"
                class="position-absolute index--9 ignore"
                style="opacity: 0"
              />
            </div>

            <div
              class="right rounded-20 pointer smooth-transition"
              @click="copyInvitationCode"
            >
              <div class="icon icon-copy brand-accent"></div>
              <div class="text brand-inverse-light">Copy</div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer"> </template>
  </modal-cover>
</template>

<script>
import { mapGetters } from "vuex";
import modalCover from "@/shared/components/modal-cover";
import inputEntryCard from "@/shared/components/input-entry-card";

export default {
  name: "inviteStudentsModal",

  components: {
    modalCover,
    inputEntryCard,
  },

  props: {
    class_id: {
      type: [String, Number],
      default: "",
    },

    school_id: {
      type: [String, Number],
      default: "",
    },

    class_code: {
      type: [String, Number],
      default: "",
    },

    classes: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    ...mapGetters({ getSelectedClass: "general/getSelectedClass" }),

    processClassSelection() {
      if (this.assigned_class) return this.setupClassData();
      else if (this.getSelectedClass) return this.getSelectedClass;
      else return false;
    },

    getClassCode() {
      return this.class_code_state ?? "";
    },

    getInvitationLink() {
      return `${this.domain_url}/j?s=${this.getClassCode}`;
    },
  },

  watch: {
    processClassSelection: {
      handler(value) {
        this.class_code_state = value?.class_code ?? "";
      },
      immediate: true,
    },
  },

  data() {
    return {
      assigned_class: "",
      class_code_state: this.class_code ?? "",
      domain_url: window.location.origin,
    };
  },

  methods: {
    setupClassData() {
      return this.classes.find(
        (item) => Number(item.id) === Number(this.assigned_class)
      );
    },

    copyInvitationCode() {
      let code_input = this.$refs.invitationLink;
      code_input.select();
      code_input.setSelectionRange(0, 99999); /*For mobile devices*/
      document.execCommand("copy");

      code_input.value
        ? this.pushAlert("Invitation link copied successfully", "success")
        : this.pushAlert("No invitation link available", "warning");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-header {
  position: relative;
}

.modal-cover-body {
  @include breakpoint-down(xs) {
    margin-top: toRem(-25);
  }

  .top-area {
    .control-label {
      @include font-height(11.5, 16);
      margin-bottom: toRem(6);
      font-weight: 600;

      span {
        @include font-height(11, 16);
      }
    }
  }

  .bottom-area {
    margin-top: toRem(-10);

    @include breakpoint-down(xs) {
      margin-top: toRem(12);
    }

    .title-text {
      @include font-height(12, 17);

      @include breakpoint-down(xs) {
        @include font-height(11.5, 17);
      }
    }

    .class-link-section {
      @include flex-row-between-nowrap;
      padding: toRem(12) toRem(14);

      @include breakpoint-down(xs) {
        padding: toRem(12);
      }

      .left {
        padding-right: toRem(5);

        .top {
          @include font-height(11.75, 16);
          color: rgba($white-text, 0.75);

          @include breakpoint-down(xs) {
            @include font-height(11.25, 16);
          }
        }

        .bottom {
          @include font-height(12.5, 17);

          @include breakpoint-down(xs) {
            @include font-height(11.75, 17.5);
          }
        }
      }

      .right {
        background: rgba($black-text, 0.4);
        @include flex-row-center-nowrap;
        padding: toRem(9) toRem(16);

        .icon {
          margin-right: toRem(8);
          font-size: toRem(15);
        }

        .text {
          position: relative;
          font-size: toRem(12.5);
          top: toRem(-1);
        }

        &:hover {
          background: rgba($black-text, 0.6);
        }
      }
    }
  }
}
</style>
