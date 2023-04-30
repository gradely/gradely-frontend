<template>
  <div class="select-card pointer mgb-18" @click="selectChild">
    <div class="left-items">
      <div class="image-wrapper position-relative">
        <div class="active-marker" v-if="isActive">
          <div class="position-relative w-100 h-100">
            <div class="icon icon-correct brand-inverse gfont-22 font-weight-600"></div>
          </div>
        </div>

        <img
          v-lazy="child.image"
          :alt="$string.getStringInitials(child.full_name)"
          class="brand-inverse-light-bg card-image"
          v-if="child.image"
        />

        <div
          v-else
          class="avatar-text white-text"
          :class="$color.getProfileBgColor(child.full_name)"
        >{{ $string.getStringInitials(child.full_name) }}</div>
      </div>

      <div class="child-info">
        <div class="brand-navy title font-weight-600 mgb-5">{{ child.full_name }}</div>
        <div class="d-flex subtitle gap-1 m-0 color-grey-dark text-capitalize">
          <div>{{getChildClass}}</div>
          <div v-if="getChildSchool">•</div>
          <div v-if="getChildSchool">({{getChildSchool}})</div>
        </div>
      </div>
    </div>

    <div>
      <div class="actions">
        <div class="action-button" :class="isActive?'':'border-grey-light-bg'">
          <div
            class="icon-wrapper position-relative"
            style="right:1.5px"
            :class="isActive ? 'active-border':'accent-border'"
          >
            <div
              class="icon gfont-13 position-relative"
              style="top:0.8px;"
              :class="isActive?'active-color icon-accept active-offset':'brand-accent icon-plus'"
            ></div>
          </div>

          <div :class="isActive?'active-color':'color-ash'">{{isActive? 'Active':'Select'}}</div>
        </div>

        <div class="action-button border-grey-light-bg" @click.stop="manageChild">
          <div
            class="icon icon-gear-fill-edge brand-accent gfont-19 position-relative"
            style="right:1.5px"
          ></div>
          <div class="color-ash">Manage</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectChildCard",

  props: {
    child: {
      type: Object,
      default: () => ({
        id: 1,
        full_name: "Richy Jones",
        image: "",
        child_class_details: {},
      }),
    },
  },

  computed: {
    isActive() {
      return this.$route.params.id == this.child.id ? true : false;
    },

    getChildClass() {
      return this.child?.class.abbreviation || this.child?.class?.description;
    },

    getChildSchool() {
      return this.child?.child_class_details?.school_name;
    },
  },

  methods: {
    selectChild($event) {
      if (!$event.target.classList.contains("ignore"))
        this.$emit("childSelected", Number(this.child.id));
    },

    manageChild() {
      this.$router.push({
        name: "ManageChild",
        params: { id: this.child.id, name: this.child.full_name },
      });
    },

    copyStudentCode() {
      let code_input = this.$refs.classCode;
      code_input.select();
      code_input.setSelectionRange(0, 99999); /*For mobile devices*/
      document.execCommand("copy");

      code_input.value === "No student selected"
        ? this.pushAlert("No student code available", "warning")
        : this.pushAlert("Student code copied successfully", "success");
    },
  },
};
</script>

<style lang="scss" scoped>
.select-card {
  width: 100%;
  @include flex-row-between-nowrap;
  gap: toRem(20) toRem(15);
  padding: toRem(12);
  border-radius: toRem(12);
  border: 1.5px solid #e5e5e5;
  &:hover {
    background: hsla(0, 0%, 96.1%, 0.5);
  }

  @include breakpoint-custom-down(510) {
    flex-wrap: wrap;
  }
}

.left-items {
  @include flex-row-start-nowrap;
  gap: 0 toRem(20);

  @include breakpoint-custom-down(510) {
    width: 100%;
  }
}

.image-wrapper {
  @include square-shape(48);
  border-radius: toRem(20);

  @include breakpoint-custom-down(612) {
    @include square-shape(40);
    border-radius: toRem(15);
  }

  @include breakpoint-custom-down(510) {
    @include square-shape(45);
    border-radius: toRem(17);
  }

  .active-marker {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 5;
    background: rgba(#000, 0.5);
    border-radius: inherit;

    .icon-correct {
      @include center-placement;
    }
  }

  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
  }
}

.child-info {
  .title {
    @include font-height(15, 22);

    @include breakpoint-custom-down(612) {
      @include font-height(13, 18);
    }
  }
  .subtitle {
    @include font-height(12, 15);

    @include breakpoint-custom-down(612) {
      @include font-height(11, 13);
    }
  }
}

.actions {
  @include flex-row-start-nowrap;
  align-items: stretch;
  gap: 0 toRem(12);

  .action-button {
    @include flex-row-start-nowrap;
    padding: toRem(6) toRem(12);
    border-radius: toRem(8);
    font-size: 0.8rem;
    font-weight: 600;
    gap: 0 toRem(7);
    margin-left: auto;
    cursor: pointer;

    &:hover {
      filter: brightness(0.95);
    }

    @include breakpoint-custom-down(612) {
      padding: toRem(4) toRem(8);
      border-radius: toRem(6);
      font-size: 0.7rem;
    }
  }

  .icon {
    font-weight: 600;
  }
}

.active-color {
  color: #24ae5f;
}

.active-border {
  border: 2.2px solid #24ae5f;
}

.accent-border {
  border: 2.2px solid $brand-accent;
}

.icon-wrapper {
  @include square-shape(18.5);
  @include flex-row-center-nowrap;
  border-radius: 50%;

  @include breakpoint-custom-down(612) {
    @include square-shape(15.5);
  }
}

.active-offset {
  right: 0.5px;
}
</style>