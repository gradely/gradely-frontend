<template>
  <div class="page-layout">
    <div class="gfont-20 white-text font-weight-600" v-if="!show_feedback">
      Please wait...
    </div>

    <div class="modal-wrapper" v-if="show_feedback">
      <div class="modal-cover-body central-placement mgt-10">
        <div class="top-row">
          <img
            v-lazy="mxStaticImg('LiveClassIcon.svg', 'base')"
            alt
            class="w-100 h-100"
          />
        </div>

        <div
          class="title-text color-text text-center mgt-15 mgb-5"
          ref="classMsg"
        >
          Failed To Join Live Class
        </div>

        <div class="gfont-13 text-center color-ash mgt-10">
          {{ feedback_message }}
        </div>
      </div>

      <div
        class="
          modal-cover-footer
          d-flex
          flex-column
          justify-content-start
          align-items-center
          mgb-20
        "
      >
        <button
          class="btn modal-btn btn-soft-accent mgb-15"
          ref="retry"
          @click="joinClass"
        >
          Retry
        </button>

        <router-link
          v-if="getAuthType == 'school'"
          :to="{ name: ' DashboardHome' }"
          class="btn modal-btn btn-soft-grey"
          >Home</router-link
        >

        <router-link
          v-else
          :to="{ name: 'GradelyFeeds', params: { id: getUserID } }"
          class="btn modal-btn btn-soft-grey"
          >Go to Feeds</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { LOGIN_URL } from "@/env";
import { mapActions } from "vuex";

export default {
  name: "joinClassInvite",

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
      show_feedback: false,
      feedback_message: "",
    };
  },

  mounted() {
    this.validateUser();
  },

  methods: {
    ...mapActions({
      getLiveClassRandomLink: "dbFeeds/getLiveClassRandomLink",
    }),

    async validateUser() {
      if (this.getAuthToken) {
        await this.joinLiveClassLink();
      } else {
        location.href = this.generateLoginURL;
      }
    },

    async joinLiveClassLink() {
      let token = this.$route.params.token;
      try {
        let response = await this.getLiveClassRandomLink(token);
        if (response.code === 200) {
          location.href = response.data;
        } else {
          this.feedback_message = response?.message || response?.data?.message;
          this.show_feedback = true;
        }
      } catch (err) {
        this.show_feedback = true;
        console.log("error joining class", err);
      }
    },

    async joinClass() {
      this.feedback_message = "";
      this.handleClick("retry", "Joining class...");
      try {
        await this.joinLiveClassLink();
        this.handleClick("retry", "retry", false);
      } catch (err) {
        this.handleClick("retry", "retry", false);
        console.log("error joining class", err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page-layout {
  @include flex-row-center-nowrap;
  background: rgba(0, 0, 0, 0.85);
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
