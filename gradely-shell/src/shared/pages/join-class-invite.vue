<template>
  <div>Please wait...</div>
</template>

<script>
import { mapActions } from "vuex";
import { LANDER_URL } from "@/env";

export default {
  name: "joinClassInvite",

  computed: {
    generateSignupURL() {
      let type = Object.entries(this.$route.query)[0][0];
      let url = this.env === "development" ? LANDER_URL.dev : LANDER_URL.prod;
      let redirect_query = `?redirect=${this.domain_url}`;

      if (type === "s") return `${url}${this.student}${redirect_query}`;
      else if (type === "t") return `${url}${this.teacher}${redirect_query}`;
      else url;
    },
  },

  data() {
    return {
      env: process.env.NODE_ENV,
      domain_url: window.location.href,
      student: "/signup-student",
      teacher: "/signup-teacher",
    };
  },

  mounted() {
    this.validateUser();
  },

  methods: {
    ...mapActions({
      logoutUser: "auth/logoutUser",
    }),

    async validateUser() {
      if (!["teacher", "student"].includes(this.getAuthType)) {
        await this.logoutUser(false);
        localStorage.clear();
        location.href = this.generateSignupURL;
        return;
      }

      if (this.getAuthToken) {
        localStorage.setItem(
          "class_invite_code",
          Object.entries(this.$route.query)[0][1]
        );
        this.$router.push({
          name: "GradelyFeeds",
          params: {
            id: this.getAuthType === "student" ? this.getAuthUser.id : 0,
          },
          query: { class_invite: Object.entries(this.$route.query)[0][1] },
        });
      } else {
        location.href = this.generateSignupURL;
      }
    },
  },
};
</script>

<style></style>
