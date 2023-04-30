<template>
  <div></div>
</template>

<script>
import { LOGIN_URL } from "@/env";

export default {
  name: "falseLogin",

  computed: {
    hasRedirect() {
      return this.$route?.query?.redirect ?? false;
    },
  },

  data: () => ({
    env: process.env.NODE_ENV,
  }),

  created() {
    location.href = this.routeToLogin();
  },

  methods: {
    routeToLogin() {
      let url = this.env === "development" ? LOGIN_URL.dev : LOGIN_URL.prod;
      return this.hasRedirect ? `${url}?redirect=${this.hasRedirect}` : url;
    },
  },
};
</script>
