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
          <preview-video-lesson :featured_video="featured_video" />
        </div>
      </template>
    </modal-cover>
  </div>
</template>

<script>
export default {
  name: 'gameModal',

  components: {
    modalCover: () =>
      import(
        /* webchunkName: "modals" */ '@/components/global-comps/modal-cover.vue'
      ),
    PreviewVideoLesson: () =>
      import(
        /* webchunkName: "modals" */ '@/components/card-comps/preview-video-lesson.vue'
      ),
  },

  props: {
    featured_video: {},
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
