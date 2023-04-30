<template>
  <div class="end-meeting-section">
    <div class="color-ash">Please wait...</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "EndMeeting",

  created() {
    this.endLiveClass();
  },

  methods: {
    ...mapActions({ endClass: "dbFeeds/endClass" }),

    endLiveClass() {
      let session_id = this.$route.query.session_id;
      let class_id = +this.$route.query?.class_id || 0;
      let child_id = localStorage.getItem("redirect_id") || 0;

      this.endClass(session_id)
        .then(() => {
          if (["school", "teacher"].includes(this.getAuthType)) 
            location.href = `/feed/${
              class_id
            }?class_ended=1&session=${session_id}`;
          else if (this.getAuthType === "parent")
            location.href = `/feed/${
              child_id
            }?class_ended=1&session=${session_id}`;
          else
            location.href = `/feed/${
              this.getAuthUser.id
            }?class_ended=1&session=${session_id}`;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
