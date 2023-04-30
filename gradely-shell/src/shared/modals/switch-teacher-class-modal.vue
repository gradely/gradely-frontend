<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    :show_close_btn="true"
    :modal_style="{ size: 'modal-mini' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">My Classes</div>
        <div class="modal-cover-subtitle">
          Add, remove and switch your classes
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body position-relative smooth-transition">
        <template v-if="selections.length">
          <teacher-class-card
            v-for="(item, index) in selections"
            :key="index"
            :class_data="item"
            @closeModal="$emit('closeTriggered')"
          />
        </template>

        <template v-else>
          <class-select-skeleton
            :loading_state="loading"
            :empty_state="selections.length > 0 ? false : true"
          />

          <!-- NO INTERNET MODAL STATE -->
          <no-internet-on-modal v-if="noInternetFound" />
        </template>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer pdt-4">
        <div
          class="add-class rounded-15 mgt-5 mgb-10 smooth-transition pointer"
          @click="$emit('showAddClassModal')"
        >
          <div class="add-avatar rounded-circle mgr-12">
            <div class="icon icon-plus brand-navy"></div>
          </div>

          <div>
            <div class="title brand-navy font-weight-700 mgb-4">
              Add Another Class
            </div>
            <div class="sub-title color-grey-dark">
              Create or join an existing class
            </div>
          </div>
        </div>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "switchSchoolClassesModal",

  components: {
    modalCover,
    teacherClassCard: () => import("@/shared/components/teacher-class-card"),
    classSelectSkeleton: () =>
      import(
        /* webpackChunkName: "default" */ "@/shared/modals/class-select-skeleton"
      ),
    noInternetOnModal: () =>
      import(
        /* webpackChunkName: "default" */ "@/shared/components/no-internet-on-modal"
      ),
  },

  props: {
    teacher_classes: Array,
  },

  computed: {
    noInternetFound() {
      return !this.teacher_classes?.length && !navigator.onLine ? true : false;
    },
  },

  data: () => ({
    loading: false,
    empty_state: false,
    selections: [],
  }),

  watch: {
    teacher_classes: {
      handler(value) {
        console.log(value);
        this.selections = value?.length ? value : [];
      },
      immediate: true,
      deep: true,
    },
  },

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
.modal-cover-subtitle {
  @include font-height(12.45, 22);
  margin-top: toRem(2);
}

.modal-cover-body {
  min-height: 15vh;
  height: auto;
  max-height: 45vh;
}

.modal-cover-footer {
  .add-class {
    @include flex-row-start-nowrap;
    border: 1px solid #e5e5e5;
    padding: toRem(12.5) toRem(13.5);

    &:hover {
      transform: scale(1.02);
      box-shadow: 0 toRem(1) toRem(4) rgba($brand-black, 0.15);
    }

    .add-avatar {
      @include square-shape(44);
      background: $color-white;
      position: relative;

      .icon {
        @include center-placement;
        font-size: toRem(22);
      }
    }

    .title {
      @include font-height(13, 18);
    }

    .sub-title {
      @include font-height(11.5, 17);
    }
  }
}
</style>
