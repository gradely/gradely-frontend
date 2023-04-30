<template>
  <div class="connect-school">
    <onboarding-nav-layout :show_skip="false" @skip="nextFlow">
      <template slot="content">
        <div>
          <!-- IMAGE TOP  -->
          <div class="onboarding-image-top mgt-10">
            <img
              v-lazy="
                `${getAssetBaseURL(
                  'cloud',
                  'gradely'
                )}/image/upload/v1639030662/ConnectChildAvatar_pf4wea.png`
              "
              alt=""
            />
          </div>

          <!-- TITLE TEXT  -->
          <div
            class="
              onboarding-title-text
              text-center
              font-weight-700
              brand-navy
              mgb-10
            "
          >
            Connect with School
          </div>

          <!-- DESCRIPTION  -->
          <div class="onboarding-description color-ash mx-auto text-center">
            If your school is already registered, you can connect by entering
            the class code of your assigned class.
          </div>

          <!-- CLASS CODE  -->
          <div class="onboarding-form-wrapper mgt-50 mx-auto">
            <div class="form-group compact-row w-100">
              <label for="userinfo" class="label-compact label-sm"
                >Class Code</label
              >
              <input
                type="text"
                id="userinfo"
                class="form-control"
                placeholder="Enter your class code"
                required
                v-model="class_code"
              />

              <!-- VERIFY BUTTON  -->
              <div
                class="verify-btn btn-link index-1 link-no-underline"
                :class="class_code ? 'brand-accent' : 'border-grey-dark'"
              >
                <div v-if="!verifying" @click="verifyCode">
                  {{ verify_feedback }}
                </div>

                <div
                  v-if="verifying"
                  class="icon icon-dotted-spinner animate gfont-15 brand-accent"
                ></div>
              </div>
            </div>

            <!-- VERIFY BLOCK  -->
            <div
              v-if="class_name"
              class="verify-block mgb-25 rounded-10 border-brand-green w-100"
            >
              <div>
                <div class="class-name brand-primary font-weight-700 mgb-4">
                  {{ class_name }}
                </div>
                <div class="school-name color-grey-dark">
                  {{ school_name }}
                </div>
              </div>

              <!-- CHECK AVATAR  -->
              <div class="avatar">
                <div class="icon icon-checked-fill"></div>
              </div>
            </div>

            <!-- CONNECT BUTTON  -->
            <button
              class="btn btn-accent mgb-30"
              ref="connect"
              @click="connectToSchool"
              :disabled="!class_name"
            >
              Connect
            </button>

            <!-- INFO TEXT  -->
            <div class="info-text color-ash text-center">
              School not registered?

              <router-link :to="{ name: 'TeacherInviteSchool' }">
                <span class="btn-link font-weight-600">Invite your school</span>
              </router-link>
            </div>
          </div>
        </div>
      </template>
    </onboarding-nav-layout>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import onboardingNavLayout from "@/modules/onboarding/components/global-comps/onboarding-nav-layout";

export default {
  name: "connectSchool",

  metaInfo: {
    title: "Connect with School",
  },

  components: {
    onboardingNavLayout,
  },

  data() {
    return {
      verifying: false,
      class_code: "",
      class_id: "",
      class_name: "",
      school_name: "",
      verify_feedback: "VERIFY",
    };
  },

  watch: {
    class_code: {
      handler(value) {
        if (value.length >= 8) this.verifyCode();
      },
    },
  },

  methods: {
    ...mapActions({
      verifyClassCode: "onboarding/verifyClassCode",
      addTeacherToSchool: "onboarding/addTeacherToSchool",
      updateOnboarding: "onboarding/updateOnboarding",
    }),

    nextFlow() {
      this.$router.push({ path: "/" });
    },

    verifyCode() {
      this.verifying = true;

      this.verifyClassCode(this.class_code)
        .then((response) => {
          this.verifying = false;

          if (response.code === 200) {
            this.verify_feedback = "VERIFIED";

            setTimeout(() => {
              this.verify_feedback = "VERIFY";
            }, 1500);

            this.class_id = response.data.id;
            this.class_name = response.data.class_name;
            this.school_name = response.data.school.name;
          } else {
            this.pushAlert("Invalid class code. Please try again", "warning");
            this.class_name = "";
            this.school_name = "";
          }
        })
        .catch(() => {
          this.class_name = "";
          this.school_name = "";
          this.verifying = false;
          this.pushAlert("Error verifying code", "error");
        });
    },

    connectToSchool() {
      this.handleClick("connect", "Connecting...");

      this.addTeacherToSchool({ code: this.class_code })
        .then(async (response) => {
          this.handleClick("connect", "Connect", false);

          if (response.code === 200) {
            this.pushAlert(`Connected to ${this.school_name}`, "success");
            await this.updateOnboarding();
            this.$router.push({ path: "/" });
          } else if (response.code === 409) {
            this.pushAlert("You are already connected to class", "warning");
            setTimeout(
              () => this.$router.push({ path: `/feed/${this.class_id}` }),
              1700
            );
          } else this.pushAlert("Failed to connect to school", "warning");
        })
        .catch(() => {
          this.handleClick("connect", "Connect", false);
          this.pushAlert("Error connecting to school", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.connect-school {
  .onboarding-form-wrapper {
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
      margin-top: toRem(-18);
      padding: toRem(15);
      background: rgba($brand-green-light, 0.4);
      @include flex-row-between-nowrap;

      @include breakpoint-down(lg) {
        padding: toRem(11);
        border-radius: toRem(7) !important;
      }

      .class-name {
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
</style>
