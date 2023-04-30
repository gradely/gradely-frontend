<template>
  <div
    class="quick-setup-modal index-999"
    @click.self="$emit('closeTriggered')"
  >
    <div
      class="wrapper position-relative w-100 h-100"
      @click.self="$emit('closeTriggered')"
    >
      <!-- SETUP CARD -->
      <div class="setup-card white-text-bg rounded-10">
        <!-- TOP AREA -->
        <div class="top-area">
          <!-- TITLE ROW -->
          <div class="title-row mgb-20">
            <div class="title-text brand-navy font-weight-700">Help</div>

            <div
              class="close-menu avatar smooth-transition pointer"
              @click="$emit('closeTriggered')"
            >
              <div class="icon icon-close brand-navy"></div>
            </div>
          </div>

          <!-- SETUP AREA -->
          <div class="setup-area">
            <div class="title-text color-text mgb-14">Quick Setup</div>

            <!-- SETUP ITEM -->
            <div
              @click="openChecklistState(item)"
              class="setup-item"
              v-for="(item, index) in setup_items"
              :key="index"
            >
              <div
                class="setup-icon"
                :class="
                  item.status ? 'brand-inverse-light-bg' : 'color-white-bg'
                "
              >
                <div
                  class="icon"
                  :class="item.status ? 'icon-accept' : 'icon-gear'"
                ></div>

                <!-- <div
                  v-if="!item.status"
                  class="indicator brand-red-bg rounded-circle index-1"
                ></div> -->
              </div>

              <div class="setup-text">{{ item.title }}</div>
            </div>

            <!-- SETUP OPTIONS -->
            <div class="setup-options">
              <div class="option mgr-2" @click="reInitiateTour">
                <div class="icon icon-play-bg gfont-20 brand-inverse"></div>
                <div class="text">Take Tour</div>
              </div>

              <a
                href="https://gradely.ng/help-centre/"
                target="_blank"
                class="option mgl-2"
              >
                <div class="icon icon-help-file gfont-19 brand-inverse"></div>
                <div class="text">Visit Help Center</div>
              </a>
            </div>
          </div>
        </div>

        <!-- BOTTOM AREA -->
        <div
          class="bottom-area d-flex justify-content-between align-items-center"
        >
          <div
            class="d-flex justify-center align-items-center pointer"
            @click="$emit('bookAMeeting')"
          >
            <div class="avatar">
              <div class="icon icon-chat brand-navy"></div>
            </div>

            <div class="text color-text">Book a meeting</div>
          </div>

          <!-- CHAT -->
          <a
            href="https://wa.me/2348055967844"
            target="_blank"
            class="whatsapp-icon"
            title="Let's chat"
          >
            <img :src="mxStaticImg('Whatsapp.gif')" alt="Whatsapp" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "quickSetupModal",

  computed: {
    ...mapGetters({
      getSchoolChecklist: "dbHome/getSchoolChecklist",
      getSchoolTourFlow: "general/getSchoolTourFlow",
    }),

    resumeTour() {
      return this.getTour.step_progress === "pending" ? true : false;
    },
  },

  data: () => ({
    setup_items: [],

    checklist: [
      { key: "teachers", value: "Add your Teachers", type: "modal" },
      {
        key: "upgrade_profile",
        value: "Update school profile",
        type: "url",
        link: "/app/school/settings",
      },
      {
        key: "gradely_apps",
        value: "Install school management apps",
        type: "url",
        link: "/store-apps",
      },
      {
        key: "admin",
        value: "Invite school administrators",
        type: "url",
        link: "/app/school/settings/preferences/users",
      },
      // { key: "set_curriculum", value: "Configure curriculum", link: "" },
    ],

    tour_step: 1,
    tour_completed: true,
  }),

  watch: {
    getSchoolChecklist: {
      handler(value) {
        if (Object.keys(value).length) {
          this.setupCheckList();
        }
      },
      immediate: true,
    },
  },

  created() {
    this.loadSchoolChecklist();
  },

  mounted() {
    // this.setupCheckList();
  },

  methods: {
    ...mapActions({
      loadSchoolChecklist: "dbHome/loadSchoolChecklist",
      updateMultipleFeatureLogger: "general/updateMultipleFeatureLogger",
    }),

    setupCheckList() {
      this.setup_items = [];

      for (const item in this.getSchoolChecklist) {
        if (item !== "set_curriculum") {
          this.setup_items.push({
            title: this.getCheckListState(item, "value"),
            status: this.getSchoolChecklist[item],
            type: this.getCheckListState(item, "type"),
            link: this.getCheckListState(item, "link"),
          });
        }
      }

      let school_apps = this.setup_items[2];
      this.setup_items[2] = this.setup_items[3];
      this.setup_items[3] = school_apps;
    },

    getCheckListState(title, option) {
      let checklist = this.checklist.find((item) => item.key === title);
      return checklist[option];
    },

    openChecklistState(item) {
      if (item.type === "url") location.href = item.link;
      else this.$emit("toggleTeacherModal");
    },

    reInitiateTour() {
      let payload = [
        {
          name: "tour_step",
          type: "",
          value: 1,
        },
        {
          name: "tour_completed",
          type: "",
          value: false,
        },
      ];

      this.updateMultipleFeatureLogger(payload);

      setTimeout(
        () =>
          this.$router
            .replace({
              name: "DashboardHome",
              query: { self_initiated: true },
            })
            .catch((error) => {
              if (error.name != "NavigationDuplicated") throw error;
            }),
        500
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.quick-setup-modal {
  position: fixed;
  @include stretch-area;

  .setup-card {
    position: absolute;
    width: toRem(360);
    height: auto;
    bottom: 0;
    right: 0;
    box-shadow: 0 toRem(4) toRem(40) rgba($black-text, 0.15);
    transition: right 0.5s ease-in-out;
    animation: slide-left 0.4s ease-in-out;

    @include breakpoint-down(xs) {
      width: 100%;
    }

    .top-area {
      padding: toRem(17) toRem(15) 0;
      border-bottom: toRem(6) solid $color-white;

      @include breakpoint-down(sm) {
        padding: toRem(15) toRem(14) 0;
      }

      .title-row {
        @include flex-row-between-nowrap;

        .title-text {
          font-size: toRem(18);

          @include breakpoint-down(sm) {
            font-size: toRem(17.25);
          }

          @include breakpoint-down(xs) {
            font-size: toRem(17);
          }
        }

        .close-menu {
          background: $color-white;
          @include square-shape(32);

          @include breakpoint-down(xs) {
            @include square-shape(30);
          }

          &:hover {
            background: $brand-red-light;
          }

          .icon {
            @include center-placement;
            font-size: toRem(16);

            @include breakpoint-down(xs) {
              font-size: toRem(14.5);
            }
          }
        }
      }

      .setup-area {
        .title-text {
          @include font-height(15, 20);

          @include breakpoint-down(sm) {
            @include font-height(14.75, 19);
          }

          @include breakpoint-down(xs) {
            @include font-height(14.5, 19);
          }
        }

        .setup-item {
          @include flex-row-start-nowrap;
          @include transition(0.3s);
          padding: toRem(8) toRem(4);
          border-bottom: toRem(1) solid $brand-inverse-light;
          cursor: pointer;

          &:hover {
            background: rgba($brand-inverse-light, 0.35);
          }

          .setup-icon {
            @include square-shape(32);
            margin-right: toRem(15);
            border-radius: toRem(10);
            position: relative;

            @include breakpoint-down(xs) {
              @include square-shape(30);
            }

            .icon {
              color: $brand-navy;
              @include center-placement;
              font-size: toRem(19.5);

              @include breakpoint-down(sm) {
                font-size: toRem(19);
              }

              @include breakpoint-down(xs) {
                font-size: toRem(18);
              }
            }

            .indicator {
              position: absolute;
              @include square-shape(8);
              top: toRem(4);
              right: toRem(4);
            }
          }

          .setup-text {
            color: $color-text;
            @include font-height(13.85, 20);

            @include breakpoint-down(sm) {
              @include font-height(13.5, 19);
            }

            @include breakpoint-down(xs) {
              @include font-height(13.25, 19);
            }
          }
        }

        .setup-options {
          @include flex-row-center-nowrap;
          padding: toRem(12) 0 toRem(11);

          @include breakpoint-down(xs) {
            padding: toRem(10) 0 toRem(9);
          }

          .option {
            @include flex-row-start-nowrap;
            padding: toRem(10) toRem(15);
            @include transition(0.3s);
            border-radius: toRem(5);
            cursor: pointer;

            @include breakpoint-down(xs) {
              padding: toRem(9) toRem(13.5);
            }

            &:hover {
              background: rgba($brand-inverse-light, 0.5);
            }

            .icon {
              margin-right: toRem(11);
            }

            .text {
              @include font-height(13.65, 19);
              color: $color-ash;

              @include breakpoint-down(sm) {
                @include font-height(13.45, 19);
              }

              @include breakpoint-down(xs) {
                @include font-height(13.25, 19);
              }
            }
          }
        }
      }
    }

    .bottom-area {
      padding: toRem(16) toRem(15);
      @include flex-row-start-nowrap;

      @include breakpoint-down(sm) {
        padding: toRem(14);
      }

      .avatar {
        background: $color-white;
        @include square-shape(30);
        border-radius: toRem(10);
        margin-right: toRem(10);

        .icon {
          @include center-placement;
          font-size: toRem(18);
        }
      }

      .text {
        font-size: toRem(14.25);

        @include breakpoint-down(sm) {
          font-size: toRem(13.75);
        }

        @include breakpoint-down(xs) {
          font-size: toRem(13.5);
        }
      }

      .whatsapp-icon {
        img {
          @include square-shape(38);
        }
      }
    }
  }
}
</style>
