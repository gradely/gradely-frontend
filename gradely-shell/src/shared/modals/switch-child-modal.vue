<template>
  <div class="switch-child-dialog smooth-animation">
    <div class="gradely-container px-1 px-sm-3 px-md-4 px-xl-2 mx-auto">
      <div class="row position-relative">
        <!-- CLOSE DIALOG -->
        <div
          class="close-dialog rounded-20 overflow-hidden smooth-transition pointer"
          title="Close dialog"
          @click="$emit('closeTriggered')"
        >
          <div class="position-relative w-100 h-100">
            <div class="icon icon-close"></div>
          </div>
        </div>

        <!-- CONTENT AREA  -->
        <div class="content-area">
          <!-- CONTENT TOP -->
          <div class="content-top">
            <div class="title-text brand-navy font-weight-700 text-center">Switch Profile</div>

            <div
              class="meta-text color-ash text-center"
              v-if="false"
            >Add, remove or switch your child's profile!</div>
          </div>

          <!-- CONTENT BOTTOM -->
          <div class="content-bottom mgb-20">
            <!-- CHILD SELECT -->
            <template v-if="children.length">
              <select-child-card
                v-for="(child, index) in children"
                :key="index"
                :child="child"
                @childSelected="makeSelection($event)"
              />
            </template>

            <!-- ADD CHILD CARD -->
            <router-link
              :to="{
                name: 'ParentAddChild',
                query: { page: this.$route.path },
              }"
              class="add-child-card smooth-transition overflow-hidden rounded-15 pointer"
            >
              <!-- ADD CARD -->
              <div class="add-card smooth-transition">
                <div class="icon icon-plus brand-navy"></div>
              </div>

              <!-- ADD TEXT -->
              <div>
                <div class="add-text font-weight-700 brand-navy">Add another Child</div>
                <div
                  class="gfont-12 mgt-7 color-grey-dark d-none d-sm-block"
                >Create or find your child on Gradely</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import childSelectCard from "@/shared/components/child-select-card";
import selectChildCard from "@/shared/components/select-child-card";

export default {
  name: "switchChildModal",

  components: {
    childSelectCard,
    selectChildCard,
  },

  props: {
    children: {
      type: Array,
    },
  },

  methods: {
    makeSelection(id) {
      this.$router
        .push({
          name: this.$router.currentRoute.name,
          params: { id },
        })
        .catch((error) => {
          if (error.name != "NavigationDuplicated") throw error;
        });
      this.$emit("closeTriggered");
    },
  },
};
</script>

<style lang="scss" scoped>
.switch-child-dialog {
  background: rgba($white-text, 0.99);
  @include fixed-display-area;
  @include transition(0.5s);
  overflow: auto !important;
  z-index: 2500;

  .close-dialog {
    position: absolute;
    top: toRem(50);
    right: toRem(50);
    background: $color-white;
    @include square-shape(42);

    @include breakpoint-down(lg) {
      @include square-shape(38);
    }

    @include breakpoint-down(md) {
      top: toRem(40);
      right: toRem(30);
    }

    @include breakpoint-custom-down(sm) {
      top: toRem(12);
      right: toRem(20);
    }

    .icon {
      @include center-placement;
      font-size: toRem(20);
      color: $brand-navy;

      @include breakpoint-down(lg) {
        font-size: toRem(18);
      }

      @include breakpoint-custom-down(380) {
        font-size: toRem(15);
      }
    }

    &:hover {
      background: $brand-accent-light;
    }
  }

  .content-area {
    position: relative;
    top: calc(13.5vh);
    width: 650px;
    max-width: 85%;
    margin: auto;

    @include breakpoint-down(lg) {
      width: 600px;
      max-width: 87%;
      top: calc(13vh);
    }

    @include breakpoint-down(md) {
      width: 600px;
      max-width: 95%;
      top: calc(13vh);
    }

    @include breakpoint-down(sm) {
      width: 500px;
      max-width: 94%;
      top: calc(12.5vh);
    }

    @include breakpoint-down(xs) {
      width: 98%;
    }

    .content-top {
      @include flex-column-start-center;
      margin-bottom: toRem(50);

      @include breakpoint-down(lg) {
        margin-bottom: toRem(45);
      }

      @include breakpoint-down(md) {
        margin-bottom: toRem(40);
      }

      @include breakpoint-down(sm) {
        @include flex-row-start-nowrap;
        margin-bottom: toRem(35);
      }

      @include breakpoint-down(xs) {
        margin-bottom: toRem(20);
      }

      .title-text {
        @include font-height(26, 36);

        @include breakpoint-down(lg) {
          @include font-height(24, 34);
        }

        @include breakpoint-down(md) {
          @include font-height(22, 32);
        }

        @include breakpoint-down(sm) {
          padding-left: toRem(15);
        }

        @include breakpoint-down(xs) {
          @include font-height(18, 25);
        }
      }

      .meta-text {
        @include font-height(13.25, 22);
        margin-top: toRem(8);

        @include breakpoint-down(lg) {
          @include font-height(12.75, 21);
        }

        @include breakpoint-down(md) {
          @include font-height(12.5, 19);
        }
      }
    }

    .content-bottom {
      @include flex-row-center-wrap;
      align-items: flex-start;

      .add-child-card {
        @include flex-row-start-nowrap;
        gap: 0 toRem(20);
        width: 100%;
        border: 1px dashed $border-grey;
        background: transparent;
        margin-top: toRem(25);
        margin-bottom: toRem(55);
        padding: toRem(13);
        transition: all ease-in-out 0.25s;

        &:hover {
          background: hsla(0, 0%, 96.1%, 0.5);

          .add-card {
            background: rgba($brand-accent-light, 0.75);
          }
        }

        @include breakpoint-down(md) {
          padding: toRem(10);
        }

        .add-card {
          @include square-shape(55);
          border-radius: toRem(15);
          background: $color-white;
          position: relative;

          @include breakpoint-down(md) {
            @include square-shape(50);
            border-radius: toRem(12);
          }

          @include breakpoint-down(sm) {
            @include square-shape(45);
            border-radius: toRem(12);
          }

          .icon {
            @include center-placement;
            font-size: toRem(40);

            @include breakpoint-down(md) {
              font-size: toRem(35);
            }

            @include breakpoint-down(xs) {
              font-size: toRem(30);
            }
          }
        }

        .add-text {
          @include font-height(16.75, 19);

          @include breakpoint-down(md) {
            @include font-height(16, 18);
          }

          @include breakpoint-down(sm) {
            @include font-height(15, 18);
          }
        }
      }
    }
  }
}
</style>
