<template>
  <div class="teaching-aid-layout">
    <header class="teaching-aid-layout__header">
      <div class="teaching-aid-layout__header--inner">
        <nav class="teaching-aid-layout__navbar">
          <button class="btn btn--back btn-soft-grey text-capitalize">
            <i class="icon-caret-left"></i>
            <span>Back</span>
          </button>

          <button class="btn btn-accent">
            <i class="icon-add-file"></i>
            <span>Upload Lesson</span>
          </button>
        </nav>

        <div class="w-100 d-flex flex-column align-items-center">
          <div class="teaching-aid-layout__heading text-center font-weight-700">
            Teaching Aids
          </div>
          <div class="teaching-aid-layout__searchbar">
            <input
              type="text"
              class="form-control teaching-aid-layout__input"
              placeholder="e.g Algebrae, Mathematics, Nouns"
            />
            <i class="icon-search"></i>
          </div>
        </div>
      </div>
    </header>

    <main>
      <chip-component :subject="{ name: 'mAths' }"></chip-component>
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { VueConstructor } from 'vue';
import { IVue } from '../interfaces';
import ChipComponent from '@/components/core-comps/chip-component.vue';

@Component({
  components: {
    ChipComponent,
  },
})
export default class extends (Vue as VueConstructor<IVue>) {}
</script>

<style lang="scss" scoped>
.teaching-aid-layout {
  display: grid;
  grid-template-rows: 250px auto;

  width: 100%;
  min-height: 100vh;

  // border: 1px solid red;

  &__header {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    position: relative;

    background: url('../assets/static/teaching_aid.png');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;

    // &::before {
    //   content: "";

    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   // z-index: 2;

    //   width: 100%;
    //   height: 100%;
    //   background: rgba(17, 50, 85, 0.8);
    // }
  }

  &__navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 85%;
    height: auto;
    padding: 28px 0;

    .btn {
      border-radius: 30px;
      padding: 10px 21px;
      font-size: 14px;

      // i {
      // //   margin-right: 12px;
      // }

      span {
        display: inline-block;
      }

      &--back {
        border-radius: 10px;
        width: 32px;
        height: 32px;
        display: grid;
        place-items: center;
        // place-content: center;

        span {
          display: none;
        }
      }
    }
  }

  &__searchbar {
    width: 85%;
    height: 50px;
    position: relative;
    margin-top: 30px;

    i {
      position: absolute;
      top: 50%;
      right: 15px;
      z-index: 5;

      color: $brand-accent;
      font-size: 21px;
      transform: translateY(-50%);
    }
  }

  &__input {
    width: 100%;
    height: 100%;
    border-radius: 15px;
  }

  &__heading {
    color: #fff;
    font-size: 24px;
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
    // background: transparent;
  }

  &__body {
    // border: 4px solid blue;
    padding: 32px 16px;
    width: 100%;
    border: 1px solid red;
    height: 100%;

    display: grid;
    // place-items: center;
  }

  &__content {
    width: 100%;
  }

  .chip-container {
    margin-top: 30px;
    margin-bottom: 50px;
  }
}

@include breakpoint-up(md) {
  .teaching-aid-layout {
    &__navbar {
      .btn {
        border-radius: 30px;
        padding: 10px 21px;
        font-size: 14px;

        &--back {
          width: 109px;
          height: 44px;
          display: flex;
        }

        i {
          margin-right: 12px;
        }

        span {
          display: inline-block;
        }
      }
    }

    &__heading {
      font-size: 32px;
      line-height: 50px;
      color: #fff !important;
    }

    &__searchbar {
      width: 60%;
      height: 50px;
      position: relative;
      margin-top: 30px;

      i {
        position: absolute;
        top: 50%;
        right: 15px;
        z-index: 5;

        color: $brand-accent;
        font-size: 21px;
        transform: translateY(-50%);
      }
    }

    &__body {
      padding: 60px 0;
      width: 100%;
      height: 100%;

      display: grid;
      place-items: center;
    }
    &__content {
      width: 85%;
    }
  }
}
</style>
