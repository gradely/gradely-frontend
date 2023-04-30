<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-small' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header mgt-0">
        <!-- HEADER CONTENT  -->
        <div class="header-content">
          <!-- CHILD AVATAR  -->
          <div class="avatar rounded-7 border-brand-inverse">
            <img
              v-lazy="mxStaticImg('One.png', 'onboarding')"
              alt=""
              class="avatar-img"
            />
          </div>

          <!-- CHILD NAME  -->
          <div class="child-name text-center white-text font-weight-600">
            Andrew Oshinaga
          </div>

          <!-- CHILD CLASS  -->
          <div class="child-class text-center border-grey-dark">
            Junior Secondary School 1
          </div>

          <!-- INFO  -->
          <div class="text-info text-center">
            This piece of content is assigned to Andrew Oshinaga. To access it,
            please switch to the child’s account.
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body" v-if="false"></template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer">
        <button class="btn btn-accent modal-btn">Use as Andrew</button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";
import inputEntryCard from "@/shared/components/input-entry-card";

export default {
  name: "inviteStudentsModal",

  components: {
    modalCover,
    inputEntryCard,
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-header {
  background: darken($brand-navy, 5%);
  position: relative;
  top: toRem(-3);

  .header-content {
    @include flex-column-center;
    padding: toRem(30) 0 toRem(40);

    @include breakpoint-down(sm) {
      padding: toRem(30) 0;
    }

    @include breakpoint-down(xs) {
      padding: toRem(20) 0 toRem(12);
    }

    .avatar {
      @include square-shape(92);
      margin-bottom: toRem(20);

      @include breakpoint-down(sm) {
        @include square-shape(86);
      }

      @include breakpoint-down(xs) {
        @include square-shape(80);
      }
    }

    .child-name {
      @include font-height(18, 25);
      margin-bottom: toRem(4);

      @include breakpoint-down(sm) {
        @include font-height(16, 22);
      }

      @include breakpoint-down(xs) {
        @include font-height(14.75, 20);
      }
    }

    .child-class {
      @include font-height(11, 15);
      margin-bottom: toRem(20);

      @include breakpoint-down(sm) {
        @include font-height(10.5, 14);
      }
    }

    .text-info {
      @include font-height(12, 21);
      color: #e5e5e5 !important;
      width: 80%;

      @include breakpoint-down(sm) {
        width: 85%;
      }

      @include breakpoint-down(xs) {
        @include font-height(11.25, 21);
        width: 94%;
      }
    }
  }
}

.modal-cover-footer {
  @include flex-row-center-nowrap;
  margin-bottom: toRem(12);
  margin-top: toRem(8);

  @include breakpoint-down(xs) {
    margin-bottom: toRem(8);
    margin-top: toRem(4);
  }

  .btn {
    padding: toRem(13) toRem(34);

    @include breakpoint-down(xs) {
      padding: toRem(13) toRem(30) !important;
      font-size: toRem(9.75) !important;
    }
  }
}
</style>
