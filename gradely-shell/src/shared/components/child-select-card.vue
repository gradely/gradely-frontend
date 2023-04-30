<template>
  <div
    class="
      selection-card
      position-relative
      overflow-hidden
      rounded-15
      smooth-transition
      pointer
    "
    @click="selectChild"
  >
    <div
      class="
        card-image
        avatar
        position-relative
        overflow-hidden
        brand-inverse-light-bg
      "
    >
      <img
        v-lazy="child.image"
        :alt="$string.getStringInitials(child.full_name)"
        v-if="child.image"
        class="brand-inverse-light-bg"
      />

      <div
        class="avatar-text"
        v-else
        :class="$color.getProfileBgColor(child.full_name)"
      >
        {{ $string.getStringInitials(child.full_name) }}

        <!-- ACTIVE MARKER -->
        <div
          class="active-marker position-absolute w-100 h-100 index-99"
          v-if="isActive"
        >
          <div class="position-relative w-100 h-100">
            <div class="icon icon-correct brand-inverse"></div>
          </div>
        </div>
      </div>

      <!-- ACTIVE MARKER -->
      <div
        class="active-marker position-absolute w-100 h-100 index-99"
        v-if="isActive"
      >
        <div class="position-relative w-100 h-100">
          <div class="icon icon-correct brand-inverse"></div>
        </div>
      </div>
    </div>

    <div class="div">
      <!-- CHILD NAME -->
      <div class="card-title mgb-4 brand-navy font-weight-700 text-capitalize">
        {{ child.full_name }}
      </div>

      <!-- CHILD SCHOOL -->
      <div class="card-meta color-grey-dark text-uppercase ignore">
        <span
          class="icon-copy brand-accent pointer mgr-2 gfont-15-5 ignore"
          title="Copy class code"
          @click="copyStudentCode"
        ></span>
        {{ child.code }}

        <input
          type="text"
          ref="classCode"
          :value="child.code"
          class="position-absolute index--9 ignore"
          style="opacity: 0"
        />
      </div>

      <!-- BOTTOM OPTIONS -->
      <div class="bottom-options">
        <!-- MANAGE CHILD -->
        <div
          class="option-btn smooth-transition mgr-4 ignore"
          @click="manageChild"
        >
          <div class="icon-gear-fill-edge icon ignore"></div>
          <div class="text ignore">Manage</div>
        </div>

        <!-- SELECT CHILD -->
        <div
          class="option-btn smooth-transition mgl-4"
          :class="isActive ? 'active-option-btn' : null"
        >
          <div class="select-icon position-relative rounded-circle">
            <div
              class="icon"
              :class="isActive ? 'icon-accept' : 'icon-plus'"
            ></div>
          </div>
          <div class="text">{{ isActive ? "Active" : "Select" }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "childSelectCard",

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
      return this.child?.class.abbreviation || "Jss 1";
    },

    getChildSchool() {
      return this.child?.child_class_details?.school_name || "Gradely College";
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
</style>
