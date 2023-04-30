<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    :show_close_btn="true"
    :modal_style="{ size: 'modal-md' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header pdb-0 mgb-0">
        <div class="modal-cover-title text-uppercase">
          Verify Teachers
        </div>

        <!-- TOP OPTIONS  -->
        <div class="top-options mgt-25 pdb-10">
          <!-- APPROVE  -->
          <div class="link approve-link brand-accent pointer mgr-25">
            <div class="avatar mgr-7">
              <div class="icon icon-accept brand-accent"></div>
            </div>

            <div class="text">Approve All</div>
          </div>

          <!-- DECLINE  -->
          <div class="link decline-link brand-tonic pointer">
            <div class="avatar mgr-7">
              <div class="icon icon-decline brand-tonic"></div>
            </div>

            <div class="text">Decline All</div>
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body pdb-15">
        <!-- CONTENT LIST  -->
        <template>
          <verify-teacher-card />
          <verify-teacher-card />
          <verify-teacher-card />
          <verify-teacher-card />
          <verify-teacher-card />
        </template>

        <template v-if="false">
          <invitation-skeleton />
          <invitation-skeleton />
          <invitation-skeleton />
        </template>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-end"></div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";
import verifyTeacherCard from "@/modules/dashboard/components/teacher-comps/verify-teacher-card";
import invitationSkeleton from "@/modules/dashboard/components/teacher-comps/invitation-skeleton";

export default {
  name: "verifyTeachersModal",

  components: {
    modalCover,
    verifyTeacherCard,
    invitationSkeleton,
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-header {
  @include breakpoint-down(xs) {
    padding-bottom: toRem(2) !important;
  }

  .top-options {
    @include flex-row-end-nowrap;
    border-bottom: toRem(1) solid $border-grey;

    @include breakpoint-down(md) {
      padding-bottom: toRem(3.5) !important;
    }

    .link {
      @include flex-row-end-nowrap;
      @include transition(0.3s);

      .avatar {
        @include square-shape(28);

        @include breakpoint-down(xs) {
          margin-right: toRem(3) !important;
        }

        .icon {
          @include transition(0.3s);
          @include center-placement;
          font-size: toRem(16);

          @include breakpoint-down(md) {
            font-size: toRem(14);
          }
        }
      }

      .text {
        @include font-height(12.5, 18);

        @include breakpoint-down(xs) {
          @include font-height(12, 17);
        }
      }

      &:hover {
        color: $brand-inverse !important;
        .icon {
          color: $brand-inverse !important;
        }
      }
    }

    .approve-link {
      @include breakpoint-down(xs) {
        margin-right: toRem(15) !important;
      }
    }

    .decline-link {
      .avatar {
        top: toRem(-0.5);

        @include breakpoint-down(lg) {
          top: 0;
        }

        @include breakpoint-down(md) {
          top: toRem(-0.5);
        }
      }
    }
  }
}
</style>
