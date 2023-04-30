<template>
  <div></div>
</template>

<script>
import { LANDER_URL } from "@/env";

export default {
  name: "falseBase",

  created() {
    if (localStorage.getItem("gradelyAuthToken")) {
      if (this.getAuthType === "school")
        this.$router.push({
          name: "DashboardHome",
        });
      else {
        this.$router.push({
          name: "GradelyFeeds",
          params: { id: this.$route.params.id || 0 },
        });
      }
    }
    // UNAUTHENTICATED
    else {
      location.href =
        this.environment === "development" ? LANDER_URL.dev : LANDER_URL.prod;
    }
  },
};
</script>

<style></style>
