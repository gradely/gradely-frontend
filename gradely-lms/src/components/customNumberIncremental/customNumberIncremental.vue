<template>
  <!-- TODO fix the debounce error -->
  <label class="custom-dropdown-label-wrapper">
    <span class="select-label-txt">{{ header }}</span>
    <input
      type="number"
      class="select-option-main"
      id="quantity"
      name="quantity"
      :min="min"
      :max="max"
      :value="value || min"
      @change="$emit('change', $event.target.value)"
      :disabled="disabled"
    />
  </label>
</template>

<script>
export default {
  name: "CustomNumberSelectIncrement",
  props: {
    min: {
      type: Number,
      default: 1
    },
    value: {
      type: Number || String,
      default: null
    },
    max: {
      type: Number,
      default: 100
    },
    header: {
      type: String,
      default: "Score"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.custom-dropdown-label-wrapper {
  background: #f5f5f5;
  border-radius: 5px;
  padding: 0.45rem;
  margin: 1rem 0.34rem;
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
    background: transparent;
    padding-left: 0.45rem;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: #353535;
  }
}
</style>
