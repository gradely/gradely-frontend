<template>
  <div class="assign-card white-text-bg pdy-15 pdx-20 rounded-5">
    <div class="label-box mgr-25 pointer" @click="$emit('assignTopic')">
      <span class="icon icon-tag gfont-16 color-mid-blue mgr-12"></span>
      <span class="gfont-14 color-text card-text">Assign Topics</span>
    </div>

    <div class="label-box pointer" @click="$emit('deleteSelection')">
      <span class="icon icon-trash gfont-16 color-mid-blue mgr-12"></span>
      <span class="gfont-14 color-text card-text">Unselect all</span>
    </div>

    <div class="label-box close-icon pointer" @click="$emit('deleteBulk')">
      <span class="icon icon-close gfont-14 color-grey-dark mgr-12"></span>
      <span class="color-grey-dark gfont-14">Delete Questions</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "AssignAssessmentTopicCard",
};
</script>

<style lang="scss" scoped>
.assign-card,
.label-box {
  @include flex-row-start-nowrap;

  @include breakpoint-down(xs) {
    @include flex-row-between-wrap;
  }
}
.assign-card {
  transition: all ease-in-out 2.7s;

  .card-text {
    transition: color ease-in-out 0.2s;
    &:hover {
      color: $brand-accent !important;
    }
  }
}

.close-icon {
  margin-left: auto;

  @include breakpoint-down(xs) {
    margin: toRem(25) auto 0 auto;
  }
}
</style>
