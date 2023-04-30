<template>
  <div class="false-catchup">
    <!-- PAGE LOADER -->
    <portal to="gradely-modals">
      <transition name="fade">
        <page-loader loading_text="Accessing Catchup..." />
      </transition>
    </portal>
  </div>
</template>

<script>
import { EXTERNAL_URL } from "@/env";
import pageLoader from "@/shared/components/page-loader";

export default {
  name: "falseCatchup",

  components: {
    pageLoader,
  },

  created() {
    setTimeout(
      () =>
        (location.href = EXTERNAL_URL(
          "catchup",
          `/resources/${this.$route.params.id}`
        )),
      2000
    );
  },
};
</script>

<style></style>
