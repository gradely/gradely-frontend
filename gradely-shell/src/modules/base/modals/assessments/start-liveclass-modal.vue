<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-xxs' }"
  >
    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body central-placement">
        <div class="top-row">
          <img
            v-lazy="mxStaticImg('LiveClassIcon.svg', 'base')"
            alt=""
            class="w-100 h-100"
          />
        </div>

        <!-- TITLE  -->
        <div class="title-text brand-navy font-weight-700 mgt-20 mgb-15">
          Take your class live!
        </div>

        <div class="info-text color-ash text-center mgb-5" ref="classMsg">
          {{ getDisplayMessage }}
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div
        class="modal-cover-footer d-flex flex-column justify-content-start align-items-center mgb-20"
      >
        <router-link
          v-if="class_status === 'completed'"
          :to="{ name: 'GradelyFeeds', params: { id: $route.params.id } }"
          class="btn mgb-15"
        >
          Go to Feeds
        </router-link>

        <button
          class="btn mgb-15"
          v-else
          ref="classBtn"
          @click="handleButtonClick"
        >
          Initiating class
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "startLiveclassModal",

  components: {
    modalCover,
  },

  computed: {
    getDisplayMessage() {
      if (this.class_status === "completed") {
        return "Your live class session has ended!";
      } else {
        if (this.getAuthType === "school")
          return "Join this online class with your teacher and students";
        else if (this.getAuthType === "teacher") {
          return this.$route.query.host
            ? "Start an online class with your students"
            : "Join this online class with your teacher and students";
        } else if (["parent", "student"].includes(this.getAuthType))
          return "Join this online class with your teacher";
        else return false;
      }
    },
  },

  data() {
    return {
      class_url: "",
      class_status: "",
    };
  },

  mounted() {
    this.handleClick("classBtn", "Initiating class...");
    this.InitializeClass();
  },

  methods: {
    ...mapActions({
      startClass: "dbFeeds/startClass",
      joinClass: "dbFeeds/joinClass",
    }),

    handleButtonClick() {
      this.$route.query.host
        ? this.class_status === "ongoing"
          ? this.joinClassNow()
          : this.startClassNow()
        : this.joinClassNow();
    },

    // START LIVE CLASS NOW
    startClassNow() {
      this.handleClick("classBtn", "Starting class");

      this.startClass(this.$route?.query?.reference_id)
        .then((response) => {
          this.handleClick("classBtn", "Start Class Now", false);
          // console.log(response);

          response.code === 200
            ? (location.href = response.data)
            : this.pushAlert("Live class session failed to start", "error");
        })
        .catch(() => {
          this.handleClick("classBtn", "Start Class Now", false);
          this.pushAlert("Live class session failed to start", "error");
        });
    },

    joinClassNow() {
      this.handleClick("classBtn", "Joining class");
      setTimeout(() => (location.href = this.class_url), 1000);
    },

    // JOIN LIVE CLASS NOW
    InitializeClass() {
      let payload = {
        session_id: this.$route?.query?.reference_id,
        child_id: this.getAuthType === "parent" ? this.$route.params.id : null,
      };

      this.joinClass(payload)
        .then((response) => {
          // ONGOING CLASS
          if (response.code === 200) {
            this.class_url = response.data;
            this.class_status = "ongoing";

            this.handleClick("classBtn", "Join Class Now", false);
          }

          // CLASS CLOSED
          else if (response.message === "completed") {
            this.class_status = "completed";
            this.$refs.classBtn.disabled = true;
            this.$refs.classBtn.innerText = "Class Closed";
            this.pushAlert("Live class session has ended already!", "warning");
          }

          // CLASS PENDING
          else {
            this.$route.query.host
              ? this.handleClick("classBtn", "Start Class Now", false)
              : this.handleClick("classBtn", "Join Class Now", false);
          }
        })
        .catch(() => {
          this.$refs.classBtn.disabled = true;
          this.$refs.classBtn.innerText = "Class initiation failed!";
          this.pushAlert("Live class session failed to initiate", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-footer {
  .btn {
    border: toRem(1) solid $brand-accent;
    background: $brand-accent-light;
    padding: toRem(13) toRem(20);
    text-transform: unset;
    color: $brand-navy;
    width: 60%;

    &:hover {
      border: toRem(1) solid $brand-inverse;
      background: $brand-inverse-light;
    }
  }
}
</style>
