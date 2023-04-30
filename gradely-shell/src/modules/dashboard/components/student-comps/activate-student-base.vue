<template>
  <div>
    <!-- MOBILE TOP  -->
    <div class="mobile-view d-md-none position-fixed w-100">
      <div
        class="gradely-container px-2 px-sm-3 px-md-5 px-lg-4 px-xl-5 h-auto mx-auto"
      >
        <div class="d-flex justify-content-start align-items-center">
          <!-- BASIC LICENSE -->
          <div class="license">
            <div class="top">
              <div class="text brand-navy font-weight-600">
                {{ getBasicLicenseUsed }} of {{ getBasicLicenseTotal }}
              </div>

              <!-- ICON WRAPPER  -->
              <div class="position-relative icon-wrapper">
                <div
                  class="icon icon-circle-question-mark"
                  :aria-label="
                    'You have used ' +
                      getBasicLicenseUsed +
                      ' out of the ' +
                      getBasicLicenseTotal +
                      ' Basic licenses purchased.'
                  "
                ></div>

                <!-- HINT DROPDOWN  -->
                <div class="hint-dropdown box-shadow-effect smooth-animation">
                  <div class="item">
                    You have used {{ getBasicLicenseUsed }} out of the
                    {{ getBasicLicenseTotal }}
                    Basic licenses purchased.
                  </div>
                </div>
              </div>
            </div>
            <div class="bottom color-grey-dark">Basic License</div>
          </div>

          <!-- PREMIUM LICENSE  -->
          <div class="license">
            <div class="top">
              <div class="text brand-navy font-weight-600">
                {{ getPremiumLicenseUsed }} of {{ getPremiumLicenseTotal }}
              </div>

              <!-- ICON WRAPPER  -->
              <div class="position-relative icon-wrapper">
                <div
                  class="icon icon-circle-question-mark"
                  :aria-label="
                    'You have used ' +
                      getPremiumLicenseUsed +
                      ' out of the ' +
                      getPremiumLicenseTotal +
                      ' Premium licenses purchased.'
                  "
                ></div>

                <!-- HINT DROPDOWN  -->
                <div class="hint-dropdown box-shadow-effect smooth-animation">
                  <div class="item">
                    You have used {{ getPremiumLicenseUsed }} out of the
                    {{ getPremiumLicenseTotal }}
                    Premium licenses purchased.
                  </div>
                </div>
              </div>
            </div>
            <div class="bottom color-grey-dark">Premium License</div>
          </div>

          <!-- STUDENT SELECTIONS -->
          <div class="license">
            <div class="top">
              <div class="text brand-navy font-weight-600">
                {{ getStudentSelected.length }} of {{ total_students }}
              </div>

              <!-- ICON WRAPPER  -->
              <div class="position-relative icon-wrapper">
                <div
                  class="icon icon-circle-question-mark"
                  aria-label="You have used 86 out of the 200 Basic licenses purchased."
                ></div>

                <!-- HINT DROPDOWN  -->
                <div class="hint-dropdown box-shadow-effect smooth-animation">
                  <div class="item">
                    You have used 86 out of the 200 Basic licenses purchased.
                  </div>
                </div>
              </div>
            </div>
            <div class="bottom color-grey-dark">Selected</div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="activate-student-base brand-navy-bg position-fixed bottom-0 w-100 white-text index-9"
    >
      <div
        class="gradely-container px-2 px-sm-3 px-md-5 px-lg-4 px-xl-5 h-auto mx-auto"
      >
        <div class="d-flex justify-content-between align-items-end wrap">
          <!-- LEFT CONTENT  -->
          <div class="left-section">
            <!-- BASIC LICENSE -->
            <div class="license">
              <div class="top">
                <div class="text brand-inverse-light">
                  {{ getBasicLicenseUsed }} of {{ getBasicLicenseTotal }}
                </div>

                <!-- ICON WRAPPER  -->
                <div class="position-relative icon-wrapper">
                  <div
                    class="icon icon-circle-question-mark"
                    :aria-label="
                      'You have used ' +
                        getBasicLicenseUsed +
                        ' out of the ' +
                        getBasicLicenseTotal +
                        ' Basic licenses purchased.'
                    "
                  ></div>

                  <!-- HINT DROPDOWN  -->
                  <div class="hint-dropdown box-shadow-effect smooth-animation">
                    <div class="item">
                      You have used {{ getBasicLicenseUsed }} out of the
                      {{ getBasicLicenseTotal }}
                      Basic licenses purchased.
                    </div>
                  </div>
                </div>
              </div>
              <div class="bottom border-grey-dark">Basic License</div>
            </div>

            <!-- PREMIUM LICENSE -->
            <div class="license">
              <div class="top">
                <div class="text brand-inverse-light">
                  {{ getPremiumLicenseUsed }} of {{ getPremiumLicenseTotal }}
                </div>

                <!-- ICON WRAPPER  -->
                <div class="position-relative icon-wrapper">
                  <div
                    class="icon icon-circle-question-mark"
                    :aria-label="
                      'You have used ' +
                        getPremiumLicenseUsed +
                        ' out of the ' +
                        getPremiumLicenseTotal +
                        ' Premium licenses purchased.'
                    "
                  ></div>

                  <!-- HINT DROPDOWN  -->
                  <div class="hint-dropdown box-shadow-effect smooth-animation">
                    <div class="item">
                      You have used {{ getPremiumLicenseUsed }} out of the
                      {{ getPremiumLicenseTotal }}
                      Premium licenses purchased.
                    </div>
                  </div>
                </div>
              </div>
              <div class="bottom border-grey-dark">Premium License</div>
            </div>
          </div>

          <!-- RIGHT CONTENT  -->
          <div class="right-section">
            <!-- LICENSE SELECTION  -->
            <div class="license-selection">
              <div class="top">
                <div class="text brand-inverse-light">Select a License</div>

                <!-- ICON WRAPPER  -->
                <div class="position-relative icon-wrapper">
                  <div
                    class="icon icon-circle-question-mark"
                    aria-label="You have used 86 out of the 200 Basic licenses purchased."
                  ></div>

                  <!-- HINT DROPDOWN  -->
                  <div class="hint-dropdown box-shadow-effect smooth-animation">
                    <div class="item">
                      Make a selection from our list of customised licenses
                    </div>
                  </div>
                </div>
              </div>

              <!-- LICENSE SELECT  -->
              <select class="form-control bottom" v-model="license_status">
                <option disabled selected value="">Select Plan</option>
                <option value="disabled">Disable</option>
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
              </select>
            </div>

            <div class="btn-row d-flex justify-content-end align-items-end">
              <!-- CANCEL BUTTON  -->
              <button class="btn cancel-btn" @click="cancelSelection">
                Cancel
              </button>

              <!-- CONFIRM BUTTON  -->
              <button
                class="btn btn-accent confirm-btn"
                :disabled="isDisabled"
                ref="activateBtn"
                @click="confirmActivation"
              >
                Confirm Activation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "activateStudentBase",

  props: {
    license: {
      type: Object,
      default: () => ({
        basic: {
          total: 0,
          used: 0,
        },
        premium: {
          total: 0,
          used: 0,
        },
      }),
    },

    total_students: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    ...mapGetters({
      getStudentSelected: "dbStudent/getStudentSelected",
    }),

    isDisabled() {
      return this.getStudentSelected.length && this.license_status
        ? false
        : true;
    },

    getBasicLicenseUsed() {
      return this.license?.basic?.used;
    },

    getBasicLicenseTotal() {
      return this.license?.basic?.total;
    },

    getPremiumLicenseUsed() {
      return this.license?.premium?.used;
    },

    getPremiumLicenseTotal() {
      return this.license?.premium?.total;
    },
  },

  data: () => ({
    license_status: "",
  }),

  methods: {
    ...mapActions({
      updateStudentSubscription: "dbStudent/updateStudentSubscription",
      updateStudentSelection: "dbStudent/updateStudentSelection",
    }),

    cancelSelection() {
      this.license_status = "";
      this.updateStudentSelection({ ids: [], bulk: true });
      this.$bus.$emit("toggleStudentSelection", false);
      this.$bus.$emit("clearOut");
    },

    confirmActivation() {
      this.handleClick("activateBtn", "Activating...");

      let payload = {
        student_id: this.getStudentSelected,
        status: this.license_status,
      };

      this.updateStudentSubscription(payload)
        .then((response) => {
          this.handleClick("activateBtn", "Confirm Activation", false);

          if (response.code === 200) {
            this.pushAlert(
              "Subscription activation was successful!",
              "success"
            );

            this.$bus.$emit("reloadState");
          } else this.pushAlert("Subscription activation failed", "warning");
        })
        .catch(() => {
          this.handleClick("activateBtn", "Confirm Activation", false);
          this.pushAlert("Error activating subscription", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.mobile-view {
  bottom: toRem(70);
  z-index: 9;
  background: #f0f0f0;
  padding-top: toRem(10);
  padding-bottom: toRem(25);

  @include breakpoint-custom-down(548) {
    bottom: toRem(100);
    padding-top: toRem(16);
    padding-bottom: toRem(34);
  }

  @include breakpoint-custom-down(548) {
    bottom: toRem(100);
    padding-top: toRem(16);
    padding-bottom: toRem(34);
  }
}

.license {
  margin-right: toRem(38);

  @include breakpoint-down(xl) {
    margin-right: toRem(30);
  }

  @include breakpoint-down(lg) {
    margin-right: toRem(20);
  }

  @include breakpoint-down(sm) {
    margin-right: toRem(18);
  }

  &:last-of-type {
    margin-right: 0;
  }

  .top {
    @include flex-row-start-nowrap;
    @include font-height(14.75, 20);
    margin-bottom: toRem(4);

    @include breakpoint-down(xl) {
      @include font-height(13.25, 18);
      margin-bottom: toRem(2);
    }

    @include breakpoint-down(sm) {
      @include font-height(13, 18);
    }

    @include breakpoint-down(xs) {
      @include font-height(12.25, 16);
    }

    .text {
      margin-right: toRem(15);

      @include breakpoint-down(xl) {
        margin-right: toRem(12);
      }
    }
  }

  .bottom {
    @include font-height(12, 16);

    @include breakpoint-down(xl) {
      @include font-height(11, 15);
    }

    @include breakpoint-down(sm) {
      @include font-height(10.5, 14);
    }

    @include breakpoint-down(xs) {
      @include font-height(10.25, 13);
    }
  }
}

.activate-student-base {
  padding-top: toRem(21);
  padding-bottom: toRem(21);

  @include breakpoint-down(lg) {
    padding-top: toRem(18);
    padding-bottom: toRem(18);
  }

  @include breakpoint-down(sm) {
    padding-top: toRem(14);
    padding-bottom: toRem(14);
  }

  .left-section {
    @include flex-row-start-nowrap;
    align-items: flex-end;

    @include breakpoint-down(md) {
      display: none;
    }
  }

  .icon-wrapper {
    .icon {
      color: $brand-inverse;
      @include transition(0.4s);
      font-size: toRem(16);
      cursor: pointer;

      @include breakpoint-down(xl) {
        font-size: toRem(14.5);
      }

      @include breakpoint-down(md) {
        font-size: toRem(13.5);
      }

      @include breakpoint-down(xs) {
        font-size: toRem(13.25);
      }
    }

    .hint-dropdown {
      width: toRem(195);
      top: toRem(-68);
      left: toRem(-88);

      &::after {
        top: 96%;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);

        @include breakpoint-down(sm) {
        }
      }

      .item {
        color: $brand-navy;
        @include font-height(11.75, 17);
        font-family: Noto Sans;
      }
    }

    &:hover {
      .icon {
        color: $brand-accent;
      }

      .hint-dropdown {
        display: unset;
      }
    }
  }

  .right-section {
    @include flex-row-end-wrap;
    align-items: flex-end;

    @include breakpoint-down(md) {
      align-items: center;
      width: 100%;
    }

    .license-selection {
      @include breakpoint-down(md) {
        @include flex-row-end-nowrap;
      }

      @include breakpoint-down(sm) {
        border: 1px solid transparent;
        margin-bottom: toRem(10);
      }

      .top {
        @include flex-row-start-nowrap;
        @include font-height(12.75, 18);
        margin-bottom: toRem(8);

        @include breakpoint-down(xl) {
          @include font-height(11.75, 17);
          margin-bottom: toRem(7);
        }

        @include breakpoint-down(md) {
          @include font-height(11, 16);
          margin-bottom: 0;
          margin-right: toRem(15);
        }

        @include breakpoint-down(xs) {
          margin-right: toRem(12);
        }

        .text {
          margin-right: toRem(15);

          @include breakpoint-down(md) {
            margin-right: toRem(10);
          }

          @include breakpoint-down(xs) {
            margin-right: toRem(7);
          }
        }
      }

      .bottom {
        @include flex-row-between-nowrap;
        padding: toRem(10.5) toRem(14);
        width: toRem(260);

        @include breakpoint-down(xl) {
          padding: toRem(10);
          width: toRem(230);
        }

        @include breakpoint-down(lg) {
          width: toRem(180);
        }

        @include breakpoint-down(md) {
          padding: toRem(8.5);
          width: toRem(160);
          font-size: toRem(12.5);
        }

        @include breakpoint-down(xs) {
          padding: toRem(8);
          width: toRem(170);
        }

        .content {
          @include font-height(12.75, 16);

          @include breakpoint-down(xl) {
            @include font-height(11.75, 16);
          }

          @include breakpoint-down(md) {
            @include font-height(11, 15);
          }

          @include breakpoint-down(xs) {
            @include font-height(10.5, 14);
          }
        }

        .icon {
          font-size: toRem(13);
          margin-top: toRem(3);

          @include breakpoint-down(xl) {
            font-size: toRem(11);
          }

          @include breakpoint-down(xs) {
            font-size: toRem(10);
          }
        }
      }
    }

    .btn {
      padding: toRem(12) toRem(22) !important;
      font-size: toRem(10.75);

      @include breakpoint-down(xl) {
        padding: toRem(10) toRem(18) !important;
        font-size: toRem(9.5);
      }

      @include breakpoint-down(md) {
        // padding: toRem(10) toRem(18) !important;
      }
    }

    .cancel-btn {
      margin-left: toRem(25);
      margin-right: toRem(20);
      border: toRem(1) solid $white-text;
      padding: toRem(10.25) toRem(20);

      @include breakpoint-down(xl) {
        margin-left: toRem(20);
        margin-right: toRem(15);
        padding: toRem(9) toRem(16);
      }

      @include breakpoint-down(lg) {
        margin-left: toRem(15);
        margin-right: toRem(10);
      }

      @include breakpoint-down(md) {
        padding: toRem(7.75) toRem(14);
      }

      &:hover {
        background: $white-text;
        color: $brand-primary;
      }
    }
  }
}
</style>
