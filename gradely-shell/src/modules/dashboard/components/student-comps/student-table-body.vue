<template>
  <div
    @click="goToStudentProfile"
    class="student-table-body white-text-bg rounded-3 mgb-4 smooth-transition student-table-no-check pointer"
  >
    <!-- LABEL  -->
    <div
      class="label position-absolute h-100 brand-accent-bg smooth-transition"
    ></div>

    <!-- STUDENT INFO  -->
    <div class="column-one student-info">
      <!-- STUDENT IMAGE -->
      <div
        class="avatar"
        :class="student.student_image ? 'border-brand-inverse' : null"
      >
        <img
          v-lazy="student.student_image"
          :alt="$string.getStringInitials(getStudentFullname)"
          class="avatar-img"
          v-if="student.student_image"
        />

        <div
          class="avatar-text"
          v-else
          :class="$color.getProfileBgColor(getStudentFullname)"
        >
          {{ $string.getStringInitials(getStudentFullname) }}
        </div>
      </div>

      <!-- INFO  -->
      <div class="info">
        <router-link
          :to="{
            name: 'StudentProfile',
            params: { student_id: student.id },
            query: { name: getStudentFullname },
          }"
          class="name font-weight-600 color-text ignore"
        >
          {{ getStudentFullname }}
        </router-link>
        <div class="class-year color-ash">{{ student.class_name }}</div>
      </div>
    </div>

    <!-- PARENT INFO   -->
    <div class="column-two parent-info">
      <!-- HAS PARENT  -->
      <template v-if="getParentFullname">
        <div
          class="avatar"
          :class="student.parent_image ? 'border-brand-inverse' : null"
        >
          <img
            v-lazy="student.parent_image"
            alt=""
            class="avatar-img"
            v-if="student.parent_image"
          />
          <div
            v-else
            class="avatar-text"
            :class="$color.getProfileBgColor(getParentFullname)"
          >
            {{ $string.getStringInitials(getParentFullname) }}
          </div>
        </div>

        <div class="name color-text ignore" @click="toggleParentDetail">
          {{ getParentFullname }}
        </div>
      </template>

      <!-- NO PARENT  -->
      <template v-else>
        <div class="avatar empty-state">
          <div class="icon icon-student-user border-grey"></div>
        </div>

        <div class="name border-grey-dark">Not Joined</div>

        <!-- ADD PARENT  -->
        <div
          class="edit-parent position-relative hint--top hint--navy hint--small hint--rounded ignore"
          @click="toggleParentInvite"
          aria-label="Add parent"
        >
          <div
            class="icon icon-edit-pen smooth-transition pointer ignore"
          ></div>
        </div>
      </template>
    </div>

    <!-- subscription  -->
    <div class="column-three subscription">
      <!-- NOT DISABLED STATE  -->
      <template v-if="student.subscription_status">
        <div class="color-ash text-capitalize">
          {{ student.subscription_status }}
        </div>
      </template>

      <!-- DISABLED STATE  -->
      <template v-else>
        <div class="border-grey-dark">Disabled</div>
      </template>
    </div>

    <!-- options  -->
    <div class="column-four position-relative">
      <div
        class="avatar options pointer smooth-transition ignore"
        @click="toggleOptions"
        v-on-clickaway="hideOptions"
      >
        <div class="icon icon-ellipsis-h ignore"></div>
      </div>

      <!-- DROPDOWN  -->
      <div
        class="dropdown rounded-5 box-shadow-effect smooth-transition smooth-animation white-text-bg ignore"
        v-if="show_more_option"
      >
        <router-link
          :to="{
            name: 'StudentProfile',
            params: { student_id: student.id },
            query: { name: getStudentFullname },
          }"
          class="item ignore"
        >
          <div class="icon-cover ignore">
            <div class="icon icon-eye ignore"></div>
          </div>
          <div class="ignore">
            View Profile
          </div>
        </router-link>

        <div
          class="item ignore"
          @click="toggleParentDetail"
          v-if="getParentFullname"
        >
          <div class="icon-cover ignore">
            <div class="icon icon-parents ignore"></div>
          </div>
          <div class="ignore">
            View Parent Details
          </div>
        </div>

        <div class="item ignore" @click="toggleSubModification">
          <div class="icon-cover ignore">
            <div class="icon icon-discount ignore"></div>
          </div>
          <div class="ignore">
            Modify Subscription
          </div>
        </div>

        <div class="item ignore" @click="toggleRemoveStudent">
          <div class="icon-cover ignore">
            <div class="icon icon-trash ignore"></div>
          </div>
          <div class="ignore">
            Remove Student
          </div>
        </div>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_parent_detail_modal">
        <parent-detail-message-modal
          :parent="student"
          @closeTriggered="toggleParentDetail"
        />
      </transition>

      <transition name="fade" v-if="show_invite_parent_modal">
        <invite-parent-modal
          :school_id="getSchoolID"
          :class_id="getClassID"
          :relationship="getRelationship"
          :child="getStudentDetails"
          @closeTriggered="toggleParentInvite"
        />
      </transition>

      <transition name="fade" v-if="show_modify_sub_modal">
        <modify-subscription-modal
          :student="student"
          @closeTriggered="toggleSubModification"
        />
      </transition>

      <transition name="fade" v-if="show_remove_modal">
        <remove-student-modal
          :student="getStudentDetails"
          @closeTriggered="toggleRemoveStudent"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
