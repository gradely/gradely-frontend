<template>
  <div class="position-relative">
    <div
      class="weekly-default position-relative w-100 mgb-4 rounded-5"
      v-for="(_, index) in state_count"
      :key="index"
    >
      <!-- BLOCK ONE  -->
      <div class="block-one h-auto w-100">
        <div
          class="line-one mgb-5 rounded-5"
          :class="loading_state ? 'skeleton-loader' : 'border-grey-light-bg'"
        ></div>
        <div
          class="line-two rounded-5"
          :class="loading_state ? 'skeleton-loader' : 'border-grey-light-bg'"
        ></div>
      </div>

      <!-- BLOCK TWO  -->
      <div
        class="block-two rounded-5"
        :class="loading_state ? 'skeleton-loader' : 'border-grey-light-bg'"
      ></div>
    </div>

    <!-- EMPTY CONTENT STATE  -->
    <empty-content-state
      v-if="empty_state"
      title="No Activity Found"
      :content="empty_message"
      :extra_content="{ has_cta: true, btn_text: 'Invite a Teacher' }"
      @buttonClicked="toggleTeacherInvite"
    />

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_invite_teacher_modal">
        <invite-teachers-modal @closeTriggered="toggleTeacherInvite" />
      </transition>
    </portal>
  </div>
</template>

<script>
export default {
  name: "weeklyDefault",

  components: {
    inviteTeachersModal: () =>
      import(
        /* webpackChunkName: "inviteTeachersModal" */ "@/modules/dashboard/modals/invite-teachers-modal"
      ),
  },

  props: {
    empty_state: {
      type: Boolean,
      default: false,
    },
    loading_state: {
      type: Boolean,
      default: true,
    },
    empty_message: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    state_count: 7,
    show_invite_teacher_modal: false,
  }),

  methods: {
    toggleTeacherInvite() {
      this.show_assign_teacher_modal = false;
      this.show_invite_teacher_modal = !this.show_invite_teacher_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.weekly-default {
  background: rgba(#fff, 0.6);
  @include flex-row-between-nowrap;
  padding: toRem(10);

  .line-one {
    width: 50%;
    height: toRem(22);
  }

  .line-two {
    width: 30%;
    height: toRem(16);
  }

  .block-two {
    width: 15%;
    height: toRem(28);
  }
}
</style>
