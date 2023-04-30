<template>
  <div class="position-relative d-flex justify-content-start w-100">
    <div class="spacer"></div>

    <div class="post-content-area padded-area pt-0 w-100">
      <div class="content-area-card rounded-10">
        <!-- LEFT  -->
        <div class="left">
          <div class="avatar brand-accent-light-bg rounded-5">
            <div class="icon icon-videocam brand-accent"></div>
          </div>
        </div>

        <!-- RIGHT  -->
        <div class="right">
          <!-- TOP ROW  -->
          <div class="top-row mgb-35">
            <!-- TITLE TEXT  -->
            <div class="title-text color-text font-weight-600">
              {{ $string.getCapitalizeText(post.reference.title) }}
            </div>

            <!-- META TEXT  -->
            <div class="meta-text color-grey-dark">
              {{ getStartDate ? getStartDate : "No date specified" }}
            </div>
          </div>

          <!-- BOTTOM ROW  -->
          <div class="bottom-row">
            <template v-if="getStartDate">
              <!-- IF CLASS IS OPENED -->
              <template v-if="isLiveClassOpened">
                <!-- CLASS STATUS IS PENDING -->
                <template v-if="class_status === 'pending'">
                  <button class="btn" @click="initializeClass">
                    {{ post.is_owner ? "Start Class" : "Join Class" }}
                  </button>
                </template>

                <!-- CLASS STATUS IS ONGOING -->
                <template v-if="class_status === 'ongoing'">
                  <div class="d-flex justify-content-start align-items-center">
                    <button
                      class="btn rejoin-class-btn mgr-10"
                      @click="initializeClass"
                    >
                      {{ post.is_owner ? "Rejoin Class" : "Join Class" }}
                    </button>

                    <button
                      v-if="post.is_owner"
                      ref="endBtn"
                      class="btn end-class-btn"
                      @click="endOngoingClass"
                    >
                      End Class
                    </button>
                  </div>
                </template>

                <!-- CLASS STATUS IS COMPLETED -->
                <template v-if="class_status === 'completed'">
                  <button class="btn" disabled>Class Closed</button>
                </template>
              </template>

              <!-- IF CLASS IS CLOSED -->
              <template v-else>
                <button class="btn" disabled>Class Closed</button>
              </template>
            </template>

            <template v-else>
              <button class="btn" disabled>Invalid Class</button>
            </template>

            <!-- MANAGE BUTTON -->
            <template
              v-if="isLiveClassOpened && class_status === 'pending' && post.id"
            >
              <div
                class="options pointer rounded-12 smooth-transition"
                @click="toggleOptions"
                v-on-clickaway="hideOptions"
                v-if="post.is_owner"
              >
                <div class="icon icon-ellipsis-h brand-navy"></div>

                <!-- DROPDOWN  -->
                <div
                  class="
                    dropdown
                    rounded-5
                    box-shadow-effect
                    smooth-transition
                    white-text-bg
                  "
                  v-if="show_more_option"
                >
                  <div class="item" @click="toggleRescheduleLiveClass">
                    <div class="icon-cover">
                      <div class="icon icon-restart gfont-14-5"></div>
                    </div>
                    <div>Reschedule</div>
                  </div>

                  <div class="item" @click="toggleUpdateLiveClass">
                    <div class="icon-cover">
                      <div class="icon icon-edit-pen gfont-17"></div>
                    </div>
                    <div>Edit Details</div>
                  </div>

                  <div class="item" @click="toggleManageLiveClass">
                    <div class="icon-cover">
                      <div class="icon icon-trash gfont-18"></div>
                    </div>
                    <div>Manage URL</div>
                  </div>

                  <div class="item" @click="toggleCancelLiveClass">
                    <div class="icon-cover">
                      <div class="icon icon-trash gfont-18"></div>
                    </div>
                    <div>Cancel Class</div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- CONTENT DETAILS  -->
      <div class="content-details">
        <div class="text">Live Class</div>
        <div class="bullet"></div>
        <div class="text">{{ post.reference.subject.name }}</div>
      </div>
    </div>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" v-if="show_end_liveclass_modal">
        <end-class-feedback-modal
          :post="post"
          @closeTriggered="toggleEndLiveClassRating"
        />
      </transition>

      <transition name="fade" v-if="show_reschedule_liveclass_modal">
        <reschedule-liveclass-modal
          :post="post"
          @closeTriggered="toggleRescheduleLiveClass"
        />
      </transition>

      <transition name="fade" v-if="show_update_liveclass_modal">
        <update-liveclass-modal
          :post="post"
          @closeTriggered="toggleUpdateLiveClass"
        />
      </transition>

      <transition name="fade" v-if="show_manage_live_class">
        <manage-live-class-modal
          :post="post"
          @closeTriggered="toggleManageLiveClass"
        />
      </transition>

      <transition name="fade" v-if="show_cancel_liveclass_modal">
        <cancel-liveclass-modal
          @reschedule="reschedule"
          :post="post"
          @closeTriggered="toggleCancelLiveClass"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "postContentLiveclass",

  components: {
    endClassFeedbackModal: () =>
      import(
        /* webpackChunkName: "endClassFeedbackModal" */ "@/modules/base/modals/assessments/end-class-feedback-modal"
      ),
    rescheduleLiveclassModal: () =>
      import(
        /* webpackChunkName: "rescheduleLiveclassModal" */ "@/modules/base/modals/feeds/reschedule-liveclass-modal"
      ),
    updateLiveclassModal: () =>
      import(
        /* webpackChunkName: "updateLiveclassModal" */ "@/modules/base/modals/feeds/update-liveclass-modal"
      ),
    manageLiveClassModal: () =>
      import(
        /* webpackChunkName: "cancelLiveclassModal" */ "@/modules/base/modals/feeds/manage-live-class-modal"
      ),
    cancelLiveclassModal: () =>
      import(
        /* webpackChunkName: "cancelLiveclassModal" */ "@/modules/base/modals/feeds/cancel-liveclass-modal"
      ),
  },

  props: {
    post: {
      type: Object,
    },
  },

  computed: {
    getStartDate() {
      let { d3, m4, y1, h01, b2, a0 } = this.$date
        .formatDate(this.post?.reference?.availability)
        .getAll();

      return m4 === undefined
        ? false
        : `${d3} ${m4}, ${y1} • ${h01}:${b2} ${a0}`;
    },

    isLiveClassOpened() {
      let date_ref = new Date();

      let current_date = new Date(
        `${date_ref.getFullYear()}-${
          date_ref.getMonth() + 1
        }-${date_ref.getDate()}`
      );

      let close_day = new Date(this.post.reference.availability.split("T")[0]);

      return current_date > close_day ? false : true;
    },
  },

  data() {
    return {
      show_more_option: false,
      show_end_liveclass_modal: false,
      show_reschedule_liveclass_modal: false,
      show_update_liveclass_modal: false,
      show_cancel_liveclass_modal: false,
      show_manage_live_class: false,

      class_status: this.post?.reference?.status,
    };
  },

  methods: {
    ...mapActions({ endClass: "dbFeeds/endClass" }),

    reschedule() {
      this.toggleCancelLiveClass();
      this.toggleRescheduleLiveClass();
    },

    // Checking if the user is the owner of the post, if not, it checks if the reference status is
    // ongoing, if not, it pushes an alert.
    initializeClass() {
      if (this.post.is_owner) this.setupClassTab();
      else {
        if (this.post?.reference?.status === "ongoing") this.setupClassTab();
        else
          this.pushAlert(
            `Your class is yet to start!
            Check back soon.`,
            "warning"
          );
      }
    },

    // Opening a new tab in the browser.
    setupClassTab() {
      window.open(
        `/study/live-class/class-entry/${this.$route.params.id}?host=${
          this.post.is_owner ? true : false
        }&reference_id=${this.post?.reference?.id}`
      );
    },

    endOngoingClass() {
      this.handleClick("endBtn", "Ending...");

      this.endClass(this.post?.reference?.id)
        .then((response) => {
          if (response.code === 200) {
            this.pushAlert("Live class session ended successfully!", "success");

            this.$bus.$emit("reloadFeeds");
            this.$bus.$emit("reloadUpcoming");

            setTimeout(() => this.toggleEndLiveClassRating(), 3000);
          }
        })
        .catch(() => {
          this.pushAlert("Live class session failed to end", "error");
        });
    },

    toggleEndLiveClassRating() {
      this.show_end_liveclass_modal = !this.show_end_liveclass_modal;
    },

    toggleManageLiveClass() {
      this.show_manage_live_class = !this.show_manage_live_class;
    },

    toggleOptions() {
      this.show_more_option = !this.show_more_option;
    },

    hideOptions() {
      this.show_more_option = false;
    },

    toggleRescheduleLiveClass() {
      this.show_reschedule_liveclass_modal =
        !this.show_reschedule_liveclass_modal;
    },

    toggleUpdateLiveClass() {
      this.show_update_liveclass_modal = !this.show_update_liveclass_modal;
    },

    toggleCancelLiveClass() {
      this.show_cancel_liveclass_modal = !this.show_cancel_liveclass_modal;
    },
  },
};
</script>

<style lang="scss" scoped>
.post-content-area {
  .content-area-card {
    .right {
      .bottom-row {
        margin-top: toRem(-10);

        .btn {
          font-size: toRem(10.25);
          padding: toRem(10.75) toRem(24.5);

          @include breakpoint-down(xs) {
            font-size: toRem(9.55);
            padding: toRem(11) toRem(26);
          }

          &:disabled {
            background: rgba($border-grey, 0.75) !important;
            border: toRem(1) solid rgba($border-grey-dark, 0.5) !important;
          }
        }

        .rejoin-class-btn {
          background: $brand-green-light;
          border: toRem(1) solid $brand-green;
        }

        .end-class-btn {
          background: $brand-red-light;
          border: toRem(1) solid $brand-red;
        }

        .options {
          @include square-shape(35);

          @include breakpoint-down(xs) {
            @include square-shape(32);
          }

          .dropdown {
            width: toRem(170);
            top: toRem(-67);
            left: toRem(38);

            @include breakpoint-custom-down(420) {
              width: toRem(140);
            }

            @include breakpoint-custom-down(390) {
              width: toRem(145);
              left: toRem(-50);
              top: toRem(-94);
            }
          }
        }
      }
    }
  }
}
</style>
