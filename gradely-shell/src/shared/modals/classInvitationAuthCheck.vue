<template>
  <modal-cover
    @closeModal="declineClassInvite"
    :show_close_btn="true"
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header"></template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body pdb-0">
        <!-- TOP  -->
        <div class="top">
          <img v-lazy="mxStaticImg('book-illustrator.png')" alt="" />

          <div class="text text-center brand-navy">
            <p>Please sign in as a parent to accept this invitation</p>
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div
        class="
          modal-cover-footer
          d-flex
          justify-content-center
          pdt-0
          mgt-5
          mgb-7
        "
      >
        <template>
          <button
            class="btn modal-btn transparent-bg no-shadow color-text mgr-5"
            @click="declineClassInvite"
          >
            Decline
          </button>

          <button
            class="btn modal-btn btn-accent ml-5"
            ref="confirmBtn"
            @click="reGroup"
          >
            Sign in
          </button>
        </template>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { LOGIN_URL } from "@/env";
import modalCover from "@/shared/components/modal-cover";
import { mapActions } from "vuex";

export default {
  name: "acceptClassInviteModal",

  components: {
    modalCover,
  },

  computed: {
    generateLoginURL() {
      let url = this.env === "development" ? LOGIN_URL.dev : LOGIN_URL.prod;
      let redirect_query = `?redirect=${this.domain_url}`;
      return url + redirect_query;
    },

    getUserID() {
      return this.getAuthType === "student" ? this.getAuthUser?.id : 0;
    },
  },

  data() {
    return {
      env: process.env.NODE_ENV,
      domain_url: window.location.href,
    };
  },

  methods: {
    ...mapActions({
      logoutUser: "auth/logoutUser",
    }),

    async reGroup() {
      await this.logoutUser(false);
      localStorage.clear();
      location.href = this.generateLoginURL;
    },

    declineClassInvite() {
      if (this.getAuthType == "school")
        this.$router.push({ name: "DashboardHome" });
      else
        this.$router.push({
          name: "GradelyFeeds",
          params: { id: this.getUserID },
        });
      this.$emit("closeTriggered");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  .top {
    @include flex-column-start-center;

    img {
      @include square-shape(70);
      margin-top: toRem(30);
      margin-bottom: toRem(25);

      @include breakpoint-down(xs) {
        @include square-shape(65);
        margin-top: toRem(15);
      }
    }

    .text {
      @include font-height(13, 22);
      width: 90%;
    }
  }
}

.modal-cover-footer {
  margin-top: toRem(7);

  @include breakpoint-down(xs) {
    margin-top: toRem(-5) !important;
  }

  .btn {
    @include breakpoint-down(xs) {
      padding: toRem(14) toRem(36) !important;
    }
  }
}
</style>
