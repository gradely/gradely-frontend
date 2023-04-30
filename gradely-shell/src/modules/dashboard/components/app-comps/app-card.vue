<template>
  <div class="card-wrapper h-auto position-relative">
    <div
      class="
        app-card
        white-text-bg
        rounded-10
        overflow-hidden
        position-relative
        pointer
        smooth-transition
      "
      @click="processAppState"
    >
      <!-- TOP BLOCK  -->
      <div class="top-block" :class="$color.getProfileBgColor(app.name)">
        <!-- APP ICON  -->
        <div
          class="app-icon rounded-15 position-relative brand-accent-light-bg"
        >
          <img
            v-lazy="
              app.icon ? app.icon : mxStaticImg('AppFileIcon.svg', 'dashboard')
            "
            :alt="app.name"
          />
        </div>
      </div>

      <!-- BOTTOM BLOCK  -->
      <div class="bottom-block">
        <!-- APP INFO  -->
        <div class="app-info">
          <div class="title-text font-weight-600 brand-navy">
            {{ app.name }}
          </div>
          <div class="owner color-grey-dark text-capitalize">
            By: {{ app.owner }}
          </div>
        </div>

        <!-- ADD APP ICON  -->
        <div class="add-icon avatar pointer smooth-transition ignore">
          <div
            class="icon brand-accent ignore"
            :class="
              installed
                ? ['icon-control', 'border-grey-dark']
                : ['icon-plus', 'brand-accent']
            "
            :title="getAppTitle"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EXTERNAL_URL } from "@/env";

export default {
  name: "appCard",

  props: {
    app: {
      type: Object,
      default: () => ({
        id: 1,
        name: "Report Card",
        icon: "",
        owner: "Gradely",
      }),
    },

    installed: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    getAppTitle() {
      return this.installed
        ? `View ${this.app.name} app info`
        : `Get ${this.app.name} app`;
    },
  },

  methods: {
    processAppState($event) {
      let hit_info = $event.target.classList.contains("ignore");

      if (hit_info) {
        this.$router.push(`/store-app-description/${this.app.id}`);
      } else {
        if (this.installed) {
          this.pushAlert(`Launching ${this.app.name} App`, "loading");
          setTimeout(
            () =>
              (location.href = EXTERNAL_URL(
                "report-card",
                `/home${this.appendReportQueryParam()}`
              )),
            1500
          );
        } else this.$router.push(`/store-app-description/${this.app.id}`);
      }
    },

    appendReportQueryParam() {
      let term = this.getAuthUser?.term.toLowerCase();
      let session = this.getAuthUser?.session ?? "2021-2022";
      return `?term=${term}&session=${session}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  width: 33.33%;
  padding: 0 0.9%;
  margin-bottom: toRem(23);

  @include breakpoint-down(lg) {
    padding: 0 0.65%;
  }

  @include breakpoint-down(md) {
    margin-bottom: toRem(14);
    width: 50%;
  }

  @include breakpoint-down(sm) {
    padding: 0 1.5%;
  }

  @include breakpoint-down(xs) {
    width: 100%;
    padding: 0 1%;
    margin-bottom: toRem(16);
  }
}

.app-card {
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
  width: 100%;

  &:hover {
    transform: scale(0.99);
  }

  .top-block {
    @include flex-column-center;
    padding: toRem(50) 0;

    @include breakpoint-down(xl) {
      padding: toRem(40) 0;
    }

    @include breakpoint-down(lg) {
      padding: toRem(35) 0;
    }

    @include breakpoint-custom-down(420) {
      padding: toRem(45) 0;
    }

    .app-icon {
      @include square-shape(96);

      @include breakpoint-down(xl) {
        @include square-shape(90);
      }

      @include breakpoint-down(lg) {
        @include square-shape(85);
      }

      @include breakpoint-down(md) {
        @include square-shape(75);
      }

      @include breakpoint-down(xs) {
        @include square-shape(65);
      }

      @include breakpoint-custom-down(420) {
        @include square-shape(75);
      }

      img {
        @include center-placement;

        @include breakpoint-down(lg) {
          @include square-shape(60);
        }

        @include breakpoint-down(md) {
          @include square-shape(50);
        }

        @include breakpoint-down(xs) {
          @include square-shape(40);
        }

        @include breakpoint-custom-down(420) {
          @include square-shape(50);
        }
      }
    }
  }

  .bottom-block {
    @include flex-row-between-nowrap;
    padding: toRem(15);

    @include breakpoint-down(lg) {
      padding: toRem(11);
    }

    @include breakpoint-down(xs) {
      padding: toRem(8);
    }

    @include breakpoint-custom-down(420) {
      padding: toRem(14);
    }

    .app-info {
      .title-text {
        @include font-height(14.5, 20);
        margin-bottom: toRem(2);

        @include breakpoint-down(xl) {
          @include font-height(13.5, 18);
        }

        @include breakpoint-down(lg) {
          @include font-height(13, 17);
        }

        @include breakpoint-down(md) {
          @include font-height(12.5, 16);
        }

        @include breakpoint-down(xs) {
          @include font-height(12.25, 15);
        }

        @include breakpoint-custom-down(420) {
          @include font-height(12.75, 17);
        }
      }

      .owner {
        @include font-height(13, 18);

        @include breakpoint-down(xl) {
          @include font-height(12.5, 17);
        }

        @include breakpoint-down(lg) {
          @include font-height(12, 17);
        }

        @include breakpoint-down(md) {
          @include font-height(11, 16);
        }

        @include breakpoint-down(xs) {
          @include font-height(10.5, 15);
        }

        @include breakpoint-custom-down(420) {
          @include font-height(11, 16);
        }
      }
    }

    .add-icon {
      @include square-shape(40);
      background: $color-white;

      @include breakpoint-down(xl) {
        @include square-shape(35);
      }

      @include breakpoint-down(md) {
        @include square-shape(34);
      }

      .icon {
        @include center-placement;
        font-size: toRem(20);

        @include breakpoint-down(xl) {
          font-size: toRem(18);
        }

        @include breakpoint-down(md) {
          font-size: toRem(18);
        }
      }

      &:hover {
        background: $brand-inverse-light !important;
      }
    }
  }
}
</style>
