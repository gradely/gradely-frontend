<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-small' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">Invite Parent</div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body mgt--5">
        <child-info-modal-card :child="child" />

        <!-- TOP AREA  -->
        <div class="top-area">
          <label class="control-label color-text"
            >Invite parent with
            <span class="font-weight-400">(Email or Phone)</span>
          </label>

          <input-entry-card
            type="parent"
            :relationship="relationship"
            :class_id="class_id"
            :school_id="school_id"
            :child_id="child.id"
            @close="$emit('closeTriggered')"
          />
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-end"></div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";
import inputEntryCard from "@/shared/components/input-entry-card";
import childInfoModalCard from "@/modules/dashboard/modals/child-info-modal-card";

export default {
  name: "inviteParentModal",

  components: {
    modalCover,
    inputEntryCard,
    childInfoModalCard,
  },

  props: {
    child: {
      type: Object,
      default: () => ({
        id: "",
        image: "",
        fullname: "Blessing Fancy",
        class_name: "Year 7 - Gold",
      }),
    },

    relationship: {
      type: String,
      default: "school proprietor",
    },

    class_id: {
      type: [String, Number],
      default: "",
    },

    school_id: {
      type: [String, Number],
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.top-area {
  .control-label {
    @include font-height(12, 16);
    margin-bottom: toRem(6);
    font-weight: 600;

    span {
      @include font-height(11, 16);
    }
  }
}
</style>
