<template>
  <div class="vc-textarea">
    <div class="vc-textarea__avatar mgr-10">
      {{ teacherInitials }}
    </div>
    <textarea
      class="form-control vc-textarea__textarea"
      name="text"
      cols="30"
      rows="3"
      placeholder="Add caption"
      @input="updateValue($event.target.value)"
    >
    </textarea>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import { VueConstructor } from 'vue';

// INTERFACES
import { IVue } from '../../interfaces';

@Component
export default class extends (Vue as VueConstructor<IVue>) {
  // EVENTS
  @Emit('input')
  public updateValue() {}

  // PROPS
  @Prop({ default: '' }) value!: string;
  @Prop({ default: '' }) readonly teacherInitials!: string;

  // DATA
}
</script>

<style lang="scss" scoped>
.vc-textarea {
  @include flex-row-start-nowrap();
  align-items: flex-start;

  &__avatar {
    width: 9.5%;
    height: toRem(36);
    overflow: hidden;

    display: grid;
    place-items: center;

    font-size: toRem(14);
    font-weight: 600;
    color: $color-white;
    text-transform: uppercase;

    border-radius: toRem(10);
    background: $brand-tonic;
    letter-spacing: toRem(-1);
  }

  &__textarea {
    border-radius: toRem(15);
    overflow: hidden;
    resize: none;
  }
}
</style>
