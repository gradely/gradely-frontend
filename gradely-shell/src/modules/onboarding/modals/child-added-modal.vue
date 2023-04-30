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
            v-lazy="mxStaticImg('NiceWork.png', 'onboarding')"
            alt="nice-work"
            class="w-100 h-100"
          />
        </div>

        <!-- TITLE  -->
        <div class="title-text brand-navy font-weight-700 mgt-20 mgb-15">
          Thank you for
          {{ add_type === "create" ? "adding" : "connecting with" }}
          <span class="font-weight-600">
            {{ child_name }}
          </span>
        </div>

        <div class="info-text color-ash text-center mgb-2 w-75">
          You can proceed to add another child right now or skip for later!
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer mgb-10">
        <router-link
          :to="{
            name: 'ParentAddChild',
            query: { ...$route.query, page: '/feed/0' },
          }"
          class="btn modal-btn btn-accent mgb-10"
          style="width: max-content"
          ref="removeBtn"
        >
          Add another Child
        </router-link>

        <router-link
          to="/"
          class="btn modal-btn transparent-bg no-shadow color-text"
          style="width: max-content"
        >
          Skip for later
        </router-link>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "childAddedModal",

  components: {
    modalCover,
  },

  props: {
    add_type: {
      type: String,
    },

    child_name: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-footer {
  @include flex-column-center;
}
</style>
