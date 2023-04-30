<template>
  <div class="profile-activity-block">
    <!-- ACTIVITY ROW  -->
    <div class="activity-row mgb-30">
      <activity-column
        v-for="(item, index) in activitiy_logs"
        :key="index"
        :activity="item"
      />
    </div>

    <!-- ACTIVITY CARDS  -->
    <template>
      <activity-card
        v-for="(activity, index) in getActivities"
        :key="index"
        :activity="activity"
      />
    </template>

    <!-- SEE MORE  -->
    <div class="col-12 mgt-10" v-if="showMore">
      <div
        class="
          see-more-btn
          color-white-bg
          text-center
          color-grey-dark
          font-weight-700
          rounded-5
          pointer
          smooth-transition
        "
        @click="showMoreActivities"
      >
        {{ getShowMoreText }}
      </div>
    </div>
  </div>
</template>

<script>
import activityColumn from "@/modules/profile/components/student-profile-comps/activity-column";
import activityCard from "@/modules/profile/components/student-profile-comps/activity-card";

export default {
  name: "profileActivityBlock",

  components: {
    activityColumn,
    activityCard,
  },

  props: {
    activity: {
      type: Object,
      default() {
        return {
          list: [],
          stats: {
            videos_watched: 0,
            practice_completed: 0,
            remedial_session: 0,
            questions_attempted: 0,
          },
        };
      },
    },
  },

  computed: {
    getActivities() {
      return this.show_more
        ? this.activity.list
        : this.activity.list.slice(0, 6);
    },

    getShowMoreText() {
      return this.show_more ? "Show less activities" : "Show more activities";
    },

    showMore() {
      return this.activity?.list?.length > 6;
    },
  },

  data() {
    return {
      show_more: false,

      activitiy_logs: [
        {
          value: this.activity.stats.videos_watched,
          is_time: false,
          title: "Videos Watched",
        },
        {
          value: this.activity.stats.practice_completed,
          is_time: false,
          title: "Practice Completed",
        },
        {
          value: this.activity.stats.remedial_session,
          is_time: false,
          title: "Remedial Sessions",
        },
        {
          value: this.activity.stats.questions_attempted,
          is_time: false,
          title: "Questons Attempded",
        },
      ],

      activities: [
        {
          title: "Topic Title",
          thumbnail: "TopicImg.png",
          date: "17 Mar, 2021",
          time: "12:45",
          type: "practice",
        },
        {
          title: "Week 2 - Homework",
          thumbnail: "TopicImg.png",
          date: "17 Mar, 2021",
          time: "12:45",
          type: "assessment",
        },
        {
          title: "Introduction to number systems and binary",
          thumbnail: "TopicImg.png",
          date: "17 Mar, 2021",
          time: "12:45",
          type: "video",
        },
      ],
    };
  },

  methods: {
    showMoreActivities() {
      this.show_more = !this.show_more;
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-activity-block {
  .activity-row {
    @include flex-row-between-wrap;
    gap: toRem(30) 0;
  }
}

.see-more-btn {
  @include font-height(12.5, 18);
  padding: toRem(9);

  @include breakpoint-down(xs) {
    @include font-height(12, 16);
  }

  &:hover {
    background: $brand-accent-light !important;
    color: $color-text !important;
  }
}
</style>
