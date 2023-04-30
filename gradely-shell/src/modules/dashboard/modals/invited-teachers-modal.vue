<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    :show_close_btn="true"
    :modal_style="{ size: 'modal-md' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">
          Sent Invitations
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body pdb-15">
        <template>
          <invited-teacher-card />
          <invited-teacher-card />
          <invited-teacher-card />
          <invited-teacher-card />
          <invited-teacher-card />
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
      <div class="modal-cover-footer"></div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";
import invitedTeacherCard from "@/modules/dashboard/components/teacher-comps/invited-teacher-card";
import invitationSkeleton from "@/modules/dashboard/components/teacher-comps/invitation-skeleton";

export default {
  name: "invitedTeachersModal",

  components: {
    modalCover,
    invitedTeacherCard,
    invitationSkeleton,
  },
};
</script>

<style lang="scss" scoped></style>
