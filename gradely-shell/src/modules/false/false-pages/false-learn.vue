<template>
  <div></div>
</template>

<script>
import { EXTERNAL_URL } from "@/env";

export default {
  name: "falseLearn",

  created() {
    location.href = EXTERNAL_URL("learn", `/${this.$route.params.id}`);
  },
};
</script>

<style></style>
