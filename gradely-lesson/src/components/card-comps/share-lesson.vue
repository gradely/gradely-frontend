<template>
  <div class="share-lesson">
    <div class="share-lesson__heading font-weight-700">SHARE LESSON</div>
    <div class="share-lesson__inputs">
      <div class="share-lesson__caption-inputs">
        <div class="share-lesson__avatar">
          <span class="font-weight-700">A</span>
          <span class="font-weight-700">J</span>
        </div>

        <div class="share-lesson__form-fields">
          <div class="share-lesson__caption">
            <input
              class="share-lesson__caption--input"
              type="text"
              placeholder="Add Caption"
            />
          </div>
          <div class="share-lesson__upload">
            <div class="share-lesson__upload--left">
              <div class="share-lesson__filetype">
                <div class="playBtn-wrapper">
                  <i class="icon-play"></i>
                </div>
                <div class="share-lesson__transparent"></div>
              </div>

              <div class="share-lesson__filetype--details">
                <div>
                  <div class="share-lesson__upload--heading font-weight-700">
                    {{ featured_lesson.title }}
                  </div>
                  <div class="share-lesson__upload--container">
                    <div
                      class="share-lesson__upload--subheading font-weight-400"
                    >
                      {{ featured_lesson.subject }}
                    </div>
                    <div class="dot"></div>
                    <div
                      class="share-lesson__upload--subheading font-weight-400"
                    >
                      Video Lesson
                    </div>
                  </div>
                </div>
                <div class="share-lesson__upload--button font-weight-700">
                  CHANGE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="share-lesson__selections">
      <div class="share-lesson__select">
        <div class="share-lesson__select-icons">
          <i class="icon-book-cover"></i>
        </div>
        <div class="share-lesson__select-fields">
          <div>Subject: Mathematics</div>
          <div>
            <i class="icon-caret-down"></i>
          </div>
        </div>
      </div>
      <div class="share-lesson__select">
        <div class="share-lesson__select-icons">
          <i class="icon-bookmark"></i>
        </div>
        <div class="share-lesson__select-fields">
          <div>Topic: Select Topic</div>
          <div>
            <i class="icon-caret-down"></i>
          </div>
        </div>
      </div>
      <div class="share-lesson__select">
        <div class="share-lesson__select-icons">
          <i class="icon-bookmark"></i>
        </div>
        <div class="share-lesson__select-assignment">
          <div class="share-lesson__class-assignment">
            <div class="font-weight-400">Assigned Class</div>
            <div>
              <i class="icon-caret-down"></i>
            </div>
          </div>
          <div class="share-lesson__class-chip">
            <div class="mx-1 font-weight-400">JSS 1 - gold</div>
            <div>
              <i class="icon-close"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="share-lesson__select">
        <div class="share-lesson__select-icons">
          <i class="icon-user-outline"></i>
        </div>
        <div class="share-lesson__select-students">
          <div class="share-lesson__students-heading">
            <div class="font-weight-400">Assigned Students</div>
            <div>
              <i class="icon-plus"></i>
            </div>
          </div>
          <div class="share-lesson__student-chip">
            <div class="share-lesson__chip-avatar">
              <img src="@/assets/static/chip-avatar.png" alt="chip-avatar" />
            </div>
            <div class="mx-1">Omolade Mitchel</div>
            <div>
              <i class="icon-close"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="share-lesson__footer">
      <div class="share-lesson__footer--actions">
        <div class="share-lesson__delete-btn">
          <i class="icon-trash"></i>
        </div>
        <div class="divider"></div>
        <div>
          <button class="share-lesson__post-btn">Post</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { VueConstructor } from 'vue';
import { DocumentItemModel } from '../../store/models';

// INTERFACES
import { IVue } from '../../interfaces';

//   @Component
export default {
  // @Prop({ default: {} as DocumentItemModel}) readonly featured_document!: DocumentItemModel;
  props: {
    featured_lesson: {},
  },
};
</script>

