<template>
  <div></div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "LiveRedirect",

  mounted() {
    this.$bus.$emit("show_loader", "Redirecting to live class");
    this.$route?.query?.session_name ? this.goToClass() : this.joinClass();
  },

  methods: {
    ...mapActions({
      joinClassAsGuest: "dbFeeds/joinClassAsGues",
      attendLiveClass: "dbFeeds/attendLiveClass",
    }),

    joinClass() {
      this.joinClassAsGuest(this.$route.query.room_link)
        .then((response) => {
          this.$bus.$emit("hide_loader");
          if (response.code === 200) {
            location.href = response.data;
          } else {
            this.$router.push({ name: "GradelyLogin" });
          }
        })
        .catch((err) => {
          this.$bus.$emit("hide_loader");
          this.$router.push({ name: "GradelyLogin" });
          console.log("error redirecting to live class", err);
        });
    },

    goToClass() {
      let payload = JSON.parse(localStorage.getItem("authUser"));
      let data = {
        class_name: this.$route.query.session_name,
        name: payload?.full_name,
        image: payload?.image || "",
        user_id: payload?.id,
        is_tutor: 1,
      };

      this.attendLiveClass(data)
        .then((response) => {
          this.$bus.$emit("hide_loader");
          // console.log("JOIN TUTOR RESPONSE>>>", response);
          if (response?.title) {
            this.$bus.$emit("show_alert", {
              message: response?.title || "Class doesn't exist",
              type: "error",
            });

            setTimeout(() => {
              location.href = response?.url;
            }, 1500);
          } else if (response?.includes("http")) {
            location.href = response;
            return;
          } else if (response?.code === 200) {
            location.href = response?.data;
          } else {
            this.$router.push({ name: "GradelyLogin" });
          }
        })
        .catch((err) => {
          this.$bus.$emit("hide_loader");
          // this.$router.push({ name: "GradelyLogin" });
          console.log("error redirecting to live class", err);
        });
    },
  },
};
</script>

<style></style>
