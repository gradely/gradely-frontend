<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    :show_close_btn="true"
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header"> </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body pdb-0">
        <!-- TOP  -->
        <div class="top">
          <img v-lazy="mxStaticImg('book-illustrator.png')" alt="" />

          <div
            class="text text-center brand-navy"
            v-if="getAuthType == 'student'"
          >
            <template v-if="!has_class">
              <p>
                You are about to connect to a class with class code
                <span class="font-weight-600">{{
                  $route.query.class_invite
                }}</span>
                on invitation link assessed.
              </p>

              <p>Click connect to proceed!</p>
            </template>

            <template v-else>
              <p>
                You are already connected to a class,<br />
                contact your school admin for further clarifications.
              </p>
            </template>
          </div>

          <div class="text text-center brand-navy" v-else>
            <p>
              Please sign in as a student, to connect to class with the code
              <span class="font-weight-600">{{ getClassCode }}</span>
            </p>
          </div>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div
        class="
          modal-cover-footer
          d-flex
          justify-content-center
          pdt-0
          mgt-5
          mgb-7
        "
      >
        <template v-if="!has_class">
          <button class="btn modal-btn btn-accent" ref="confirmBtn">
            {{ getAuthType == "student" ? "Connect" : "Sign in" }}
          </button>
        </template>

        <template v-else>
          <button
            class="btn modal-btn btn-tonic mgb-10"
            @click="declineClassInvite"
          >
            Close
          </button>
        </template>
      </div>
    </template>
  </modal-cover>
</template>

<script>
import { LANDER_URL, APP_BASE_URL } from "@/env";
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "joinClassInviteModal",

  components: {
    modalCover,
  },

  props: {
    has_class: Boolean,
  },

  computed: {
    getClassCode() {
      return (
        this.$route?.query?.class_invite ??
        localStorage.getItem("class_invite_code")
      );
    },

    generateSignupURL() {
      let url = this.env === "development" ? LANDER_URL.dev : LANDER_URL.prod;
      let join_class_url =
        this.env === "development"
          ? "http://localhost:8093/j?s=" + this.getClassCode
          : `${APP_BASE_URL}/j?s=${this.getClassCode}`;
      let redirect_query = `?redirect=${join_class_url}`;
      return `${url}${this.student}${redirect_query}`;
    },
  },

  data() {
    return {
      env: process.env.NODE_ENV,
      student: "/signup-student",
    };
  },

  mounted() {
    if (!this.has_class && this.getAuthType === "student") {
      setTimeout(
        () =>
          this.getAuthType === "student"
            ? this.acceptClassInvite()
            : this.reGroup(),
        1000
      );
    }
  },

  methods: {
    ...mapActions({
      studentJoinClass: "onboarding/studentJoinClass",
      logoutUser: "auth/logoutUser",
    }),

    async reGroup() {
      await this.logoutUser(false);
      localStorage.clear();
      location.href = this.generateSignupURL;
    },

    declineClassInvite() {
      this.$router.replace({ path: this.$route.path });
      this.$emit("closeTriggered");
    },

    acceptClassInvite() {
      this.handleClick("confirmBtn", "Connecting...");

      let payload = {
        code: this.$route.query.class_invite,
        use_child_token: this.getAuthType === "parent" ? true : false,
      };

      this.studentJoinClass(payload)
        .then(async (response) => {
          this.handleClick("confirmBtn", "Connect", false);

          if (response.code === 200) {
            this.pushAlert(`Connected to class`, "success");
            setTimeout(() => (location.href = "/feed/0"), 2500);
          } else {
            this.pushAlert("Connection to class failed", "warning");
          }
        })
        .catch(() => {
          this.handleClick("connect", "Connect", false);
          this.pushAlert("Error connecting to class", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-body {
  .top {
    @include flex-column-start-center;

    img {
      @include square-shape(70);
      margin-top: toRem(30);
      margin-bottom: toRem(25);

      @include breakpoint-down(xs) {
        @include square-shape(65);
        margin-top: toRem(15);
      }
    }

    .text {
      @include font-height(13, 22);
      width: 90%;
    }
  }
}

.modal-cover-footer {
  margin-top: toRem(7);

  @include breakpoint-down(xs) {
    margin-top: toRem(-5) !important;
  }

  .btn {
    @include breakpoint-down(xs) {
      padding: toRem(14) toRem(36) !important;
    }
  }
}
</style>
