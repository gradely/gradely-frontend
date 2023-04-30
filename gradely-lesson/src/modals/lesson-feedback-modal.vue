<template>
  <div>
    <modal-cover
      @closeModal="$emit('closeTriggered')"
      :show_close_btn="false"
      :modal_style="{ size: 'modal-large' }"
    >
      <!--  MODAL BODY  -->
      <template v-slot:modal-cover-body>
        <div class="modal-cover-body modal__body mb-0">
          <lesson-feedback />
        </div>
      </template>
    </modal-cover>
  </div>
</template>

<script>
export default {
  name: 'lessonFeedbackModal',

  components: {
    modalCover: () =>
      import(
        /* webchunkName: "modals" */ '@/components/global-comps/modal-cover.vue'
      ),
    LessonFeedback: () =>
      import(
        /* webchunkName: "modals" */ '@/components/card-comps/lesson-feedback.vue'
      ),
  },

  props: {},

  computed: {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.modal__body {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
