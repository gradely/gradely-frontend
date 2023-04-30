<template>
  <div class="teaching-aid-content">
    <teaching-aid-card v-for="i in 33" :key="i" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { VueConstructor } from 'vue';
import { IVue } from '../../interfaces';
import ChipComponent from '../../components/core-comps/chip-component.vue';
import TeachingAidCard from '@/components/card-comps/teaching-aid-card.vue';

@Component({
  components: {
    ChipComponent,
    TeachingAidCard,
  },
})
export default class extends (Vue as VueConstructor<IVue>) {}
</script>

<style lang="scss" scoped>
.teaching-aid-content {
  padding: toRem(35) toRem(15);
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  gap: toRem(30);
}
</style>
