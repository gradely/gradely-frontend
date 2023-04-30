<template>
  <div class="connect-child onboarding-setup">
    <img
      v-lazy="mxStaticImg('gradely-logo.png')"
      alt="GradelyLogo"
      class="gradely-logo"
    />

    <content-container-layout>
      <template slot="content">
        <!-- CLOSE DIALOG -->
        <div
          class="close-dialog-btn rounded-20 overflow-hidden smooth-transition pointer"
          v-if="$route.query.page"
          title="Close dialog"
          @click="navigateToBase"
        >
          <div class="position-relative w-100 h-100">
            <div class="icon icon-close"></div>
          </div>
        </div>

        <div
          class="d-flex flex-column align-items-center justify-content-start w-100"
        >
          <!-- TAB ROW -->
          <onboarding-tab-row
            v-if="false"
            :tabs="[
              { title: 'Add new child', route: 'ParentAddChild' },
              { title: 'Connect with child', route: 'ParentConnectChild' },
            ]"
          />

          <!-- META TEXT -->
          <div class="meta-text brand-navy text-center">
            Use and existing student profile, enter student code to continue
          </div>

          <!-- CLASS BLOCK -->
          <div class="class-block" v-if="class_name">
            <div class="school-logo">
              <img v-if="school_logo" v-lazy="school_logo" alt="logo" />
              <img
                v-else
                v-lazy="mxStaticImg('dummy_school_logo.png')"
                alt="alt-logo"
              />
            </div>

            <div>
              <div class="brand-primary gfont-14 font-weight-600 mb-1">
                {{ class_name }}
              </div>
              <div class="color-grey-dark gfont-12">@{{ school_name }}</div>
            </div>
          </div>

          <!-- FORM WRAPPER  -->
          <div class="onboarding-form-wrapper mgt-20 mx-auto">
            <!-- STUDENT CODE  -->
            <div class="form-group compact-row w-100">
              <label for="studentCode" class="label-compact label-sm"
                >Child's Code</label
              >
              <input
                type="text"
                id="studentCode"
                class="form-control"
                placeholder="Enter child's student code"
                required
                v-model="child_code"
              />

              <!-- VERIFY BUTTON  -->
              <div class="verify-btn btn-link index-1 link-no-underline">
                <div
                  @click="searchChildCode"
                  v-if="!searching"
                  :class="child_code ? 'brand-accent' : 'border-grey-dark'"
                >
                  VERIFY
                </div>
                <div
                  v-if="searching"
                  class="icon icon-dotted-spinner animate gfont-15"
                ></div>
              </div>
            </div>

            <!-- RELATIONSHIP  -->
            <div class="form-group compact-row w-100" v-if="!class_name">
              <label for="relationship" class="label-compact label-sm"
                >Relationship</label
              >
              <select required v-model="relationship" class="form-control">
                <option disabled value>How are you related to the child</option>
                <option value="father">Father</option>
                <option value="mother">Mother</option>
                <option value="guardian">Guardian</option>
              </select>
            </div>

            <!-- VERIFY BLOCK  -->
            <div
              v-if="child_info !== ''"
              class="verify-block mgb-25 rounded-10"
            >
              <div class="left-section">
                <!-- CHILD AVATAR -->
                <div
                  class="avatar avatar-square"
                  :class="child_info.image ? 'border-brand-inverse' : null"
                >
                  <img
                    v-lazy="child_info.image"
                    :alt="$string.getStringInitials(child_info.full_name)"
                    class="avatar-img"
                    v-if="child_info.image"
                  />

                  <div
                    class="avatar-text"
                    v-else
                    :class="$color.getProfileBgColor(child_info.full_name)"
                  >
                    {{ $string.getStringInitials(child_info.full_name) }}
                  </div>
                </div>

                <div>
                  <div class="child-name brand-primary font-weight-700 mgb-4">
                    {{ child_info.full_name }}
                  </div>
                  <div
                    class="school-name color-grey-dark"
                    v-if="child_info.school"
                  >
                    {{ child_info.school }} ({{ child_info.class_name }})
                  </div>
                  <div class="school-name color-grey-dark" v-else>
                    {{ child_info.code }}
                  </div>
                </div>
              </div>

              <!-- CHECK AVATAR  -->
              <div class="avatar" v-if="false">
                <div class="icon icon-checked-fill"></div>
              </div>
            </div>

            <!-- CONNECT BUTTON  -->
            <button
              class="btn btn-accent mgb-10"
              :disabled="isDisabled"
              ref="connect"
              @click="connectExistingChild"
            >
              Connect Profile
            </button>

            <div class="gfont-14 color-ash mgt-15 font-weight-500 text-center">
              Can’t find your student?
              <router-link
                :to="{ name: 'ParentAddChild', query: $route.query }"
                class="brand-accent child-link"
              >
                Create Profile</router-link
              >
            </div>
          </div>
        </div>
      </template>
    </content-container-layout>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" mode="in-out" v-if="show_child_added_modal">
        <child-added-modal
          add_type="connect"
          :child_name="child_info.full_name.split(' ')[0]"
          @closeTriggered="toggleChildAddedModal"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import contentContainerLayout from "@/modules/onboarding/components/global-comps/content-container-layout";

