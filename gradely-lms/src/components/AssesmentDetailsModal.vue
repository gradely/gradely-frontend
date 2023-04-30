<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    :show_close_btn="
      isLoading || (disabled && showSpinner ? true : false) ? false : true
    "
  >
    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div v-if="isLoading" name="fade" mode="out-in">
        <div
          class="loader d-flex justify-content-center align-items-center my-5 border_grey_dark"
        >
          <div class="icon-dotted-roller font-30 mr-2 animate row"></div>
          <div class="font-20">Loading ...</div>
        </div>
      </div>
      <div v-if="!isLoading && details" class="modal-cover-body">
        <div class="img-bck-wrapper-main">
          <img :src="FolderIcon" alt="" class="folder-icon" />
        </div>
        <div class="modal-header-wrapper-main">
          <div class="assesment-title">{{ details.title }}</div>
          <span class="created-on-wrapper">Created on:&nbsp;&nbsp;</span>
          <span
            ><b>{{ getShortReadableDate(details.created_at) }}</b></span
          >
          <section class="label-wrapper">
            <div class="modal-txt-description">
              <div class="row-main-wrapper">
                <span class="key-label">Status</span>
                <span class="value-label bold">{{ details.activeStatus }}</span>
              </div>
            </div>
            <div class="modal-txt-description">
              <div class="row-main-wrapper">
                <span class="key-label">Subject</span>
                <span class="value-label">{{ details.subject.name }}</span>
              </div>
            </div>
            <div class="modal-txt-description">
              <div class="row-main-wrapper">
                <span class="key-label">Start Date</span>
                <span class="value-label">{{
                  getShortReadableDate(details.open_date)
                }}</span>
              </div>
            </div>
            <div class="modal-txt-description">
              <div class="row-main-wrapper">
                <span class="key-label">End Date</span>
                <span class="value-label">{{
                  getShortReadableDate(details.close_date)
                }}</span>
              </div>
            </div>
            <div class="modal-txt-description">
              <div class="row-main-wrapper">
                <span class="key-label">Assessment Type</span>
                <span class="value-label">{{ details.tag }}</span>
              </div>
            </div>
            <div class="modal-txt-description">
              <div class="row-main-wrapper">
                <span class="key-label">Questions</span>
                <span class="value-label">{{ details.questionCount }}</span>
              </div>
            </div>
          </section>
          <!-- footer inner -->
          <div class="d-flex modal-custom-class-wraapper">
            <section class="btn-container-wrapper">
              <span
                @click="$emit('delete')"
                class="no-select pointer ico-wrapper-right"
              >
                <span class="inner-footer-ico-wrapper icon-trash"></span>
                <span class="inner-footer-ico-wrapper">Delete</span>
              </span>

              <span
                @click="$emit('edit')"
                class="no-select pointer ico-wrapper-left"
              >
                <span class="inner-footer-ico-wrapper icon-edit-line"></span>
                <span class="inner-footer-ico-wrapper">Edit Details</span>
              </span>
            </section>
            <button
              @click="$emit('publish')"
              :disabled="disabled"
              class="btn btn-accent"
            >
              <span v-if="disabled && showSpinner">
                <span class="icon-dotted-roller font-17 mr-2 animate"></span>
                Publishing...
              </span>
              <span v-else>Publish</span>
            </button>
          </div>
        </div>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import ModalCover from "@/components/ModalComps/ModalCover";
import FolderIcon from "../assets/static/DetailSideIcon.svg";
import { getShortReadableDate } from "../services/dateMgt";

export default {
  name: "AssesmentDetailsModal",
  data() {
    return {
      FolderIcon,
      getShortReadableDate
    };
  },
  props: {
    details: {
      type: Object
    },
    showSpinner: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    currentIndex: {
      type: Number,
      default: null
    }
  },
  components: {
    ModalCover
  }
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  max-height: none !important;
  @include flex-column-start-center;
  flex-direction: row;
  padding: 0rem;
  align-items: stretch !important;
  @include breakpoint-down(md) {
    @include flex-column-center;
  }
  .img-bck-wrapper-main {
    background: #f6515b;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.9;
    min-width: 7rem;
    height: auto;
    width: 55%;
    @include breakpoint-down(md) {
      display: none;
    }
    img {
      width: 100%;
      height: auto;
    }
  }
  .modal-txt-description {
    margin: 1rem 0px;
  }

  .row-main-wrapper {
    display: flex;
  }
  .created-on-wrapper {
    font-weight: normal;
    font-size: toRem(14);
    line-height: toRem(19);
    color: #555555;
  }
  .value-label {
    font-style: normal;
    font-size: toRem(14);
    line-height: toRem(19);
    text-transform: uppercase;
    color: #757575;
  }
  .value-label.bold {
    font-weight: bold;
  }
  .key-label {
    font-style: normal;
    font-weight: bold;
    font-size: toRem(14);
    line-height: toRem(19);
    color: #000000;
    flex: 0 0 40.333333%;
  }
  .modal-header-wrapper-main {
    width: 95%;
    margin-left: 20px;
    padding-right: 10px;
    padding-top: 1rem;
    @include breakpoint-custom-down(345) {
      margin-left: 10px;
      padding-right: 5px;
    }
  }
  .label-wrapper {
    margin: 3rem 0rem;
  }
}
.ico-wrapper-right {
  color: $brand-tonic;
}
.ico-wrapper-left {
  color: $brand-navy;
  margin-left: 15px;
  @include breakpoint-custom-down(345) {
    margin-left: 6px;
  }
}
.modal-custom-class-wraapper {
  @include flex-row-between-nowrap;
  padding: 0.45rem 0px;
  border-top: 1px solid #d5d5d5;
  margin-top: 1rem;
  padding-top: 1rem;
}
.inner-footer-ico-wrapper {
  padding-right: 0.45rem;
}
.btn {
  color: #113255 !important;
  padding: 8px 18px;
  @include breakpoint-custom-down(345) {
    font-size: 11px;
    padding: 6px 16px;
  }
}

.assesment-title {
  font-style: normal;
  font-weight: bold;
  font-size: toRem(18);
  line-height: toRem(25);
}
.pointer {
  cursor: pointer;
}
.no-select {
  font-size: 14px;
  user-select: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  @include breakpoint-custom-down(345) {
    font-size: 11px;
  }
}
.font-30 {
  font-size: 30px;
}
.font-20 {
  font-size: 20px;
}
</style>
