<template>
  <div class="invite-school">
    <onboarding-nav-layout>
      <template slot="content">
        <div>
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

          <!-- DESCRIPTION  -->
          <div class="onboarding-description color-ash mx-auto text-center">
            Invite your school to access to your school classes. You will be
            assigned to a class as soon as your school joins.
          </div>

          <!-- FORM WRAPPER  -->
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
                type="email"
                id="contactPerson"
                class="form-control"
                placeholder="Enter the email of school contact"
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
                type="phone"
                id="contactEmail"
                class="form-control"
                placeholder="Enter the phone number of school contact"
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
                <option value="1">Principal</option>
                <option value="2">Director</option>
                <option value="3">School Administrator</option>
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
  name: "inviteSchool",

  metaInfo: {
    title: "Invite your School"
  },

  components: {
    onboardingNavLayout
  },

  computed: {
    getInviteForm() {
      return {
        type: "school",

        contacts: [
          {
            name: this.name,
            email: this.email,
            phone: this.phone
          }
        ],

        relationship: this.role
      };
    },

    isDisabled() {
      return !this.name || !this.email || !this.phone || !this.role;
    }
  },

  data() {
    return {
      name: "",
      email: "",
      phone: "",
      role: ""
    };
  },

  methods: {
    ...mapActions({ inviteMySchool: "invites/inviteNewUser" }),

    inviteSchool() {
      this.handleClick("invite", "Inviting...");

      this.teacherInviteSchool(this.getInviteForm)
        .then(response => {
          this.handleClick("invite", "Send Invitation", false);

          if (response.code === 200) {
            this.pushAlert("Invitation successfully sent", "success");
            setTimeout(() => {
              this.$router.push({ path: "/" });
            }, 1300);
          } else {
            this.pushAlert("Invitation failed", "warning");
          }
        })
        .catch(() => {
          this.handleClick("invite", "Send Invitation", false);
          this.pushAlert("Error sending invitation", "error");
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
