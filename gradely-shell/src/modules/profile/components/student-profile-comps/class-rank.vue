<template>
  <div class="class-rank">
    <div class="title-text color-grey-dark text-center">CURRENT RANK</div>

    <!-- RANK ICONS  -->
    <div class="rank-icons">
      <div
        v-for="(rank, index) in rank_list"
        :key="index"
        class="brand-inverse"
        :class="[rank === 'success' ? 'icon-user-fill' : 'icon-user-outline']"
      ></div>
    </div>

    <!-- RANK INFO  -->
    <div class="rank-info color-ash text-center">
      {{ ranking.rankPosition || "Top" }} {{ ranking.classPosition || 0 }}%
      {{ ranking.stateRanking ? ranking.stateName : "Nationwide" }}
    </div>
  </div>
</template>

<script>
export default {
  name: "classRank",

  props: {
    ranking: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      rank_success: "",
      rank_error: "",
      success_list: [],
      error_list: [],
      rank_list: "",
    };
  },

  watch: {
    ranking: "evaluateRank",
  },

  mounted() {
    this.evaluateRank();
  },

  methods: {
    evaluateRank() {
      this.rank_data = Math.round(this.ranking.classPosition / 10);
      this.rank_success = this.rank_data;
      this.rank_error = 10 - this.rank_data;

      // EMPTY ARRAY
      this.success_list.length = 0;
      this.error_list.length = 0;

      // PUSH SUCCESS
      for (let i = 0; i < this.rank_success; i++) {
        this.success_list.push("success");
      }

      // PUSH FAILED
      for (let j = 0; j < this.rank_error; j++) {
        this.error_list.push("error");
      }

      this.ranking.rankPosition === "Bottom"
        ? (this.rank_list = this.error_list.concat(this.success_list))
        : (this.rank_list = this.success_list.concat(this.error_list));
    },
  },
};
</script>

<style lang="scss" scoped>
.class-rank {
  @include flex-column-center;
  justify-content: flex-start;

  .title-text {
    @include font-height(11, 15);
    margin: toRem(18) 0 toRem(10);
    letter-spacing: 0.02em;

    @include breakpoint-down(lg) {
      @include font-height(10.5, 14);
      margin: toRem(24) 0 toRem(10);
    }
  }

  .rank-icons {
    @include flex-row-between-nowrap;
    width: 80%;

    @include breakpoint-down(lg) {
      width: 100%;
    }

    @include breakpoint-down(md) {
      width: 50%;
      margin-top: toRem(5);
    }

    @include breakpoint-down(sm) {
      width: 60%;
    }

    .icon {
      font-size: toRem(17.5);

      @include breakpoint-down(lg) {
        font-size: toRem(16);
      }
    }
  }

  .rank-info {
    @include font-height(12.25, 16);
    margin: toRem(9) 0 toRem(4);

    @include breakpoint-down(lg) {
      @include font-height(12, 16);
      margin: toRem(11) 0 toRem(4);
    }
  }
}
</style>
