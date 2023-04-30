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
    :class="isActive ? 'border-grey-light-bg' : null"
    @click="selectClass"
  >
    <div class="card-image avatar position-relative overflow-hidden">
      <div class="avatar-text" :class="$color.generateRandomColors()">
        <div class="icon icon-graduation-cap white-text"></div>

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
      <!-- CLASS NAME -->
      <div class="card-title mgb-4 brand-navy font-weight-700 text-capitalize">
        {{ class_item.class_name }}
      </div>

      <!-- CLASS CODE -->
      <div class="card-meta color-grey-dark text-uppercase ignore">
        <!-- <span
          class="icon-copy brand-accent pointer mgr-2 gfont-15-5 ignore"
          title="Copy class code"
          @click="copyClassCode"
        ></span> -->
        {{ class_item.class_code }}

        <input
          type="text"
          ref="classCode"
          :value="1234"
          class="position-absolute index--9 ignore"
          style="opacity: 0"
        />
      </div>

      <!-- BOTTOM OPTIONS -->
      <div class="bottom-options">
        <!-- MANAGE CHILD -->
        <div
          class="option-btn smooth-transition mgr-4 ignore"
          @click="manageClass"
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
  name: "classSelectCard",

  props: {
    class_item: {
      type: Object,
      default: () => ({
        class_id: 1,
        class_name: "Junior School 1",
      }),
    },
  },

  computed: {
    isActive() {
      return this.$route.params.id == this.class_item?.class_id ? true : false;
    },
  },

  methods: {
    selectClass($event) {
      if (!$event.target.classList.contains("ignore")) {
        this.$emit("classSelected", Number(this.class_item?.class_id));
        setTimeout(
          () =>
            this.$router.push({
              name: "GradelyFeeds",
              params: { id: Number(this.class_item?.class_id) },
            }),
          500
        );
      }
    },

    manageClass() {
      this.$router.push({
        name: "ManageClass",
        params: {
          id: this.class_item.class_id,
          name: this.class_item.class_name,
        },
      });
    },

    copyClassCode() {
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
