<template>
  <div class="create-lesson round-30 pd-20">
    <div class="font-weight-700 text-uppercase create-lesson__heading mgb-20">
      Create a Lesson
    </div>
    <vc-textarea
      v-model="form.description"
      :teacherInitials="'US'"
      class="mgb-15"
    ></vc-textarea>
    <div class="d-flex align-items-center mgb-20">
      <div class="h-spacer-9 mgr-10" />
      <vc-filecard></vc-filecard>
    </div>

    <vc-select
      v-model="form.subject_id"
      name="Subject"
      placeholder="Select Subject"
      icon_class="icon-book-cover"
      :options="[]"
      :selectedOption="{}"
      class="mgb-20"
    ></vc-select>

    <vc-select
      v-model="form.subject_id"
      name="Topic"
      placeholder="Select Topic"
      icon_class="icon-bookmark"
      :options="[]"
      :selectedOption="{}"
      class="mgb-20"
    ></vc-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { VueConstructor } from 'vue';

// INTERFACES
import { IVue } from '../../interfaces';

// COMPONENTS
import VCTextarea from '@/components/form-comps/vc-textarea.vue';
import Filecard from '@/components/card-comps/file-card.vue';
import VCSelect from '@/components/form-comps/vc-select.vue';

@Component({
  components: {
    'vc-textarea': VCTextarea,
    'vc-filecard': Filecard,
    'vc-select': VCSelect,
  },
})
export default class extends (Vue as VueConstructor<IVue>) {
  // WATCHER
  @Watch('form.description')
  public descriptionChanged(newVal: string) {
    console.log({ newVal });
  }

  // DATA
  public form = {
    title: '' as string,
    description: '' as string,
    subject_id: 0 as number,
    topic_id: 0 as number,
    class_id: [] as Array<number>,
    student_list: [] as Array<number>,
    attachments: [] as Array<File>,
  };

  // METHODS
}
</script>

<style lang="scss" scoped>
.create-lesson {
  border: 1px solid blue;

  width: 100%;

  &__heading {
    font-size: toRem(16);
    line-height: toRem(21.79);
    color: $color-text;
  }
}

.h-spacer {
  &-9 {
    width: 9.5%;
  }
}
</style>
