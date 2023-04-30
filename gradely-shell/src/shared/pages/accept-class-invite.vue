<template>
  <div class="page-layout">
    <template v-if="invitationAllowed">
      <div class="gfont-20 white-text font-weight-600">Please wait...</div>
    </template>

    <template v-else>
      <div class="flex-column soft-black">
        <div class="gfont-16 mgb-10">
          The invitation link is only accessible to a parent account.
        </div>

        <div class="gfont-15 text-center">
          Logging out in... {{ logout_countdown }}
        </div>
      </div>
    </template>

    <class-invitation-auth-check v-if="false" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { LOGIN_URL } from "@/env";
import classInvitationAuthCheck from "@/shared/modals/classInvitationAuthCheck";

export default {
  name: "JoinClassInvite",

  components: {
    classInvitationAuthCheck,
  },

  computed: {
    invitationAllowed() {
      return this.getAuthToken && this.getAuthType === "parent" ? true : false;
    },

    reAuthenticate() {
      return this.getAuthToken && this.getAuthType !== "parent";
    },

    generateLoginURL() {
      let url = this.env === "development" ? LOGIN_URL.dev : LOGIN_URL.prod;
      let redirect_query = `?redirect=${this.domain_url}`;
      return url + redirect_query;
    },
  },

  // watch: {
  //   reAuthenticate: {
  //     async handler(status) {
  //       if (status) {
  //         await this.logoutUser(false);
  //         localStorage.clear();
  //         location.href = this.generateLoginURL;
  //       }
  //     },
  //     immediate: true,
  //   },
  // },

  data() {
    return {
      env: process.env.NODE_ENV,
      domain_url: window.location.href,
      logout_countdown: 0,
    };
  },

  mounted() {
    this.validateUser();
  },

  methods: {
    ...mapActions({
      classInviteDetails: "invites/classInviteDetails",
      logoutUser: "auth/logoutUser",
    }),

    async startCountdown(count) {
      this.logout_countdown = count;
      const intervalCall = setInterval(() => {
        this.logout_countdown -= 1;

        if (this.logout_countdown === 0) {
          clearInterval(intervalCall);
          this.logUserOut();
        }
      }, 1000);
    },

    async logUserOut() {
      await this.logoutUser(false);
      localStorage.clear();
      location.href = this.generateLoginURL;
    },

    async validateUser() {
      if (this.getAuthToken) {
        if (!this.invitationAllowed) {
          this.startCountdown(3);
        } else {
          let { code, data } = await this.classInviteDetails(
            this.$route.params.token
          );

          code === 200
            ? this.redirectToAddChild(data)
            : this.pushAlert(
                "Failed to process invite. Please reload",
                "warning"
              );
        }
      } else {
        location.href = this.generateLoginURL;
      }
    },

    redirectToAddChild({
      class_name,
      school_name,
      school_logo,
      id,
      global_class_id,
      class_code,
    }) {
      let query = {
        class_name,
        school_name,
        school_logo,
        id,
        global_class_id,
        class_code,
      };

      this.$router.push({ name: "ParentAddChild", query });
    },
  },
};
</script>

<style lang="scss" scoped>
.page-layout {
  @include flex-row-center-nowrap;
  // background: rgba(0, 0, 0, 0.85);
  min-height: 100vh;
  width: 100%;
}

.modal-wrapper {
  width: toRem(350);
  max-width: 95%;
  background: $white-text;
  border-radius: toRem(14);
  padding: toRem(12);
}
</style>
