<template>
  <div
    class="school-setup gradely-container px-0 px-sm-3 px-md-4 px-xl-5 mx-auto"
  >
    <!-- PAGE TITLE  -->
    <div class="page-title brand-primary font-weight-700 text-center">
      School Setup
    </div>

    <!-- SETUP BLOCK  -->
    <div class="row mx-auto w-100">
      <div class="col-12 col-md-10 col-xl-8 mx-auto">
        <div
          class="setup-block position-relative white-text-bg rounded-12 w-100"
        >
          <!-- TOP BLOCK  -->
          <div class="top-block">
            <div class="title-text color-text text-center">
              Setup your classes
            </div>

            <!-- BLOCK TITLE  -->
            <div class="block-title">SCHOOL TYPE</div>

            <!-- SCHOOL LIST  -->
            <div class="school-list">
              <!-- PRIMARY SCHOOL ONLY  -->
              <label for="primarySch" class="radio-inline">
                <input
                  type="radio"
                  value="primary"
                  v-model="form.school_type"
                  id="primarySch"
                />
                <div class="text color-text">Nursery and Primary school</div>
              </label>

              <!-- SECONDARY SCHOOL ONLY  -->
              <label for="secondarySch" class="radio-inline">
                <input
                  type="radio"
                  value="secondary"
                  v-model="form.school_type"
                  id="secondarySch"
                />
                <div class="text color-text">Secondary school only</div>
              </label>

              <!-- PRIMARY AND SECONDARY SCHOOL  -->
              <label for="primarySecondarySch" class="radio-inline">
                <input
                  type="radio"
                  value="all"
                  v-model="form.school_type"
                  id="primarySecondarySch"
                />
                <div class="text color-text">
                  Nursery, Primary and Secondary school
                </div>
              </label>
            </div>

            <!-- BLOCK TITLE  -->
            <div class="block-title">NAMING TYPE</div>

            <!-- NAMING LIST  -->
            <div class="naming-list">
              <!-- ITEM ONE  -->
              <label
                for="k12Style"
                class="name-item"
                :class="
                  form.school_format === 'year' ? 'border-brand-accent' : null
                "
              >
                <input
                  type="radio"
                  value="year"
                  v-model="form.school_format"
                  id="k12Style"
                />

                <!-- INFO  -->
                <div class="info">
                  <div class="title-text">Year 1-12</div>
                  <div class="description">
                    Use Key Stage 1-4 system of Year 1 - Year 12
                  </div>
                </div>
              </label>

              <!-- ITEM TWO  -->
              <label
                for="defaultStyle"
                class="name-item"
                :class="
                  form.school_format === 'ss' ? 'border-brand-accent' : null
                "
              >
                <input
                  type="radio"
                  value="ss"
                  v-model="form.school_format"
                  id="defaultStyle"
                />

                <!-- INFO  -->
                <div class="info">
                  <div class="title-text">Primary 1-6/ JSS 1-SS 3</div>
                  <div class="description">
                    Use the defualt Nigerian class naming style of nursery,
                    primary, Junior and Senior secondary class
                  </div>
                </div>
              </label>
            </div>
          </div>

          <!-- BOTTOM BLOCK  -->
          <div class="bottom-block brand-inverse-light-bg">
            <!-- BACK BUTTON  -->
            <button class="btn btn-whitish" @click="$router.back(-1)">
              Back
            </button>

            <!-- CONTINUE BUTTON  -->
            <button
              class="btn btn-accent"
              :disabled="isDisabled"
              ref="continue"
              @click="setSchoolUp"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "schoolSetup",

  computed: {
    isDisabled() {
      return this.form.school_type && this.form.school_format ? false : true;
    },
  },

  data: () => ({
    form: {
      school_type: null,
      school_format: null,
    },
  }),

  methods: {
    ...mapActions({
      setUpSchool: "onboarding/setUpSchool",
      updateOnboarding: "onboarding/updateOnboarding",
    }),

    setSchoolUp() {
      this.handleClick("continue", "Creating class...");
      this.pushAlert("Creating school classes", "loading");

      // if (this.getAuthUser.is_boarded === 1) {
      //   this.handleClick("continue", "Continue", false);
      //   this.pushAlert(
      //     "Your school classes has already been created!",
      //     "warning"
      //   );
      //   return false;
      // }

      this.setUpSchool(this.form)
        .then(async (response) => {
          this.handleClick("continue", "Continue", false);

          if (response.code === 200) {
            this.pushAlert("School classes created successfully!", "success");

            await this.updateOnboarding();

            setTimeout(
              () => this.$router.push({ name: "DashboardHome" }),
              1600
            );
          } else this.pushAlert("Failed to set up school", "warning");
        })
        .catch(() => {
          this.handleClick("continue", "Continue", false);
          this.pushAlert("Error setting up school", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.school-setup {
  @include flex-column-center;
  justify-content: flex-start;
  height: 100%;

  .page-title {
    @include font-height(26, 42);
    margin-top: toRem(65);
    margin-bottom: toRem(40);

    @include breakpoint-down(md) {
      margin-top: toRem(50);
      @include font-height(24, 38);
      margin-bottom: toRem(30);
    }

    @include breakpoint-down(sm) {
      @include font-height(21, 34);
    }

    @include breakpoint-down(xs) {
      margin-top: toRem(40);
      @include font-height(19, 32);
    }

    @include breakpoint-custom-down(380) {
      @include font-height(18, 28);
      margin-bottom: toRem(25);
    }
  }

  .setup-block {
    box-shadow: 0 0 toRem(2) rgba($black-text, 0.15);
    margin-bottom: toRem(50);

    .top-block {
      padding: toRem(35) toRem(50);

      @include breakpoint-down(sm) {
        padding: toRem(30);
      }

      @include breakpoint-down(xs) {
        padding: toRem(20) toRem(15);
      }

      .title-text {
        @include font-height(16, 22);
        margin-bottom: toRem(30);

        @include breakpoint-down(sm) {
          @include font-height(15, 19);
          margin-bottom: toRem(25);
        }

        @include breakpoint-down(xs) {
          @include font-height(14, 18);
        }

        @include breakpoint-custom-down(380) {
          @include font-height(13, 17);
          margin-bottom: toRem(20);
        }
      }

      .block-title {
        @include font-height(12.25, 16);
        color: $color-grey-dark;
        margin-bottom: toRem(10);
        font-weight: 500;

        @include breakpoint-down(sm) {
          @include font-height(12, 16);
        }

        @include breakpoint-down(xs) {
          @include font-height(10.5, 15);
        }
      }

      .school-list {
        margin-bottom: toRem(25);
        @include flex-column-start-start;

        label {
          @include flex-row-start-nowrap;
          margin-left: 0 !important;
          padding: toRem(6) 0;
          margin-bottom: 0;
          cursor: pointer;
          width: max-content;

          input {
            margin-right: toRem(8);
          }

          .text {
            font-size: toRem(12.5);

            @include breakpoint-down(sm) {
              font-size: toRem(12);
            }

            @include breakpoint-down(xs) {
              font-size: toRem(11.5);
            }
          }
        }
      }

      .naming-list {
        margin-bottom: 0;

        .name-item {
          @include flex-row-start-nowrap;
          @include transition(0.4s);
          align-items: flex-start;
          border: toRem(1) solid $border-grey;
          padding: toRem(15) toRem(20);
          border-radius: toRem(5);
          margin-bottom: toRem(10);
          cursor: pointer;

          @include breakpoint-down(sm) {
            padding: toRem(14) toRem(15);
          }

          @include breakpoint-down(xs) {
            padding: toRem(12);
          }

          @include breakpoint-custom-down(380) {
            padding: toRem(10);
          }

          &:hover {
            border: toRem(1) solid $brand-accent;
          }

          input {
            position: relative;
            top: toRem(1);
            margin-right: toRem(15);

            @include breakpoint-down(xs) {
              margin-right: toRem(10);
            }
          }

          .title-text {
            @include font-height(13, 18);
            margin-bottom: toRem(8);
            color: $color-text;
            font-weight: 600;

            @include breakpoint-down(sm) {
              @include font-height(12, 17);
            }

            @include breakpoint-down(xs) {
              @include font-height(11.5, 17);
              margin-bottom: toRem(6);
              font-weight: 500;
            }
          }

          .description {
            @include font-height(12, 20);
            letter-spacing: 0.02em;
            color: $color-ash;

            @include breakpoint-down(sm) {
              @include font-height(11, 19);
            }

            @include breakpoint-down(xs) {
              @include font-height(10.5, 17);
            }
          }
        }
      }
    }

    .bottom-block {
      @include flex-row-between-nowrap;
      padding: toRem(15) toRem(40);

      @include breakpoint-down(sm) {
        padding: toRem(15) toRem(30);
      }

      @include breakpoint-down(xs) {
        padding: toRem(10) toRem(15);
      }

      .btn {
        font-size: toRem(10);
        padding: toRem(10) toRem(24);

        @include breakpoint-down(xs) {
          font-size: toRem(9);
          padding: toRem(9) toRem(22);
        }
      }
    }
  }
}
</style>
