<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-small' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-center brand-navy">Add a Class</div>

        <!-- TAB -->
        <div class="d-flex justify-content-center">
          <div class="onboading-tab-switcher rounded-18 white-text-bg border">
            <div
              class="tab"
              :class="{ 'active-tab': tab.active }"
              v-for="(tab, index) in tabs"
              :key="index"
              @click="switchTab(index)"
            >
              {{ tab.title }}
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body pdb-0">
        <teacher-connect-class v-if="tabs[0].active" />
        <teacher-create-class v-if="tabs[1].active" />
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer"> </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";
import teacherConnectClass from "@/shared/components/manage-class-comps/teacher-connect-class";
import teacherCreateClass from "@/shared/components/manage-class-comps/teacher-create-class";

export default {
  name: "teacherAddClassModal",

  components: {
    modalCover,
    teacherConnectClass,
    teacherCreateClass,
  },

  data: () => ({
    tabs: [
      {
        title: "Use Class Code",
        active: true,
      },
      {
        title: "Create a Class",
        active: false,
      },
    ],
  }),

  methods: {
    switchTab(index) {
      this.tabs.map((tab) => (tab.active = false));
      this.tabs[index].active = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-title {
  @include font-height(18, 24);
  margin: toRem(10) auto toRem(26);

  @include breakpoint-down(sm) {
    @include font-height(17.25, 22);
    margin: toRem(10) auto toRem(22);
  }
}

.modal-cover-body {
  margin-top: toRem(-10);
}
</style>
