<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    :show_close_btn="true"
    :modal_style="{ size: 'modal-mini' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title">ADD CLASS ARMS</div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body mgt-6 pdb-12">
        <!-- CLASS LEVEL  -->
        <div class="row">
          <div class="col-12 col-md-4 label">CLASS LEVEL</div>
          <div class="col-12 col-md-8 brand-navy font-weight-700 text">
            {{ class_level }}
          </div>
        </div>

        <!-- CLASS BRANCHES  -->
        <div class="row">
          <div class="col-12 col-md-4 label">CLASS BRANCHES</div>
          <div class="col-12 col-md-8 brand-navy font-weight-700 text">
            <input
              type="text"
              class="form-control mgb-5"
              placeholder="E.g. A"
              required
              ref="armInput"
              v-model="class_name"
            />

            <!-- SAMPLE TEXT  -->
            <div class="sample-text color-grey-dark mgb-20 font-weight-400">
              Seen as: <span class="font-weight-600">JSS1A</span>
            </div>

            <!-- ADD ARM  -->
            <div
              v-if="false"
              class="
                add-arm
                d-flex
                justify-content-start
                align-items-center
                mgb-28
              "
            >
              <div class="avatar border-border-grey mgr-10">
                <div class="icon-plus brand-accent"></div>
              </div>

              <div
                class="
                  text
                  brand-accent
                  smooth-transition
                  font-weight-500
                  pointer
                "
              >
                Add another
              </div>
            </div>

            <!-- REPLICATE  -->
            <div class="replicate" v-if="false">
              <label
                for="replicate"
                class="
                  d-flex
                  justify-content-start
                  align-items-start
                  checkbox-inline
                "
              >
                <input
                  type="checkbox"
                  name=""
                  id="replicate"
                  class="mgt-1 mgr-8"
                />
                <div class="replicate-text color-text font-weight-400">
                  Replicate for other class levels
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer d-flex justify-content-end mgb-10 pdt-0">
        <button
          class="btn modal-btn transparent-bg no-shadow color-text mgr-5"
          @click="$emit('closeTriggered')"
        >
          Cancel
        </button>

        <button
          class="btn modal-btn btn-accent mgl-5"
          @click="addClassArm"
          ref="addArm"
        >
          Save Class
        </button>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import modalCover from "@/shared/components/modal-cover";
import { mapActions } from "vuex";

export default {
  name: "TestModal",

  components: {
    modalCover,
  },

  props: {
    class_id: Number,
    class_level: String,
  },

  computed: {
    classArmInfo() {
      return { global_class_id: this.class_id, class_name: this.class_name };
    },
  },

  data() {
    return {
      class_name: "",
    };
  },

  mounted() {
    this.setupArmInput();
  },

  methods: {
    ...mapActions({ addNewClassArm: "dbHome/createNewClassArm" }),

    addClassArm() {
      this.handleClick("addArm", "Creating...");

      if (this.class_name === this.class_level) {
        this.pushAlert("Class arm name already exists", "warning");
        this.handleClick("addArm", "Save Class", false);
        return false;
      }

      this.addNewClassArm(this.classArmInfo)
        .then((response) => {
          if (response.code === 200) {
            this.pushAlert("New class arm created successfully!", "success");
            this.$bus.$emit("reloadClasses");
          }
          // NON 200 RESPONSE
          else {
            this.pushAlert("New arm could not be added", "warning");
            this.handleClick("addArm", "Save Class", false);
          }
        })
        .catch(() => {
          this.handleClick("addArm", "Save Class", false);
          this.pushAlert("Error adding new class arm", "error");
        });
    },

    // Setting the value of the input field to the value of the class_level prop.
    setupArmInput() {
      this.$nextTick(() => (this.class_name = this.class_level));
      this.$refs.armInput.value = this.class_level;
      this.$refs.armInput.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  .form-control {
    @include font-height(12.75, 18);
  }

  .row {
    margin-bottom: toRem(27);

    @include breakpoint-down(sm) {
      margin-bottom: toRem(20);
    }

    &:last-of-type {
      margin-bottom: 0;
    }

    .label {
      @include font-height(12, 17);
      font-weight: 500;
      color: $color-grey-dark;

      @include breakpoint-down(md) {
        @include font-height(13, 18);
        margin-bottom: 7px;
      }

      @include breakpoint-down(xs) {
        @include font-height(12, 17);
      }
    }

    .text {
      @include font-height(12.5, 18);

      @include breakpoint-down(xs) {
        @include font-height(12, 17);
      }
    }

    .sample-text {
      @include font-height(11.75, 17);

      @include breakpoint-down(xs) {
        @include font-height(11.5, 16);
      }
    }

    .add-arm {
      .avatar {
        @include square-shape(24);

        .icon-plus {
          @include center-placement;
        }
      }

      .text {
        @include font-height(12.5, 17);

        &:hover {
          color: $brand-inverse !important;
        }
      }
    }

    .replicate {
      .replicate-text {
        font-size: 12.25px;
      }
    }
  }
}
</style>
