<template>
  <label :class="`custom-dropdown-label-wrapper ${customClass}`">
    <span class="select-label-txt">{{ titleText }}</span>
    <select
      :disabled="disabled"
      :name="name"
      @change="handleChange"
      class="select-option-main"
    >
      <option
        :key="`${index}_${item.value}`"
        v-for="(item, index) in selectOptions"
        :value="item.value"
        :selected="item.selected || item.value === value || false"
        >{{ item.text }}</option
      >
    </select>
  </label>
</template>

<script>
export default {
  name: "CustomSelectWithLabel",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    customClass: {
      type: String
    },
    name: {
      type: String,
      default: ""
    },
    titleText: {
      type: String,
      default: "Topics for"
    },
    selectOptions: {
      type: Array,
      default: () => [{ value: 1, text: "no availiable data" }]
    },
    value: {}
  },
  methods: {
    handleChange(e) {
      this.$emit("change", {
        event: e
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-dropdown-label-wrapper {
  background: #f5f5f5;
  border-radius: 5px;
  padding: 0.45rem;
  margin: 1rem 0.34rem;
  color: #353535;
  .select-label-txt {
    border-right: 1.5px solid #d5d5d5;
    padding-right: 0.45rem;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    text-transform: uppercase;
  }
  .select-option-main {
    border: transparent;
    background: inherit;
    padding-left: 0.45rem;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: inherit;
  }
}
</style>