export default {
  name: "connectChild",

  metaInfo: {
    title: "Connect a Child",
  },

  components: {
    contentContainerLayout,
    onboardingTabRow: () =>
      import(
        /* webpackChunkName: "onboarding-switcher" */ "@/modules/onboarding/components/global-comps/onboarding-tab-row"
      ),
    childAddedModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/modules/onboarding/modals/child-added-modal"
      ),
  },

  computed: {
    isDisabled() {
      if (this.class_name) return this.child_info ? false : true;
      return this.child_info && this.relationship ? false : true;
    },

    joinClassPayload() {
      return {
        use_child_token: true,
        code: this.class_code,
      };
    },

    getPageQuery() {
      return this.$route?.query?.page ? { page: this.$route.query.page } : "";
    },

    getChildForm() {
      return {
        code: this.child_code,
        relationship: this.class_name ? "Guardian" : this.relationship,
      };
    },
  },

  watch: {
    $route: {
      handler() {
        this.show_child_added_modal = false;
      },
      immediate: false,
    },
  },

  data() {
    return {
      child_code: "",
      child_info: "",
      relationship: "",
      searching: false,

      class_name: this.$route?.query?.class_name,
      school_name: this.$route?.query?.school_name,
      school_logo: this.$route?.query?.school_logo,
      class_id: this.$route?.query?.id,
      class_code: this.$route?.query?.class_code,
      global_class_id: this.$route?.query?.global_class_id,

      show_child_added_modal: false,

      join_class_payload: {
        use_child_token: true,
        code: this.class_id,
      },
    };
  },

  methods: {
    ...mapActions({
      verifyCode: "onboarding/verifyCode",
      connectChild: "onboarding/connectChild",
      updateOnboarding: "onboarding/updateOnboarding",
      studentJoinClass: "onboarding/studentJoinClass",
      getChildToken: "general/getChildToken",
    }),

    async childJoinClass(id) {
      await this.getChildToken(id);
      await this.studentJoinClass(this.joinClassPayload);
    },

    searchChildCode() {
      this.searching = true;

      this.verifyCode(this.child_code)
        .then((response) => {
          this.searching = false;

          if (response.code === 200) {
            // console.log(response);
            this.child_info = response.data;
            this.pushAlert("Child's data was found", "success");
          } else {
            this.pushAlert("Invalid child code", "warning");
          }
        })
        .catch(() => {
          this.searching = false;
          this.pushAlert("error verifying code", "error");
        });
    },

    connectExistingChild() {
      this.handleClick("connect", "Connecting Child..");

      this.connectChild(this.getChildForm)
        .then(async (response) => {
          this.handleClick("connect", "Connect Child", false);

          if (response.code === 200) {
            this.pushAlert("Connection to child was successful!", "success");
            this.toggleChildAddedModal();
            if (this.class_name) await this.childJoinClass(response.data.id);
            this.updateOnboarding();
          } else if (response.code === 406) {
            this.child_info = "";
            this.pushAlert("Child already exist!", "warning");
          } else {
            this.child_info = "";
            this.pushAlert("Failed to connect child", "warning");
          }
        })
        .catch(() => {
          this.child_info = "";
          this.handleClick("connect", "Connect Child", false);
          this.pushAlert("Error connecting to child!", "error");
        });
    },

    toggleChildAddedModal() {
      this.show_child_added_modal = !this.show_child_added_modal;
    },

    navigateToBase() {
      let previous_page = this.$route.query.page;
      this.$router.push(previous_page ? previous_page : "/");
    },
  },
};
</script>