export default {
  name: "studentTableBody",

  components: {
    parentDetailMessageModal: () =>
      import(
        /* webpackChunkName: "parentDetailModal" */ "@/modules/dashboard/modals/parent-detail-message-modal"
      ),
    inviteParentModal: () =>
      import(
        /* webpackChunkName: "inviteParentModal" */ "@/modules/dashboard/modals/invite-parent-modal"
      ),
    modifySubscriptionModal: () =>
      import(
        /* webpackChunkName: "modifySubscriptionModal" */ "@/modules/dashboard/modals/modify-subscription-modal"
      ),
    removeStudentModal: () =>
      import(
        /* webpackChunkName: "removeStudentModal" */ "@/modules/dashboard/modals/remove-student-modal"
      ),
  },

  computed: {
    getStudentFullname() {
      return this.student.student_firstname
        ? `${this.student.student_firstname} ${this.student.student_lastname}`
        : false;
    },

    getParentFullname() {
      return this.student.parent_firstname
        ? `${this.student.parent_firstname} ${this.student.parent_lastname}`
        : false;
    },

    getStudentDetails() {
      return {
        id: this.student.id,
        full_name: this.getStudentFullname,
        image: this.student.student_image,
        fullname: this.getStudentFullname,
        class_name: this.student.class_name,
      };
    },

    getRelationship() {
      if (this.getAuthType === "school") return "school proprietor";
      return "";
    },

    getSchoolID() {
      if (this.getAuthType === "school") return this.getAuthUser.school_id;
      return "";
    },

    getClassID() {
      return this.getAuthType === "teacher"
        ? this.$route.params.id
        : Number(this.student.class_id);
    },
  },

  props: {
    student: Object,
    default: () => ({
      id: 1,
      parent_id: 1,
      student_image: "",
      student_firstname: "Femi",
      student_lastname: "Ibiwoye",
      parent_image: "",
      parent_firstname: "Boye",
      parent_lastname: "Oshinaga",
      class_name: "Year 1 - Gold",
      subscription_status: null,
    }),
  },

  data: () => ({
    show_more_option: false,
    show_parent_detail_modal: false,
    show_invite_parent_modal: false,
    show_modify_sub_modal: false,
    show_remove_modal: false,
  }),

  methods: {
    goToStudentProfile($event) {
      if (!$event.target.classList.contains("ignore"))
        this.$router.push({
          name: "StudentProfile",
          params: { student_id: this.student.id },
          query: { name: this.getStudentFullname },
        });
    },

    toggleOptions() {
      this.show_more_option = !this.show_more_option;
    },

    hideOptions() {
      this.show_more_option = false;
    },

    toggleParentDetail() {
      this.show_parent_detail_modal = !this.show_parent_detail_modal;
    },

    toggleParentInvite() {
      this.show_invite_parent_modal = !this.show_invite_parent_modal;
    },

    toggleSubModification() {
      this.show_modify_sub_modal = !this.show_modify_sub_modal;
    },

    toggleRemoveStudent() {
      this.show_remove_modal = !this.show_remove_modal;
    },
  },
};
</script>

<style lang="scss" scoped></style>
