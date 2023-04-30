<template>
  <modal-cover @closeModal="$emit('closeTriggered')" :modal_style="{ size: 'modal-small' }">
    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="body-wrapper">
        <div class="big-icon-wrapper">
          <div class="small-icon-wrapper">
            <img v-lazy="mxStaticImg('LinkBreak.png')" alt="break-up" />
          </div>
        </div>

        <div class="gfont-16 brand-navy font-weight-700 text-center mgt-20 mgb-12">Disconnect School</div>
        <div class="details color-ash text-center mgb-30">
          You are about to remove your child from
          <span class="font-weight-600">“{{schoolName}}”</span>.
          Your child will no longer have access to past and
          future school work shared by the school.
        </div>

        <button
          class="btn btn-soft-tonic mx-auto mgb-17"
          ref="remove"
          @click="removeSchool"
        >Yes, Remove from School</button>
        <button
          class="btn btn-soft-grey mx-auto gfont-13"
          style="text-transform:none"
          @click="$emit('closeTriggered')"
        >No, remain in School</button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "removeChildSchoolModal",

  components: {
    modalCover,
  },

  props: {
    child: {
      type: Object,
      default: () => {},
    },

    schoolName: {
      type: String,
      default: "Gradely Tutorial College",
    },

    schoolID: {
      type: Number,
      default: 101,
    },
  },

  computed: {
    getPayload() {
      return {
        school_id: this.schoolID,
        child_id: this.child?.id,
      };
    },
  },

  methods: {
    ...mapActions({ removeChildSchool: "general/removeChildSchool" }),

    removeSchool() {
      this.handleClick("remove", "removing...");

      this.removeChildSchool(this.getPayload)
        .then((response) => {
          this.handleClick("remove", "Yes, Remove from School", false);

          if (response.code === 200) {
            this.pushAlert(`Child removed from ${this.schoolName}`, "success");

            this.$bus.$emit("updateChildrenList");

            setTimeout(() => {
              this.$emit("closeTriggered");
            }, 1000);
          } else {
            this.pushAlert(`Failed to remove child`, "warning");
          }
        })
        .catch(() => {
          this.handleClick("remove", "Yes, Remove from School", false);
          this.pushAlert("Error removing child from school", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.body-wrapper {
  padding: toRem(30) toRem(20);

  .big-icon-wrapper {
    @include square-shape(96);
    @include flex-row-center-nowrap;
    margin: auto;
    border-radius: 50%;
    background: $brand-red-light;

    .small-icon-wrapper {
      @include square-shape(73.3);
      @include flex-row-center-nowrap;
      border-radius: 50%;
      background: rgba(254, 116, 125, 0.25);
    }
  }
  .details {
    @include font-height(13, 23);
    width: 80%;
    margin: auto;

    @include breakpoint-custom-down(640) {
      width: 83%;
    }

    @include breakpoint-custom-down(534) {
      width: 88%;
    }

    @include breakpoint-custom-down(415) {
      width: 94%;
    }
  }
}
</style>

