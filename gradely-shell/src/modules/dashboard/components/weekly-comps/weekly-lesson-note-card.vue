<template>
  <div
    class="weekly-body weekly-by-3-columns rounded-2 white-text-bg mgb-2 position-relative pointer"
  >
    <!-- LABEL  -->
    <div
      class="label position-absolute h-100 brand-accent-bg smooth-transition"
    ></div>

    <!-- COLUMN ONE  -->
    <div class="column-one">
      <div
        class="avatar avatar-square mgr-10"
        :class="$doc.getDocBgcolor(document.extension) + '-bg'"
      >
        <div
          class="icon"
          :class="$doc.getDocIconStyle(document.extension)"
        ></div>
      </div>

      <!-- INFO  -->
      <div class="info">
        <div class="title-text brand-navy font-weight-700 mgb-2">
          {{ document.title }}
        </div>
        <div class="meta-text color-grey-dark">{{ getCreatedDate }}</div>
      </div>
    </div>

    <!-- COLUMN TWO  -->
    <div class="column-two text-truncate">{{ document.user.full_name }}</div>

    <!-- COLUMN FIVE  -->
    <div class="column-three">
      <router-link to class="btn-link link-no-underline font-weight-600"
        >View Note
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "weeklyLessonNoteCard",

  props: {
    document: {
      type: Object,
      default: () => ({
        id: 1,
        title: "Note title",
        extension: "pdf",
        created_at: "Tues 23rd Aug. 2021",
        user: {
          full_name: "Richy Jones",
        },
      }),
    },
  },

  computed: {
    getCreatedDate() {
      let { w2, d3, m4, y1 } = this.$date
        .formatDate(this.document.created_at)
        .getAll();
      return `${w2} ${d3} ${m4}, ${y1}`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
