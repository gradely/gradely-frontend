<template>
  <div class="weekly-body weekly-by-3-columns rounded-2 white-text-bg mgb-2">
    <!-- COLUMN ONE  -->
    <div class="column-one">
      <div class="avatar avatar-square off-white-bg mgr-10">
        <div class="icon icon-calendar-event color-ash"></div>
      </div>

      <!-- INFO  -->
      <div class="info">
        <div class="title-text brand-navy font-weight-700 mgb-2">
          Gradely teacher retreat
        </div>
        <div class="meta-text color-grey-dark">Wed, 12 Nov, 2020 9:00 AM</div>
      </div>
    </div>

    <!-- COLUMN TWO  -->
    <div class="column-two text-truncate">Gradely</div>

    <!-- COLUMN FIVE  -->
    <div class="column-three">
      <router-link to class="btn-link link-no-underline font-weight-600"
        >Learn More</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "weeklyEventCard",
};
</script>

<style lang="scss" scoped></style>
