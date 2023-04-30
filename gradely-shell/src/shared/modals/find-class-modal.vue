<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-mini' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title">
          FIND CLASS
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body mgt-5">
        <!-- INTRO TEXT  -->
        <div class="intro-text color-grey-dark mgb-30">
          We are sorry for the mixup. Use the form below to find your school and
          class.
        </div>

        <!-- FORM AREA -->
        <div class="form-area mgt-5 mgb--10">
          <div class="form-group compact-row w-100">
            <label for="schoolName" class="label-compact label-sm"
              >Find your School</label
            >
            <input
              type="text"
              class="form-control"
              id="schoolName"
              required
              placeholder="Enter the name of your school"
            />
          </div>

          <div class="form-group compact-row w-100">
            <label for="helpText" class="label-compact label-sm"
              >Select Class
            </label>
            <select class="form-control" id="helpText" required>
              <option selected>JSS 1 - Silver </option>
              <option>JSS 1 - Gold </option>
              <option>JSS 2 - Gold </option>
              <option>JSS 3 - Diamond </option>
            </select>
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-center mgb-10">
        <button
          class="btn transparent-bg no-shadow color-text mgr-10"
          @click="$emit('closeTriggered')"
        >
          Cancel
        </button>

        <button class="btn btn-accent mgl-10">
          Join Class
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "findClassModal",

  components: {
    modalCover,
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  @include breakpoint-down(xs) {
    padding: toRem(10) toRem(12);
  }

  .intro-text {
    @include font-height(12.85, 20);

    @include breakpoint-down(sm) {
      @include font-height(12.5, 21);
    }
  }
}

.modal-cover-footer {
  margin-top: toRem(-20);
}
</style>
