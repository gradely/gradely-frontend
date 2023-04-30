<template>
  <div class="main-layout">
    <header class="main-layout__header">
      <div class="main-layout__header--inner">
        <nav class="main-layout__navbar">
          <router-link :to="{name:'DiscoverLessons'}">
            <button class="btn btn-soft-grey btn--back text-capitalize">
              <i class="icon-caret-left"></i>
              <span>Back</span>
            </button>
          </router-link>

          <button @click="selectFile" class="btn btn-accent btn-input" :disabled="!teacherRoles">
            <i class="icon-add-file mgr-10 mgr-md-0"></i>
            <span>Upload</span>
            <input
              ref="lessonFile"
              type="file"
              name="uploadFieldNames"
              @change="uploadLesson($event)"
              :accept="acceptTypes.join(',')"
            />
          </button>
        </nav>

        <div class="w-100 d-flex flex-column align-items-center">
          <div class="main-layout__heading text-center font-weight-700">Educational Games</div>
          <div class="main-layout__searchbar">
            <input
              v-model.lazy="input"
              type="text"
              class="form-control main-layout__input"
              placeholder="e.g Algebrae, Mathematics, Nouns"
            />
            <i class="icon-search"></i>
          </div>
        </div>

        <div class="options-wrapper">
          <button
            @click="setCategory(index)"
            :class="[active_index===index && 'active-button']"
            class="option-button text-capitalize"
            v-for="(category,index) in categories"
            :key="index"
          >{{category.name}}</button>
        </div>
      </div>
    </header>

    <main class="main-layout__body">
      <router-view :search="input" :category="getSelectedCategory"></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { VueConstructor } from 'vue';
import { IVue } from '../interfaces';
import { createNamespacedHelpers } from 'vuex';
const subject = createNamespacedHelpers('subject');

@Component
export default class extends (Vue as VueConstructor<IVue>) {
  // DATA
  public acceptTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'video/mp4',
    'video/x-m4v',
    'video/mkv',
    'video/*',
    '.xml',
    '.doc',
    '.docx',
    '.txt',
    '.xlsx',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  ];

  public input = '';
  public active_index = 0;

  public categories = [
    { name: 'all', id: 'all' },
    { name: 'mathematics', id: 1 },
    { name: 'english', id: 2 },
    { name: 'basic sciences', id: 12 },
  ];
  public teacherRoles = subject.mapGetters(['getTeacherRoles']).getTeacherRoles;

  // METHODS
  uploadLesson(event: Event) {
    this.$bus.$emit('upload-lesson', event);
  }

  selectFile() {
    this.resetInput();
    this.$refs.lessonFile.click();
  }

  resetInput() {
    this.$refs.lessonFile.value = null;
  }

  setCategory(index: number) {
    this.active_index = index;
  }

  get getSelectedCategory() {
    return this.categories[this.active_index];
  }
}
</script>

<style lang="scss" scoped>
.btn-soft-grey {
  background: $color-white;
  color: $brand-navy;

  &:hover {
    background: $brand-inverse-light;
  }

  &:disabled {
    border: toRem(1) solid $border-grey-dark;
  }
}

.options-wrapper {
  @include flex-row-start-nowrap;
  max-width: 92%;
  overflow-x: auto;
  gap: 0 toRem(10);

  margin-top: toRem(50);

  &::-webkit-scrollbar {
    display: none;
  }
}

.option-button {
  padding: toRem(7) toRem(24);
  border-radius: toRem(18);
  color: $color-grey-dark;
  font-size: 0.85rem;
  font-weight: 500;
  background: $white-text;
  transition: all ease-in-out 0.35s;
  min-width: max-content;

  &:hover {
    background: $color-mid-blue;
    color: $white-text;
  }
}

.active-button {
  background: $color-mid-blue;
  color: $white-text;
}

