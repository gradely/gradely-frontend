<template>
  <div class="additional-info">
    <div class="title-text color-text">Additional Information</div>

    <!-- PRICING  -->
    <div class="item">
      <div class="title color-text font-weight-600">Pricing</div>
      <div class="value color-ash">
        {{
          getAppInfo.data.price_status ? getAppInfo.data.price_status : "Free"
        }}
      </div>
    </div>

    <!-- LANGUAGE  -->
    <div class="item">
      <div class="title color-text font-weight-600">Language</div>
      <div class="value color-ash">
        {{ getAppInfo.data.language ? getAppInfo.data.language : "English" }}
      </div>
    </div>

    <!-- PUBLISHED BY  -->
    <div class="item">
      <div class="title color-text font-weight-600">Published By</div>
      <div class="value color-ash text">
        {{ getAppInfo.data.owner ? getAppInfo.data.owner : "Gradely" }}
      </div>
    </div>

    <!-- VERSION HISTORY  -->
    <div class="item">
      <div class="title color-text font-weight-600">Version History</div>
      <div class="value color-ash">Published: {{ getPublishedDate }}</div>
      <div class="value color-ash">Last Updated: {{ getUpdatedDate }}</div>
      <div class="value color-ash">
        Version:
        {{ getAppVersion }}
      </div>
    </div>

    <!-- LEARN MORE  -->
    <div class="item">
      <div class="title color-text font-weight-600">Learn more & Support</div>

      <!-- App FAQs & Support  -->
      <div class="item-link">
        <div class="avatar">
          <div class="icon icon-circle-question-mark"></div>
        </div>

        <a :href="getAppInfo.data.faq_url" class="btn-link"
          >App FAQs & Support</a
        >
      </div>

      <!-- Developer Website  -->
      <div class="item-link">
        <div class="avatar">
          <div class="icon icon-external-link"></div>
        </div>

        <a :href="getAppInfo.data.developer_url" class="btn-link"
          >Developer Website</a
        >
      </div>

      <!-- EMAIL  -->
      <div class="item-link">
        <div class="avatar">
          <div class="icon icon-email"></div>
        </div>

        <a :href="'mailto:' + getAppInfo.data.support_email" class="btn-link"
          >app_support@gradely.ng</a
        >
      </div>

      <!-- PRIVACY  -->
      <div class="item-link">
        <div class="avatar">
          <div class="icon icon-shield-ok"></div>
        </div>

        <a :href="getAppInfo.data.privacy_url" class="btn-link"
          >Privacy Policy</a
        >
      </div>
    </div>

    <!-- INFO CONTENT  -->
    <div class="info-content color-ash">
      Gradely conducts a review of apps in our Apps Directory. If you encounter
      inappropriate content or behavior please report it, so we can improve your
      experience.
    </div>

    <!-- REPORT APP  -->
    <div
      class="report-cta d-flex justify-content-start smooth-transition"
      @click="toggleAppReportModal"
      :title="'Report ' + getAppInfo.data.name"
    >
      <div class="icon icon-flag"></div>
      <div class="text pointer">Report this app</div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_report_modal">
        <report-app-modal
          :app_id="getAppInfo.data.id"
          :app_name="getAppInfo.data.app_name"
          :app_slug="getAppInfo.data.slug"
          @closeTriggered="toggleAppReportModal"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "additionalInfo",

  components: {
    reportAppModal: () =>
      import(
        /* webpackChunkName: "reportAppModal" */ "@/modules/dashboard/modals/report-app-modal"
      ),
  },

  computed: {
    ...mapGetters({
      getAppInfo: "dbApp/getAppInfo",
    }),

    getAppVersion() {
      return this.getAppInfo.data.version
        ? this.getAppInfo.data.version.version
        : "0.0.1";
    },

    getPublishedDate() {
      if (this.getAppInfo.data.created_at) {
        let { d1, m4, y1 } = this.$date
          .formatDate(this.getAppInfo.data.created_at)
          .getAll();

        return `${m4} ${d1}, ${y1}`;
      } else return "No Published Date";
    },

    getUpdatedDate() {
      if (this.getAppInfo.data.updated_at) {
        let { d1, m4, y1 } = this.$date
          .formatDate(this.getAppInfo.data.updated_at)
          .getAll();

        return `${m4} ${d1}, ${y1}`;
      } else return "No Date";
    },
  },

  data: () => ({
    show_report_modal: false,
  }),

  methods: {
    toggleAppReportModal() {
      this.show_report_modal = !this.show_report_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.additional-info {
  @include breakpoint-down(md) {
    margin-top: toRem(50);
  }

  .title-text {
    @include font-height(19, 32);
    margin-bottom: toRem(20);

    @include breakpoint-down(xl) {
      @include font-height(18, 27);
    }

    @include breakpoint-down(md) {
      @include font-height(16, 25);
    }

    @include breakpoint-down(sm) {
      @include font-height(15, 21);
    }

    @include breakpoint-down(xs) {
      @include font-height(13.5, 18);
    }

    @include breakpoint-custom-down(370) {
      // @include font-height(13, 18);
    }
  }

  .item {
    margin-bottom: toRem(15);

    .title {
      @include font-height(14, 18);
      margin-bottom: toRem(3);

      @include breakpoint-down(sm) {
        @include font-height(13, 18);
      }
    }
    .value {
      @include font-height(13, 19);
      text-transform: capitalize;

      @include breakpoint-down(sm) {
        @include font-height(12.5, 17);
      }
    }
  }

  .item-link {
    @include flex-row-start-nowrap;
    margin-bottom: toRem(5);

    .avatar {
      @include square-shape(28);
      margin-right: toRem(10);

      .icon {
        @include center-placement;
        color: $color-grey-dark;
        font-size: toRem(20);
      }
    }

    a {
      @include font-height(14, 18);

      @include breakpoint-down(sm) {
        @include font-height(12, 17);
      }
    }
  }

  .info-content {
    border-top: toRem(1) solid $border-grey;
    padding: toRem(15) 0;
    @include font-height(13.25, 25);

    @include breakpoint-down(sm) {
      @include font-height(12.75, 21);
    }
  }

  .report-cta {
    color: $brand-tonic;
    font-size: toRem(14.5);
    margin-top: toRem(5);
    margin-bottom: toRem(40);
    width: max-content;

    @include breakpoint-down(sm) {
      font-size: toRem(13);
    }

    @include breakpoint-down(xs) {
      font-size: toRem(12.5);
    }

    .icon {
      font-size: toRem(18);
      margin-right: toRem(10);

      @include breakpoint-down(xs) {
        font-size: toRem(15);
      }
    }

    &:hover {
      color: $brand-inverse;
    }
  }
}
</style>
