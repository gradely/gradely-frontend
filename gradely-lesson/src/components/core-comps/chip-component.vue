<template>
  <button class="chip">
    <div class="chip__text color-grey-dark font-weight-400">
      {{ subject.name }}
    </div>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { VueConstructor } from 'vue';
import { SubjectItemModel } from '../../store/models';
import { IVue } from '../../interfaces';

@Component
export default class extends (Vue as VueConstructor<IVue>) {
  @Prop() readonly subject!: SubjectItemModel;
}
</script>

<style lang="scss" scoped>
.chip {
  cursor: pointer;
  text-align: center;

  display: inline-block;
  width: fit-content;

  background: $white-text;
  border-radius: toRem(30);
  border: toRem(1) solid $pale-orange;

  margin-right: toRem(15);
  margin-bottom: toRem(17);
  padding: toRem(7) toRem(21);

  &__text {
    font-size: 14px;
  }

  &:hover {
    border-color: $brand-accent;
  }

  &:focus {
    border-color: $brand-accent;
    transform: scale(1.05);
  }

  &:last-child {
    margin-right: 0;
    margin-bottom: 0;
  }
}
</style>
