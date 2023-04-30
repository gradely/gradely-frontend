<template>
  <div class="teachers-listing-page index--9">
    <!-- CONTENT STATE  -->
    <template v-if="teachers.length">
      <div class="mx-auto">
        <member-teacher-card
          v-for="(teacher, index) in teachers"
          :key="index"
          :teacher="teacher"
        />
      </div>

      <!-- PAGING COMPONENT  -->
      <pagination
        v-if="pagination && pagination.pageCount > 1"
        :paging="pagination"
        @navigatePage="paginateData($event)"
      />
    </template>

    <!-- EMPTY STATE  -->
    <template v-else>
      <default-skeleton-loader
        :empty_state="empty"
        :loading_state="loading"
        :empty="{
          title: 'No teachers found!',
          message: 'It seems no teacher has been assigned to this class!',
        }"
        :cta="{
          has_cta: true,
          cta_text: 'Assign a Teacher',
        }"
        @handleClicked="toggleAssignTeacher"
      />
    </template>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_assign_teacher_modal">
        <assign-teacher-class-modal
          @closeTriggered="toggleAssignTeacher"
          @inviteTeacher="toggleTeacherInvite"
        />
      </transition>

      <transition name="fade" v-if="show_invite_teacher_modal">
        <invite-teachers-modal @closeTriggered="toggleTeacherInvite" />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import pagination from "@/shared/components/pagination";
import defaultSkeletonLoader from "@/shared/components/default-skeleton-loader";

export default {
  name: "membersTeachers",

  metaInfo: {
    title: "Teachers",
  },

  components: {
    pagination,
    defaultSkeletonLoader,
    memberTeacherCard: () =>
      import(
        /* memberTeacherCard */ "@/modules/base/components/member-comps/member-teacher-card"
      ),
    inviteTeachersModal: () =>
      import(
        /* inviteTeachersModal */ "@/modules/dashboard/modals/invite-teachers-modal"
      ),
    assignTeacherClassModal: () =>
      import(
        /* webpackChunkName: "assignTeacherClassModal" */ "@/modules/base/modals/members/assign-teacher-class-modal"
      ),
  },

  watch: {
    $route: {
      handler() {
        this.$nextTick(() => this.fetchAllMembers("teachers"));
      },
      immediate: true,
    },
  },

  created() {
    this.$bus.$on("reloadTeachersInClass", () => {
      this.fetchAllMembers("teachers");
    });
  },

  data: () => ({
    loading: false,
    empty: true,
    is_search: false,

    teachers: [],
    page: 1,
    pagination: {
      pageCount: 0,
    },

    show_invite_teacher_modal: false,
    show_assign_teacher_modal: false,
  }),

  methods: {
    ...mapActions({
      getMembers: "dbMembers/getMembers",
    }),

    // FETCH ALL MEMBERS
    fetchAllMembers(type) {
      this.activeMembersState(true, false);

      let payload = this.generateMembersPayload(type);

      this.getMembers(payload)
        .then((response) => {
          if (response.code === 200) {
            this.activeMembersState(
              false,
              false,
              response.data,
              response.pagination
            );
          }

          // EMPTY STATE
          else if (response.code === 204 || response.code === 406)
            this.activeMembersState();
          // ERROR STATE
          else this.handleErrorState();
        })
        .catch(() => this.handleErrorState());
    },

    // ERROR STATE
    handleErrorState() {
      this.$bus.$emit("show_response_alert", {
        message: "An error occured while loading members data",
        type: "error",
      });

      this.activeMembersState();
    },

    activeMembersState(loading = false, empty = true, data = [], paging = {}) {
      this.loading = loading;
      this.empty = empty;
      this.teachers = data;
      this.pagination = paging;

      setTimeout(() => {
        this.empty = !data.length ? true : false;
      }, 4000);
    },

    // GENERATE Members PAYLOAD
    generateMembersPayload(type) {
      return {
        page: this.page,
        class_id: this.$route.params.id,
        account: this.getAuthType,
        type,
        search: this.is_search,
      };
    },

    // PAGINATE MEMBERS DATA
    paginateData($event) {
      this.page = $event;
      this.is_search = true;
      this.fetchAllMembers("teachers");
    },
    toggleAssignTeacher() {
      this.show_assign_teacher_modal = !this.show_assign_teacher_modal;
    },

    toggleTeacherInvite() {
      this.show_assign_teacher_modal = false;
      this.show_invite_teacher_modal = !this.show_invite_teacher_modal;
    },
  },
};
</script>

<style lang="scss" scoped></style>
