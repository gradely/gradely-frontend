<template>
  <div class="parent-invitation">
    <content-container-layout>
      <template slot="content">
        <div
          class="
            d-flex
            flex-column
            align-items-center
            justify-content-start
            w-100
          "
        >
          <!-- IMAGE TOP  -->
          <div class="onboarding-image-top mgt-20">
            <img
              v-lazy="mxStaticImg('ParentAvatar.png', 'onboarding')"
              alt=""
            />
          </div>

          <!-- TEXT TITLE  -->
          <div
            class="
              onboarding-text
              title
              brand-navy
              font-weight-700
              text-center
              mgb-20
            "
          >
            Add your parent to verify your account
          </div>

          <!-- FORM WRAPPER  -->
          <div class="onboarding-form-wrapper mgt-20 mx-auto">
            <!-- PARENT NAME  -->
            <div class="form-group compact-row w-100">
              <label for="parentName" class="label-compact label-sm"
                >Parent Name
              </label>
              <input
                type="text"
                id="parentName"
                class="form-control"
                placeholder="The name of your parent"
                required
                v-model="name"
              />
            </div>

            <!-- RELATIONSHIP  -->
            <div class="form-group compact-row w-100">
              <label for="relationship" class="label-compact label-sm"
                >Relationship
              </label>

              <select v-model="relationship" class="form-control">
                <option disabled selected value="">How are you related?</option>
                <option value="father">Father</option>
                <option value="mother">Mother</option>
                <option value="guardian">Guardian</option>
              </select>
            </div>

            <!-- PARENT EMAIL OR PHONE  -->
            <div class="form-group compact-row w-100">
              <label for="parentEmailPhone" class="label-compact label-sm"
                >Phone No.
              </label>
              <input
                type="text"
                id="parentPhone"
                class="form-control"
                placeholder="Phone number"
                required
                v-model="phone"
              />
            </div>

            <div class="form-group compact-row w-100">
              <label for="parentEmailPhone" class="label-compact label-sm"
                >Email
              </label>
              <input
                type="email"
                id="parentEmail"
                class="form-control"
                placeholder="Email address"
                required
                v-model="email"
              />
            </div>

            <!-- INVITATION BUTTON  -->
            <button
              class="btn btn-accent mgb-10"
              ref="invite"
              :disabled="isDisabled"
              @click="addParent"
            >
              Send Inviation
            </button>

            <div
              class="
                info-text
                color-ash
                font-weight-700
                text-center
                mgt-20
                pointer
                smooth-transition
              "
              @click="$router.push({ path: '/' })"
            >
              Skip for now
            </div>
          </div>
        </div>
      </template>
    </content-container-layout>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import contentContainerLayout from "@/modules/onboarding/components/global-comps/content-container-layout";

export default {
  name: "parentInvitation",

  metaInfo: {
    title: "Parent Invitation",
  },

  components: {
    contentContainerLayout,
  },

  computed: {
    parentForm() {
      return {
        type: "parent",
        relationship: this.relationship,
        contacts: [
          {
            email: this.email,
          },
          {
            name: this.name,
            phone_number: this.phone,
          },
        ],
      };
    },

    isDisabled() {
      return !this.relationship || !this.name || !this.email || !this.phone;
    },
  },

  data() {
    return {
      name: "",
      phone: "",
      relationship: "",
      email: "",
    };
  },

  methods: {
    ...mapActions({
      inviteParent: "invites/inviteNewUser",
      updateOnboarding: "onboarding/updateOnboarding",
    }),

    addParent() {
      this.handleClick("invite", "Sending Invitation...");

      this.inviteParent(this.parentForm)
        .then(async (response) => {
          this.handleClick("invite", "Send Invitation", false);
          if (response.code == 200) {
            this.pushAlert("Parent invitaion sent successfully", "success");
            await this.updateOnboarding();

            setTimeout(() => this.$router.push({ path: "/" }), 1500);
          } else {
            this.pushAlert("Failed to invite parent", "warning");
          }
        })
        .catch(() => {
          this.handleClick("invite", "Send Invitation", false);
          this.pushAlert("Error inviting parent", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.parent-invitation {
  .onboarding-image-top {
    img {
      @include breakpoint-down(sm) {
        @include square-shape(80);
      }

      @include breakpoint-down(xs) {
        @include square-shape(70);
      }
    }
  }

  .onboarding-text-title {
    @include breakpoint-down(xs) {
      @include font-height(12.5, 18);
    }
  }

  .info-text {
    @include font-height(12.75, 17);
    padding: toRem(5) toRem(10);
    width: max-content;

    &:hover {
      color: $brand-inverse !important;
    }
  }
}
</style>
