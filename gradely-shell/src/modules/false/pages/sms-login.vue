<template>
  <div>Please wait...</div>
</template>

<script>
import { APP_BASE_URL } from "@/env";
import { mapActions } from "vuex";

export default {
  name: "SMSLogin",

  created() {
    this.loginUser();
  },

  methods: {
    ...mapActions({ loginUserByToken: "auth/loginUserByToken" }),

    async loginUser() {
      let token = this.$route.params.token;

      this.loginUserByToken(token)
        .then((response) => {
          if (response.code === 200) {
            // CHECK PATH
            if (this.$route.query.path) {
              // CHECK FOR MULTPLE QUERY PARAMS
              let paths = this.$route.query.path.split(";");

              if (paths.length > 1) {
                let url_base_path = paths[0];

                paths.map((path, index) => {
                  if (index !== 0) url_base_path += `&${path}`;
                });
                location.href = `${APP_BASE_URL}/${url_base_path}`;
              } else {
                location.href = `${APP_BASE_URL}/${this.$route.query.path}`;
              }
            } else {
              if (this.getAuthType === "school") this.$router.push(`/home`);
              else this.$router.push(`/feed/0`);
            }
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
