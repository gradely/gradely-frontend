<template>
  <div class="school-intro-row w-100 position-relative">
    <!-- SCHOOL LOGO  -->
    <div class="school-logo rounded-10 white-text-bg position-relative">
      <img
        v-lazy="school.logo ? school.logo : mxStaticImg('GradelyIcon.svg')"
        alt=""
      />
    </div>

    <!-- SCHOOL INFO  -->
    <div class="school-info position-relative">
      <!-- TOP  -->
      <div class="top">
        <div class="title-text color-text font-weight-700 mb-2">
          {{ school.name ? school.name : getAuthUser.school_name }}
        </div>

        <div class="sub-text border-grey-dark">
          {{
            school.tagline ? school.tagline : "School tagline content here.."
          }}
        </div>
      </div>

      <!-- BOTTOM  -->
      <div class="bottom">
        <!-- CURRICULUM  -->
        <div class="info-column">
          <div class="title">CURRICULUM</div>
          <div class="value" v-if="getSchoolCurriculum">
            {{ getSchoolCurriculum }}
          </div>
          <div class="value not-set" v-else>
            Not set
          </div>
        </div>

        <!-- BOARDING TYPE  -->
        <div class="info-column">
          <div class="title">BOARDING TYPE</div>
          <div class="value text-capitalize" v-if="getBoardingType">
            {{ getBoardingType }}
          </div>
          <div class="value not-set" v-else>
            Not set
          </div>
        </div>

        <!-- BOARDING TYPE  -->
        <div class="info-column">
          <div class="title">EDUCATIONAL SCOPE</div>
          <div class="value text-capitalize" v-if="getEducationScope">
            {{ getEducationScope }}
          </div>
          <div class="value not-set" v-else>
            Not set
          </div>
        </div>

        <!-- BOARDING TYPE  -->
        <div class="info-column">
          <div class="title">DATE ESTABLISHED</div>
          <div class="value" v-if="getDateEstablished">
            {{ getDateEstablished }}
          </div>
          <div class="value not-set" v-else>
            Not set
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "schoolIntroRow",

  props: {
    school: {
      type: Object,
      default: () => ({
        logo: "",
        name: "",
        tagline: "",
        curriculum: [],
        boarding_type: "",
        school_type: "",
        establish_date: "",
      }),
    },
  },

  computed: {
    getSchoolCurriculum() {
      if (this.school.curriculum) {
        let curriculum_list = [];
        this.school.curriculum.map((curriculum) =>
          curriculum_list.push(curriculum.title)
        );

        return curriculum_list.join(" / ");
      } else return false;
    },

    getBoardingType() {
      if (this.school.boarding_type === "dayboarding")
        return "Day and Boarding";
      else if (this.school.boarding_type) return this.school.boarding_type;
      else return false;
    },

    getEducationScope() {
      if (this.school.school_type) {
        if (this.school.school_type === "all")
          return "Nursery, Primary and Secondary";
        else return this.school.school_type;
      } else return false;
    },

    getDateEstablished() {
      if (this.school.establish_date)
        return this.$date.getReadableDate(this.school.establish_date);
      else return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.school-intro-row {
  @include flex-row-start-nowrap;

  .school-logo {
    @include square-shape(230);
    box-shadow: toRem(1) toRem(4) toRem(20) rgba(0, 0, 0, 0.15);
    margin-right: toRem(30);
    top: toRem(-50);

    @include breakpoint-down(xl) {
      @include square-shape(200);
      margin-right: toRem(25);
    }

    @include breakpoint-down(lg) {
      @include square-shape(190);
      top: toRem(-65);
    }

    @include breakpoint-down(md) {
      margin-right: toRem(20);
      @include square-shape(160);
      top: toRem(-80);
    }

    @include breakpoint-down(sm) {
      margin-right: toRem(18);
      @include square-shape(145);
      top: toRem(-80);
      border-radius: toRem(5) !important;
    }

    @include breakpoint-down(xs) {
      @include square-shape(120);
      margin-right: toRem(15);
      top: toRem(-100);
    }

    @include breakpoint-custom-down(390) {
      @include square-shape(100);
      margin-right: toRem(10);
    }

    @include breakpoint-custom-down(340) {
      @include square-shape(92);
      top: toRem(-98);
    }

    @include breakpoint-custom-down(330) {
      top: toRem(-125);
    }

    img {
      @include center-placement;
      height: auto;
      min-width: toRem(130);
      width: auto;
      max-width: toRem(150);

      @include breakpoint-down(xl) {
        min-width: toRem(90);
        width: auto;
        max-width: toRem(110);
      }

      @include breakpoint-down(lg) {
        min-width: toRem(80);
        width: auto;
        max-width: toRem(100);
      }

      @include breakpoint-down(md) {
        min-width: toRem(65);
        width: auto;
        max-width: toRem(85);
      }

      @include breakpoint-down(sm) {
        min-width: toRem(60);
        width: auto;
        max-width: toRem(80);
      }

      @include breakpoint-down(xs) {
        min-width: toRem(55);
        width: auto;
        max-width: toRem(75);
      }

      @include breakpoint-custom-down(390) {
        min-width: toRem(50);
        width: auto;
        max-width: toRem(65);
      }

      @include breakpoint-custom-down(340) {
        min-width: toRem(40);
        width: auto;
        max-width: toRem(57);
      }
    }
  }

  .school-info {
    top: toRem(-15);

    @include breakpoint-down(lg) {
      top: toRem(-35);
    }

    @include breakpoint-down(md) {
      top: toRem(-10);
    }

    @include breakpoint-down(sm) {
      top: 0;
    }

    .top {
      margin-bottom: toRem(30);

      .title-text {
        @include font-height(28, 40);

        @include breakpoint-down(xl) {
          @include font-height(24, 35);
        }

        @include breakpoint-down(lg) {
          @include font-height(23, 31);
        }

        @include breakpoint-down(md) {
          @include font-height(21, 28);
        }

        @include breakpoint-down(sm) {
          @include font-height(19, 26);
        }

        @include breakpoint-down(xs) {
          @include font-height(17.5, 24);
        }

        @include breakpoint-custom-down(390) {
          @include font-height(16, 20);
        }

        @include breakpoint-custom-down(340) {
          @include font-height(14.5, 19);
        }
      }

      .sub-text {
        @include font-height(14.25, 19);

        @include breakpoint-down(xl) {
          @include font-height(13.5, 18);
        }

        @include breakpoint-down(lg) {
          @include font-height(13, 17);
        }

        @include breakpoint-down(md) {
          @include font-height(12.5, 16);
        }

        @include breakpoint-down(sm) {
          @include font-height(12.25, 15);
        }

        @include breakpoint-custom-down(390) {
          @include font-height(12, 14);
        }
      }
    }

    .bottom {
      @include flex-row-start-wrap;

      .info-column {
        margin-right: toRem(55);

        @include breakpoint-down(lg) {
          margin-right: toRem(30);
          margin-bottom: toRem(20);
        }

        @include breakpoint-down(md) {
          margin-right: toRem(35);
          margin-bottom: toRem(20);
        }

        @include breakpoint-down(xs) {
          margin-right: toRem(25);
        }

        &:last-of-type {
          margin-right: 0;
        }

        .title {
          @include font-height(12.5, 17);
          margin-bottom: toRem(4);
          color: $border-grey-dark;

          @include breakpoint-down(xl) {
            @include font-height(11.5, 16);
          }

          @include breakpoint-down(lg) {
            @include font-height(10.5, 15);
          }

          @include breakpoint-down(md) {
            @include font-height(10.25, 14);
          }

          @include breakpoint-down(xs) {
            @include font-height(10, 12);
          }

          @include breakpoint-custom-down(390) {
            @include font-height(9.75, 10);
          }
        }

        .value {
          @include font-height(14.75, 21);
          font-weight: 700;
          color: $color-text;

          @include breakpoint-down(xl) {
            @include font-height(14.25, 20);
          }

          @include breakpoint-down(lg) {
            @include font-height(13.5, 19);
          }

          @include breakpoint-down(md) {
            @include font-height(13.25, 19);
          }

          @include breakpoint-down(xs) {
            @include font-height(12.5, 18);
          }

          @include breakpoint-custom-down(390) {
            @include font-height(11.75, 18);
          }
        }

        .not-set {
          color: $border-grey-dark;
          font-weight: normal;
        }
      }
    }
  }
}
</style>