.main-layout {
  display: grid;
  grid-template-rows: toRem(290) auto;

  width: 100%;
  min-height: 100vh;

  &__header {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    position: relative;

    background: url('../assets/static/header_bg.png');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;

    &::before {
      content: '';

      position: absolute;
      top: 0;
      left: 0;
      background: rgba(17, 50, 85, 0.8);
      // z-index: 2;

      width: 100%;
      height: 100%;
    }
  }

  &__navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 85%;
    height: auto;
    padding: toRem(20) 0;
    margin-bottom: toRem(8);

    @include breakpoint-down(md) {
      width: 88%;
      padding: toRem(18) 0;
      margin-bottom: toRem(4);
    }

    @include breakpoint-down(xs) {
      width: 95%;
      padding: toRem(14) 0;
    }

    .btn {
      border-radius: toRem(30);
      padding: toRem(10) toRem(21);
      font-size: toRem(14);

      span {
        display: inline-block;
      }

      &-input {
        position: relative;
        overflow: hidden;

        input[type='file'] {
          visibility: hidden;

          position: absolute;
          top: 0;

          width: 100%;
          height: 100%;
        }
      }

      &--back {
        border-radius: toRem(10);
        width: toRem(32);
        height: toRem(32);
        display: grid;
        place-items: center;
        // place-content: center;

        span {
          display: none;
        }
      }
    }
  }

  &__heading {
    color: #fff !important;
    font-size: toRem(24);
  }

  &__header--inner {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    background: transparent;
  }

  &__body {
    padding: toRem(50) 0;
    width: 100%;
    height: 100%;

    display: grid;
    place-items: center;
    overflow-x: hidden;
  }

  &__searchbar {
    width: 95%;
    height: toRem(30);
    position: relative;
    margin-top: toRem(30);

    i {
      position: absolute;
      top: 73%;
      right: toRem(15);
      z-index: 5;

      color: $brand-accent;
      font-size: toRem(21);
      transform: translateY(-50%);
    }
  }

  &__input {
    width: 100%;
    height: 100%;
    border-radius: toRem(20);
    padding: 0.5rem 1.5rem;
  }
}

@include breakpoint-up(sm) {
  .main-layout {
    grid-template-rows: toRem(310) auto;

    &__heading {
      font-size: toRem(28);
      line-height: toRem(15);
      margin-bottom: toRem(10);
    }

    &__searchbar {
      width: 90%;
    }
  }
}

@include breakpoint-up(md) {
  .main-layout {
    grid-template-rows: toRem(300) auto;
    &__navbar {
      .btn {
        border-radius: toRem(30);
        padding: toRem(10) toRem(21);
        font-size: toRem(14);

        &--back {
          width: auto;
          height: auto;
          display: flex;
          align-items: center;
        }

        i {
          margin-right: toRem(12);
        }

        span {
          display: inline-block;
        }
      }
    }

    &__heading {
      font-size: toRem(30);
      line-height: toRem(12);
      margin-bottom: toRem(12);
    }

    &__searchbar {
      width: 75%;
      height: toRem(38);
      position: relative;
      margin-top: toRem(30);

      i {
        position: absolute;
        top: 58%;
        right: toRem(15);
        z-index: 5;

        color: $brand-accent;
        font-size: 21px;
        transform: translateY(-50%);
      }
    }

    &__input {
      width: 100%;
      height: 100%;
      border-radius: toRem(25);
    }
  }
}

@include breakpoint-up(lg) {
  .main-layout {
    grid-template-rows: toRem(310) auto;

    &__heading {
      font-size: toRem(30);
      line-height: toRem(10);
      margin-bottom: toRem(15);
    }

    &__searchbar {
      width: 65%;
    }
  }
}

@include breakpoint-up(xl) {
  .main-layout {
    &__heading {
      font-size: toRem(30);
      line-height: toRem(10);
      margin-bottom: toRem(15);
    }

    &__searchbar {
      width: 60%;
    }
  }
}
</style>
