<template>
  <div class="select-avatar mt-3">
    <content-container-layout extend_width>
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
            <img v-lazy="mxStaticImg('NinjaAvatar.png', 'onboarding')" alt="" />
          </div>

          <!-- TEXT TITLE  -->
          <div
            class="
              onboarding-text
              title
              brand-navy
              font-weight-700
              text-center
              mgb-35
            "
          >
            Select your Avatar
          </div>

          <!-- AVATAR SELECTION ROW  -->
          <div class="avatar-selection-row mgb-40">
            <!-- SENIOR AVATAR  -->
            <template>
              <add-user-avatar
                :card_type="card_type"
                @new-upload="addNewAvatar"
              />

              <avatar-card
                v-for="(avatar, index) in avatars"
                :key="index"
                :avatar="avatar"
                :card_type="card_type"
                @click="updateAvatarSelection(index)"
              />
            </template>
          </div>

          <button class="btn btn-accent" ref="save" @click="updateAvatar">
            Set as Avatar
          </button>

          <!-- <kid-button label="Set as Avatar" /> -->
        </div>
      </template>
    </content-container-layout>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import contentContainerLayout from "@/modules/onboarding/components/global-comps/content-container-layout";
import addUserAvatar from "@/modules/onboarding/components/global-comps/add-user-avatar";
import avatarCard from "@/modules/onboarding/components/global-comps/avatar-card";
// import kidButton from "@/modules/onboarding/components/global-comps/kid-button";

export default {
  name: "selectAvatar",

  metaInfo: {
    title: "Select User Avatar",
  },

  components: {
    contentContainerLayout,
    addUserAvatar,
    avatarCard,
    // kidButton,
  },

  computed: {
    ...mapGetters({ childAvatars: "onboarding/getChildAvatars" }),

    getSelectedAvatar() {
      return this.avatars[this.selected_index]?.image;
    },

    avatarForm() {
      return {
        avatar: this.getSelectedAvatar,
      };
    },
  },

  data: () => ({
    card_type: "senior",
    selected_index: -1,
    avatars: [],
  }),

  created() {
    this.$bus.$on("photoUpdated", (image) => this.addNewAvatar(image));
  },

  mounted() {
    this.childAvatars.length
      ? (this.avatars = this.childAvatars)
      : this.loadAvatars();
  },

  methods: {
    ...mapActions({
      getChildAvatars: "onboarding/getChildAvatars",
      setChildAvatar: "onboarding/setChildAvatar",
      updateOnboarding: "onboarding/updateOnboarding",
    }),

    loadAvatars() {
      this.getChildAvatars()
        .then((response) => {
          response.code === 200
            ? (this.avatars = response.data)
            : this.pushAlert("Failed to load profile avatars", "warning");
        })
        .catch(() => this.pushAlert("error loading profile avatars", "error"));
    },

    updateAvatarSelection(index) {
      this.selected_index = index;

      this.avatars = this.avatars.map((avatar, i) => {
        return { ...avatar, selected: index === i };
      });
    },

    addNewAvatar(image) {
      let new_avatar = {
        image,
        selected: false,
      };

      this.avatars.splice(0, 0, new_avatar);
    },

    updateAvatar() {
      if (!this.getSelectedAvatar) {
        this.pushAlert("Please select your profile avatar", "warning");
        return;
      }

      this.handleClick("save", "Saving...");

      this.setChildAvatar(this.avatarForm)
        .then(async (response) => {
          this.handleClick("save", "Set as Avatar", false);

          if (response.code === 200) {
            this.pushAlert("Profile avatar updated successfully", "success");
            await this.updateOnboarding();

            setTimeout(() => {
              this.$route.query.redirect
                ? (location.href = this.$route.query.redirect)
                : this.getAuthUser.relationship == 1
                ? (location.href = "/feed/0")
                : this.$router.push({ name: "StudentParentInvitation" });
            }, 1600);
          } else this.pushAlert("Failed to set avatar", "warning");
        })
        .catch(() => this.pushAlert("Error saving avatar", "error"));
    },
  },
};
</script>

<style lang="scss" scoped>
.select-avatar {
  .avatar-selection-row {
    @include flex-row-center-wrap;
  }

  .btn {
    font-size: toRem(10.75);
    padding: toRem(13) toRem(34);
  }
}
</style>
