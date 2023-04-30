<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    :modal_style="{ size: 'modal-mini' }"
    :show_close_btn="false"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header"></template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <!-- APP NAME ROW -->
        <div class="app-name-row">
          <!-- APP ICON -->
          <div
            class="
              app-icon
              avatar
              rounded-5
              box-shadow-effect
              mgr-20
              brand-accent-light-bg
            "
          >
            <img
              v-lazy="
                getAppInfo.data.icon
                  ? getAppInfo.data.icon
                  : mxStaticImg('AppFileIcon.svg', 'dashboard')
              "
              :alt="getAppInfo.data.name"
            />
          </div>

          <!-- APP NAME -->
          <div class="app-name color-text font-weight-700 text-capitalize">
            {{ getAppInfo.data.name ? getAppInfo.data.name : "Loading app.." }}
          </div>
        </div>

        <!-- INSTALLATION DESCRIPTION -->
        <div class="d-flex justify-content-center">
          <div class="installation-description text-center color-text mgb-15">
            You are about to add
            <span class="btn-link link-no-underline font-weight-600">{{
              getAppInfo.data.name
            }}</span>
            to your Gradely school account
          </div>
        </div>

        <!-- SCHOOL NAME -->
        <div
          class="
            school-name
            brand-navy
            font-weight-700
            text-center text-capitalize
            mgb-18
          "
        >
          {{ getAuthUser.school_name }}
        </div>

        <!-- APP META -->
        <div class="app-meta text-center color-text mgb-18">
          The app will be able to:
        </div>

        <!-- APP PERMISSION ACCESS -->
        <div class="d-flex flex-column align-items-center">
          <div class="app-permission-block">
            <div class="alert-icon avatar">
              <div class="icon icon-info-italics white-text"></div>
            </div>

            <div class="text">
              Read the information about your school, and everyone connected to
              your school on Gradely
            </div>
          </div>

          <div class="app-permission-block">
            <div class="alert-icon avatar">
              <div class="icon icon-info-italics white-text"></div>
            </div>

            <div class="text">
              Read assessment information and grades for all your students
            </div>
          </div>

          <div class="app-permission-block">
            <div class="alert-icon avatar">
              <div class="icon icon-info-italics white-text"></div>
            </div>

            <div class="text">
              Post and share file to your school, teachers, parents and students
              feed.
            </div>
          </div>
        </div>

        <!-- APP AGREEMENT TEXT -->
        <div class="app-agreement-text color-ash">
          By clicking allow, you grant this app and Gradely the permission to
          use your information in accordance with their respective
          <a
            :href="getAppInfo.data.terms_url"
            class="btn-link link-no-underline"
            >terms of use</a
          >
          and
          <a
            :href="getAppInfo.data.privacy_url"
            class="btn-link link-no-underline"
          >
            policies.</a
          >
        </div>

        <!-- BUTTON ROW -->
        <div class="d-flex justify-content-end align-items-center mgb-15">
          <button
            class="btn no-shadow bg-transparent mgr-10 color-text"
            @click="$emit('closeTriggered')"
          >
            Deny
          </button>
          <button class="btn btn-accent" ref="allowBtn" @click="integrateApp">
            Allow
          </button>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer"> </template>
  </modal-cover>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { EXTERNAL_URL } from "@/env";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "appInstallationModal",

  components: {
    modalCover,
  },

  computed: {
    ...mapGetters({
      getAppInfo: "dbApp/getAppInfo",
    }),
  },

  methods: {
    ...mapActions({
      installAppToSchool: "dbApp/installAppToSchool",
    }),

    integrateApp() {
      this.$refs.allowBtn.disabled = true;
      this.pushAlert(
        `${this.getAppInfo.data.name} is installing, please wait..`,
        "loading"
      );

      let payload = {
        app_id: this.getAppInfo.data.id,
        status: true,
      };

      this.installAppToSchool(payload)
        .then((response) => {
          //   console.log(response);

          if (response.code === 200 || response.code === 201) {
            setTimeout(() => {
              this.pushAlert(
                `${this.getAppInfo.data.name} installed! Launching..`,
                "success"
              );
            }, 3000);

            // REDIRECT TO APP PAGE
            setTimeout(() => {
              let url_path = `/home${this.appendReportQueryParam()}`;
              location.href = EXTERNAL_URL("report-card", url_path);
            }, 2500);
          }

          // INSTALLATION ERROR
          else {
            this.$refs.allowBtn.disabled = false;
            setTimeout(
              () =>
                this.pushAlert(
                  "App installation failed, please try again",
                  "warning"
                ),
              2000
            );
          }
        })
        .catch(() => {
          this.$refs.allowBtn.disabled = false;
          this.pushAlert("An error occured while installing app", "error");
        });
    },

    appendReportQueryParam() {
      let term = this.getAuthUser.term.toLowerCase();
      let session = this.getAuthUser.session.split("/").join("-");
      return `?term=${term}&session=${session}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  padding: toRem(10) toRem(25);
  max-height: 94vh;

  .app-name-row {
    @include flex-row-center-nowrap;
    margin: toRem(25) 0 toRem(20);

    .app-icon {
      box-shadow: toRem(-1) toRem(1) toRem(4) rgba($black-text, 0.15);
      @include square-shape(34);

      img {
        @include center-placement;
        @include square-shape(28);
      }
    }

    .app-name {
      @include font-height(19, 26);
    }
  }

  .installation-description {
    @include font-height(13.5, 22);
    width: 65%;
  }

  .school-name {
    @include font-height(13, 18);
  }

  .app-meta {
    @include font-height(13, 18);
  }

  .app-permission-block {
    border-bottom: toRem(1) solid rgba($border-grey, 0.75);
    @include flex-row-start-nowrap;
    padding: toRem(13) 0;

    &:first-of-type {
      border-top: toRem(1) solid rgba($border-grey, 0.75);
    }

    .alert-icon {
      background: $brand-inverse;
      @include square-shape(26);
      margin-right: toRem(23);

      .icon {
        @include center-placement;
        font-size: toRem(14);
      }
    }

    .text {
      @include font-height(12.5, 20);
      color: $color-ash;
    }
  }

  .app-agreement-text {
    @include font-height(12, 20);
    margin: toRem(15) 0 toRem(20);
  }
}
</style>
