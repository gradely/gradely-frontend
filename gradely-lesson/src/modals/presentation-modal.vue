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
          <preview-presentation-lesson :featured_document="featured_document" />
        </div>
      </template>
    </modal-cover>
  </div>
</template>

<script>
export default {
  name: 'presentationModal',

  components: {
    modalCover: () =>
      import(
        /* webchunkName: "modals" */ '@/components/global-comps/modal-cover.vue'
      ),
    PreviewPresentationLesson: () =>
      import(
        /* webchunkName: "modals" */ '@/components/card-comps/preview-presentation-lesson.vue'
      ),
  },

  props: {
    featured_document: {},
  },

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