<style lang="scss" scoped>
.share-lesson {
  padding: toRem(20);
  max-width: toRem(570);
  width: 100%;
  margin: 0 auto;

  &__heading {
    font-size: 16px;
    color: #353535;
  }

  &__avatar {
    height: fit-content;
    padding: toRem(10);
    background: #f6515b;
    border-radius: 10px;
    margin-right: toRem(10);
    color: white;
    font-size: 14px;
  }

  &__inputs {
    margin-top: toRem(20);
  }

  &__caption-inputs {
    display: flex;
  }
  &__form-fields {
    width: 100%;
  }
  &__caption {
    width: 100%;
    height: toRem(80);
    border: 1px solid #d5d5d5;
    border-radius: 15px;

    &--input {
      width: 100%;
      height: 100%;
      padding-top: toRem(15);
      padding-left: toRem(15);
      padding-bottom: toRem(45);
      border: 1px solid #d5d5d5;
      border-radius: 15px;
      border: none;
    }
  }

  &__upload {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding: toRem(11) toRem(10);
    border: 1px solid #d5d5d5;
    border-radius: 10px;
    margin-top: toRem(15);
    margin-bottom: toRem(20);

    &--container {
      display: flex;
      align-items: center;

      .dot {
        width: toRem(6);
        height: toRem(6);
        background: #d5d5d5;
        border-radius: 100%;
        margin: toRem(10);
      }
    }

    &--left {
      display: flex;
    }

    &--heading {
      color: #353535;
      font-size: 18px;
    }
    &--subheading {
      color: #757575;
      font-size: 12px;
    }
    &--button {
      color: #113255;
      font-size: 12px;
    }
  }

  &__filetype {
    width: toRem(96);
    height: toRem(96);
    position: relative;
    background: #faa017;
    border-radius: 10px;
    display: grid;
    place-items: center;
    color: white;
    margin-right: toRem(15);

    .playBtn-wrapper {
      width: toRem(32);
      height: toRem(32);
      border-radius: 100%;
      background: #fceacf;
      color: #faa017;
      display: grid;
      place-items: center;
    }

    &--details {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: toRem(10) 0;
    }
  }
  &__transparent {
    width: toRem(96);
    height: toRem(96);
    position: absolute;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
    border-radius: toRem(10);
  }

  &__selections {
    margin-bottom: toRem(20);
  }

  &__select {
    display: flex;
  }
  &__select-icons {
    margin-right: toRem(19.75);
    color: #11bdcf;
  }
  &__select-fields {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid #dbf5f8;
    padding-bottom: toRem(11.5);
    margin-bottom: toRem(20);
  }
  &__select-assignment {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-bottom: 1px solid #dbf5f8;
    margin-bottom: toRem(20);
  }
  &__class-assignment {
    display: flex;
    width: 100%;
    justify-content: space-between;
    color: #959595;
  }
  &__class-chip {
    display: flex;
    font-size: 12px;
    color: #555555;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    width: fit-content;
    padding: 4px 4px 4px 8px;
    margin: toRem(10) 0;
    margin-right: toRem(10);
  }

  &__select-students {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-bottom: 1px solid #dbf5f8;
    margin-bottom: toRem(20);
    color: #959595;
  }
  &__students-heading {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: toRem(10);
    margin-right: toRem(10);
  }
  &__student-chip {
    width: fit-content;
    border: 1px solid #e5e5e5;
    border-radius: toRem(8);
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 4px 4px 4px 8px;
    margin-bottom: toRem(10);
  }
  &__chip-avatar {
    width: toRem(24);
    height: toRem(24);
    border: 1px solid #ffffff;
    border-radius: 10px;
  }

  &__footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    background: #f5f5f5;
    border-radius: 0px 0px 10px 10px;

    &--actions {
      display: flex;
      align-items: center;
      padding: toRem(9);

      .divider {
        border: toRem(0.5) solid #d5d5d5;
        height: 70%;
        margin: 0 toRem(14);
      }
    }
  }
  &__delete-btn {
    font-size: toRem(22);
    color: #959595;
  }
  &__post-btn {
    background: #faa017;
    border-radius: 20px;
    padding: 8px 18px;
    color: #353535;
  }
}
</style>
