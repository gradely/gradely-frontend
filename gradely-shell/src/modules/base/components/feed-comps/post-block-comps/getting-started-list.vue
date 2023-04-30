<template>
  <div class="getting-started-list">
    <!-- FIND SCHOOL  -->
    <template v-if="false">
      <getting-started-block
        :intro_content="find_school_starter_intro"
        :text_content="find_school_starter_text"
        v-if="!has_school && this.getParentChildren.length"
      >
        <template slot="content-area">
          <post-content-image
            :image="[
              `${getAssetBaseURL(
                'cloud',
                'gradely'
              )}/image/upload/v1639028365/FindSchoolBanner_uuotvk.png`,
            ]"
          />

          <!-- FIND SCHOOL CTA  -->
          <div class="cta-area d-flex justify-content-end">
            <router-link :to="{ name: 'StudentFindSchool' }">
              <button class="btn btn-accent">Find your School</button>
            </router-link>
          </div>
        </template>
      </getting-started-block>
    </template>

    <!-- INVITE PARENT  -->
    <getting-started-block
      :intro_content="invite_parent_starter_intro"
      :text_content="invite_parent_starter_text"
      v-if="show_add_parent_card"
    >
      <template slot="content-area">
        <post-content-image
          :image="[
            `${getAssetBaseURL(
              'cloud',
              'gradely'
            )}/image/upload/v1639028444/InviteParentBanner_ugeuyi.png`,
          ]"
        />

        <!-- INVITE PARENT CTA  -->
        <div class="cta-area d-flex justify-content-end">
          <router-link :to="{ name: 'StudentParentInvitation' }">
            <button class="btn btn-accent">Invite your parent</button>
          </router-link>
        </div>
      </template>
    </getting-started-block>

    <!-- REFERRAL REWARD  -->
    <getting-started-block
      v-if="false"
      :intro_content="referral_starter_intro"
      :text_content="referral_starter_text"
    >
      <template slot="content-area">
        <post-content-image
          :image="[
            `${getAssetBaseURL(
              'cloud',
              'gradely'
            )}/image/upload/v1639028453/RewardBanner_jrdygd.png`,
          ]"
        />

        <!-- REFER FRIEND CTA  -->
        <div class="cta-area d-flex justify-content-end">
          <button class="btn btn-accent">Refer a friend</button>
        </div>
      </template>
    </getting-started-block>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import gettingStartedBlock from "@/modules/base/components/feed-comps/post-block-comps/getting-started-block";
import postContentImage from "@/modules/base/components/feed-comps/post-block-comps/post-content-comps/post-content-image";

export default {
  name: "gettingstartedList",

  components: {
    gettingStartedBlock,
    postContentImage,
  },

  computed: {
    ...mapGetters({
      getParentChildren: "general/getParentChildren",
    }),

    show_add_parent_card() {
      return this.getAuthType === "student" && !this.getAuthUser.relationship;
    },
  },

  data: () => ({
    find_school_starter_intro: {
      name: "Eniola",
      description: "Getting started with Gradely",
      image: "Enny.png",
      type: "gradely",
      in_house_tip: true,
    },
    find_school_starter_text: {
      custom_text:
        "Invite your school to receive homework, exams, lesson notes and more directly on Gradely.",
    },

    invite_parent_starter_intro: {
      name: "Eniola",
      description: "Getting started with Gradely",
      image: "Enny.png",
      type: "gradely",
      in_house_tip: true,
    },
    invite_parent_starter_text: {
      custom_text:
        "Invite your parents to unlock more learning resources from Gradely",
    },

    referral_starter_intro: {
      name: "Eniola",
      description: "Quick Tip",
      image: "Enny.png",
      type: "gradely",
      in_house_tip: true,
    },
    referral_starter_text: {
      custom_text:
        "Save N5,000 for yourself and a friend on an annual subscription",
    },

    has_school: true,
  }),

  watch: {
    $route: {
      handler(value) {
        // FOR PARENT AND STUDENT
        this.getChildSchoolInfo(value.params.id);
      },
      immediate: true,
    },
  },

  methods: {
    ...mapActions({ getChildClassDetails: "general/getChildClassDetails" }),

    // GET CHILD SCHOOL ANME INFO FOR PARENT AND CHILD ACCOUNT
    getChildSchoolInfo(id) {
      if (["parent", "student"].includes(this.getAuthType)) {
        this.getChildClassDetails(id).then((response) => {
          this.has_school = response.data.has_school;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cta-area {
  margin-top: toRem(-8);
  padding: 0 toRem(15) toRem(14);

  @include breakpoint-down(xs) {
    padding: toRem(10) toRem(9);
  }

  .btn {
    @include breakpoint-down(xs) {
      padding: toRem(12.5) toRem(26) toRem(11);
      font-size: toRem(9.5);
    }
  }
}
</style>
