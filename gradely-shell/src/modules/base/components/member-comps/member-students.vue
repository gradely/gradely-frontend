<template>
  <div class="students-listing-page index--9">
    <!-- CONTENT STATE  -->
    <template v-if="students.length">
      <div class="student-card-row mx-auto">
        <member-student-card v-for="(student, index) in students" :key="index" :student="student" />
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
      <div class="position-relative">
        <div class="student-card-row mx-auto">
          <members-student-skeleton :loading_state="loading" v-for="(_, index) in 8" :key="index" />
        </div>

        <empty-content-state
          v-if="empty_state"
          title="No Student Found"
          content="It seems no student has been invited to this class"
          :extra_content="{ has_cta: true, btn_text: 'Invite a Student' }"
          @buttonClicked="toggleInviteStudentModal"
        />
      </div>
    </template>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_invite_student_modal">
        <invite-students-modal
          :school_id="getSchoolID"
          :class_id="getClassID"
          @closeTriggered="toggleInviteStudentModal"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import addStudentCard from "@/modules/base/components/member-comps/add-student-card";
import pagination from "@/shared/components/pagination";
import membersStudentSkeleton from "@/modules/base/components/member-comps/members-student-skeleton";

export default {
  name: "membersStudents",

  metaInfo: {
    title: "Students",
  },

  components: {
    addStudentCard,
    pagination,
    membersStudentSkeleton,
    memberStudentCard: () =>
      import(
        /* memberStudentCard */ "@/modules/base/components/member-comps/member-student-card"
      ),
    inviteStudentsModal: () =>
      import(/* modal */ "@/modules/base/modals/members/invite-students-modal"),
  },

  computed: {
    ...mapGetters({ getSelectedClass: "general/getSelectedClass" }),

    getSchoolID() {
      if (this.getAuthType === "school")
        return Number(this.getAuthUser.school_id);
      if (this.getSelectedClass.school_id)
        return Number(this.getSelectedClass.school_id);
      return "";
    },

    getClassID() {
      if (this.getAuthType === "teacher") return this.$route.params.id;
      return "";
    },
  },

  watch: {
    $route: {
      handler() {
        this.$nextTick(() => this.fetchAllMembers("students"));
      },
      immediate: true,
    },
  },

  created() {
    this.$bus.$on("reloadStudentInClass", () => {
      this.fetchAllMembers("students");
    });
  },

  data: () => ({
    loading: true,
    empty_state: true,
    is_search: false,

    students: [],
    page: 1,
    pagination: {
      pageCount: 0,
    },

    show_invite_student_modal: false,
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
          console.log("students members", response);

          if (response.code === 200 && response.data) {
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
      // this.pushAlert("No class students available", "warning");
      this.activeMembersState();
    },

    activeMembersState(loading = false, empty = true, data = [], paging = {}) {
      this.loading = loading;
      this.empty_state = empty;
      this.students = data;
      this.pagination = paging;
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
      this.fetchAllMembers("students");
    },

    toggleInviteStudentModal() {
      this.show_invite_student_modal = !this.show_invite_student_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.students-listing-page {
  .student-card-row {
    position: relative;
    width: 101.5%;
    left: -0.6%;
    @include flex-row-start-wrap;
  }
}
</style>
