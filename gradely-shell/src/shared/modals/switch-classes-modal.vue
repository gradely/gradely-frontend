<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    :show_close_btn="true"
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">
          Switch Class
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <class-select-card
          v-for="(item, index) in class_list"
          :key="index"
          :index="index"
          :class_data="item"
          @classSelected="makeSelection($event)"
        />
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer"></div>
    </template>
  </modal-cover>
</template>

<script>
import { mapGetters } from "vuex";
import modalCover from "@/shared/components/modal-cover";
import classSelectCard from "@/shared/components/sidebar-comps/class-select-card";

export default {
  name: "switchClassesModal",

  components: {
    modalCover,
    classSelectCard,
  },

  computed: {
    ...mapGetters({
      getTeacherClasses: "general/getTeacherClassList",
    }),
  },

  watch: {
    "getTeacherClasses.classes": {
      handler(value) {
        this.class_list = value;
      },
      immediate: true,
    },
  },

  data: () => ({
    class_list: [],
  }),

  methods: {
    makeSelection(id) {
      this.$router
        .push({
          name: this.$router.currentRoute.name,
          params: { id },
        })
        .catch((error) => {
          if (error.name != "NavigationDuplicated") throw error;
        });
      this.$emit("closeTriggered");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  min-height: 10vh;
  height: auto;
  max-height: 44vh;
}
</style>
