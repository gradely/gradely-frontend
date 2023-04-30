<template>
  <div class="invite-school">
    <onboarding-nav-layout>
      <template slot="content">
        <div>
          <!-- IMAGE TOP  -->
          <div class="onboarding-image-top mgt-30">
            <img
              v-lazy="
                `${getAssetBaseURL(
                  'cloud',
                  'gradely'
                )}/image/upload/v1639030662/ConnectChildAvatar_pf4wea.png`
              "
              alt=""
            />
          </div>

          <!-- TITLE TEXT  -->
          <div
            class="
              onboarding-title-text
              text-center
              font-weight-700
              brand-navy
              mgt-18
              mgb-10
            "
          >
            Invite your School
          </div>

          <!-- SCHOOL NAME  -->
          <div class="onboarding-form-wrapper mgt-45 mx-auto">
            <div class="form-group compact-row w-100">
              <label for="schoolName" class="label-compact label-sm"
                >School Name
              </label>
              <input
                type="text"
                id="schoolName"
                class="form-control"
                placeholder="Enter the name of your school"
                required
                v-model="name"
              />
            </div>

            <!-- CONTACT PERSON  -->
            <div class="form-group compact-row w-100">
              <label for="contactPerson" class="label-compact label-sm"
                >Contact Email
              </label>
              <input
                type="text"
                id="contactPerson"
                class="form-control"
                placeholder="Enter the name of school contact"
                required
                v-model="email"
              />
            </div>

            <!-- CONTACT email  -->
            <div class="form-group compact-row w-100">
              <label for="contactEmail" class="label-compact label-sm"
                >Contact Phone
              </label>
              <input
                type="text"
                id="contactEmail"
                class="form-control"
                placeholder="Email or phone number of school contact"
                required
                v-model="phone"
              />
            </div>

            <!-- CONTACT email  -->
            <div class="form-group compact-row w-100">
              <label for="contactRole" class="label-compact label-sm"
                >Role of Contact
              </label>
              <select class="form-control" id="contactRole" v-model="role">
                <option disabled selected value="">Select contact role</option>
                <option value="Principal">Principal</option>
                <option value="Director">Director</option>
                <option value="School Administrator">
                  School Administrator
                </option>
              </select>
            </div>

            <!-- CONNECT BUTTON  -->
            <button
              class="btn btn-accent mgb-10"
              :disabled="isDisabled"
              ref="invite"
              @click="inviteSchool"
            >
              Send Invitation
            </button>
          </div>
        </div>
      </template>
    </onboarding-nav-layout>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import onboardingNavLayout from "@/modules/onboarding/components/global-comps/onboarding-nav-layout";

export default {
  name: "inviteChildSchool",

  metaInfo: {
    title: "Invite your School",
  },

  components: {
    onboardingNavLayout,
  },

  computed: {
    getInviteForm() {
      return {
        type: "school",

        contacts: [
          {
            name: this.name,
            email: this.email,
            phone: this.phone,
          },
        ],

        relationship: this.role,
      };
    },

    isDisabled() {
      return !this.name || !this.email || !this.phone || !this.role;
    },
  },

  data() {
    return {
      name: "",
      email: "",
      phone: "",
      role: "",
    };
  },

  methods: {
    ...mapActions({ inviteMySchool: "invites/inviteNewUser" }),

    inviteSchool() {
      this.handleClick("invite", "Inviting...");

      this.inviteMySchool(this.getInviteForm)
        .then((response) => {
          this.handleClick("invite", "Send Invitation", false);

          if (response.code === 200) {
            this.pushAlert("Invitation successfully sent", "success");
            setTimeout(() => {
              this.$router.push({ path: "/" });
            }, 1300);
          } else {
            this.pushAlert(response.message, "warning");
          }
        })
        .catch(() => {
          this.handleClick("invite", "Send Invitation", false);
          this.pushAlert("Error sending invitation", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
