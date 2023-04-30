<template>
  <div>
    <h1>This is home page</h1>
    <Welcome />
  </div>
</template>


<script>
import Welcome from "@/components/Welcome";

export default {
  name: "HomeView",

  components: {
    Welcome,
  },
};
</script>