<style lang="scss" scoped>
.meta-text {
  @include font-height(15.75, 25);
  margin-top: toRem(3);
  margin-bottom: toRem(14);
  width: 70%;

  @include breakpoint-down(sm) {
    @include font-height(15, 22);
    margin-top: toRem(7);
    margin-bottom: toRem(22);
  }

  @include breakpoint-down(xs) {
    @include font-height(14.25, 19);
    width: 80%;
  }
}

.class-block {
  padding: toRem(8);
  border: 1.5px solid $brand-inverse-light;
  border-radius: toRem(12);
  margin: toRem(5) auto toRem(20) auto;
  min-width: 350px;
  max-width: 90%;
  @include flex-row-start-nowrap;

  @include breakpoint-down(xs) {
    min-width: 300px;
    max-width: 96%;
  }

  .school-logo {
    @include square-shape(45);
    margin-right: toRem(15);
    position: relative;

    img {
      width: 100%;
      height: 100%;
      @include center-placement;
    }
  }
}

.connect-child {
  .alert-block {
    padding: toRem(12) toRem(30);
    @include font-height(11.5, 17);

    @include breakpoint-down(xs) {
      @include font-height(11, 16);
    }
  }

  .onboarding-form-wrapper {
    @include breakpoint-down(xs) {
      margin-top: toRem(10) !important;
    }

    .verify-btn {
      @include center-y;
      font-size: toRem(12);
      letter-spacing: 0.045em;
      right: toRem(13);
      font-weight: 700;

      @include breakpoint-down(xs) {
        font-size: toRem(10.5);
      }
    }

    .verify-block {
      position: relative;
      margin-top: toRem(-6);
      padding: toRem(8);
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
      @include flex-row-between-nowrap;
      min-width: toRem(310);
      border-radius: toRem(15) !important;

      @include breakpoint-down(lg) {
        padding: toRem(11);
        border-radius: toRem(12) !important;
      }

      .left-section {
        @include flex-row-start-nowrap;

        .avatar {
          @include square-shape(42);
          margin-right: toRem(12);

          @include breakpoint-down(xs) {
            @include square-shape(40);
            margin-right: toRem(8);
          }
        }
      }

      .child-name {
        @include font-height(12.25, 17);
        letter-spacing: 0.02em;

        @include breakpoint-down(lg) {
          @include font-height(12, 16);
          letter-spacing: 0.01em;
        }

        @include breakpoint-down(xs) {
          @include font-height(11, 15);
          letter-spacing: 0.01em;
        }
      }

      .school-name {
        @include font-height(11.5, 16);
        letter-spacing: 0.035em;

        @include breakpoint-down(lg) {
          @include font-height(11.25, 16);
          letter-spacing: 0.03em;
        }

        @include breakpoint-down(xs) {
          @include font-height(11, 16);
          letter-spacing: 0.03em;
        }
      }

      .avatar {
        @include square-shape(34);

        @include breakpoint-down(lg) {
          @include square-shape(32);
        }

        .icon {
          @include center-placement;
          color: rgba($brand-green, 0.9);
          font-size: toRem(23);

          @include breakpoint-down(lg) {
            font-size: toRem(20);
          }
        }
      }
    }

    .info-text {
      @include font-height(12.75, 17);

      @include breakpoint-down(lg) {
        @include font-height(11.75, 16);
      }
    }
  }
}

.child-link {
  text-decoration: underline;
}

.gradely-logo {
  margin: toRem(90) auto 0 auto;
  display: block;

  @include breakpoint-down(md) {
    margin: toRem(70) auto 0 auto;
  }
}

.content-layout {
  padding-top: toRem(35);
}
</style>
