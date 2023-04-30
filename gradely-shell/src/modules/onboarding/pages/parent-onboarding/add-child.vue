<template>
  <div class="add-child onboarding-setup">
    <img
      v-lazy="mxStaticImg('gradely-logo.png')"
      alt="GradelyLogo"
      class="gradely-logo"
    />

    <content-container-layout>
      <template slot="content">
        <!-- CLOSE DIALOG -->
        <div
          class="
            close-dialog-btn
            rounded-20
            overflow-hidden
            smooth-transition
            pointer
          "
          v-if="$route.query.page"
          title="Close dialog"
          @click="navigateToBase"
        >
          <div class="position-relative w-100 h-100">
            <div class="icon icon-close"></div>
          </div>
        </div>

        <div
          class="
            d-flex
            flex-column
            align-items-center
            justify-content-start
            w-100
          "
        >
          <!-- TAB ROW -->
          <onboarding-tab-row
            v-if="false"
            :tabs="[
              { title: 'Add new child', route: 'ParentAddChild' },
              { title: 'Connect with child', route: 'ParentConnectChild' },
            ]"
          />

          <!-- META TEXT -->
          <div class="meta-text brand-navy text-center">
            Create a student profile for this class
          </div>

          <!-- CLASS BLOCK -->
          <div class="class-block" v-if="class_name">
            <div class="school-logo">
              <img v-if="school_logo" v-lazy="school_logo" alt="logo" />
              <img
                v-else
                v-lazy="mxStaticImg('dummy_school_logo.png')"
                alt="alt-logo"
              />
            </div>

            <div>
              <div class="brand-primary gfont-14 font-weight-600 mb-1">
                {{ class_name }}
              </div>
              <div class="color-grey-dark gfont-12">@{{ school_name }}</div>
            </div>
          </div>

          <!-- FORM WRAPPER  -->
          <form autocomplete="off" class="w-100">
            <div class="onboarding-form-wrapper mgt-20 mx-auto">
              <!-- CHILD NAME  -->
              <div class="form-group compact-row w-100">
                <label for="childName" class="label-compact label-sm"
                  >Child's Name</label
                >
                <input
                  type="text"
                  id="childName"
                  class="form-control"
                  placeholder="e.g Davig Bakare"
                  required
                  v-model.trim="name"
                  autoComplete="none"
                />
              </div>

              <!-- CHILD CLASS  -->
              <div class="form-group compact-row w-100" v-if="!class_name">
                <label for="childClass" class="label-compact label-sm"
                  >Child's Class</label
                >
                <select
                  class="form-control"
                  id="childClass"
                  v-model="child_class"
                >
                  <option disabled selected value>
                    What class is your child?
                  </option>
                  <option
                    v-for="(level, index) in getClassList"
                    :key="index"
                    :value="level.id"
                  >
                    {{ level.description }}
                  </option>
                </select>
              </div>

              <!-- RELATIONSHIP  -->
              <div class="form-group compact-row w-100" v-if="!class_name">
                <label for="relationship" class="label-compact label-sm"
                  >Relationship</label
                >

                <select required v-model="relationship" class="form-control">
                  <option disabled value>
                    How are you related to the child
                  </option>
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                  <option value="guardian">Guardian</option>
                </select>
              </div>

              <!-- PASSWORD -->
              <div class="form-group compact-row w-100" v-if="!class_name">
                <label for="password" class="label-compact label-sm"
                  >Create Password</label
                >
                <div class="input-group">
                  <input
                    id="password"
                    :type="passwordType ? 'password' : 'text'"
                    class="form-control"
                    placeholder="Create a login password for your child"
                    required
                    v-model="password"
                    autoComplete="new-password"
                  />

                  <!-- ADDON  -->
                  <div
                    class="addon smooth-transition"
                    :class="
                      passwordType
                        ? ['icon-eye', 'brand-inverse']
                        : ['icon-hide', 'brand-accent']
                    "
                    @click="togglePasswordType"
                    title="Toggle Password"
                  ></div>
                </div>
              </div>

              <!-- CONNECT BUTTON  -->
              <button
                class="btn btn-accent mgb-10"
                :disabled="isDisabled"
                ref="add"
                @click="addChild"
              >
                CREATE PROFILE
              </button>

              <div class="gfont-14 color-ash mgt-15 font-weight-500">
                Have an existing student profile?
                <router-link
                  :to="{ name: 'ParentConnectChild', query: $route.query }"
                  class="brand-accent child-link"
                >
                  Enter Student Code</router-link
                >
              </div>
            </div>
          </form>
        </div>
      </template>
    </content-container-layout>

    <!-- MODALS -->
    <portal to="gradely-modals">
      <transition name="fade" mode="in-out" v-if="show_child_added_modal">
        <child-added-modal
          add_type="create"
          :child_name="getFirstName"
          @closeTriggered="toggleChildAddedModal"
        />
      </transition>
    </portal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import contentContainerLayout from "@/modules/onboarding/components/global-comps/content-container-layout";

export default {
  name: "addChild",

  metaInfo: {
    title: "Add a Child",
  },

  components: {
    contentContainerLayout,
    onboardingTabRow: () =>
      import(
        /* webpackChunkName: "onboarding-switcher" */ "@/modules/onboarding/components/global-comps/onboarding-tab-row"
      ),
    childAddedModal: () =>
      import(
        /* webpackChunkName: "modal" */ "@/modules/onboarding/modals/child-added-modal"
      ),
  },

  watch: {
    $route: {
      handler() {
        this.show_child_added_modal = false;
      },
      immediate: false,
    },

    name: {
      handler(value) {
        let name_error = this.$validate.checkFullName(value);

        if (name_error) {
          this.pushAlert(name_error, "error");
          this.valid_name = false;
        } else {
          this.valid_name = true;
        }
      },
    },
  },

  computed: {
    ...mapGetters({ getClassList: "general/getClassList" }),

    isDisabled() {
      return this.class_name
        ? !this.name || !this.valid_name
        : !this.name ||
            !this.relationship ||
            !this.child_class ||
            !this.valid_name;
    },

    getPageQuery() {
      return this.$route?.query?.page ? { page: this.$route.query.page } : "";
    },

    getFirstName() {
      return this.name.replace(/\s\s+/g, " ").split(" ")[0] || "";
    },

    getLastName() {
      return this.name.replace(/\s\s+/g, " ").split(" ")[1] || "";
    },

    joinClassPayload() {
      return {
        use_child_token: true,
        code: this.class_code,
      };
    },

    getChildData() {
      return this.class_name
        ? {
            relationship: "Guardian",
            first_name: this.getFirstName,
            last_name: this.getLastName,
            class: this.global_class_id,
            password: "gradely",
          }
        : {
            relationship: this.relationship,
            first_name: this.getFirstName,
            last_name: this.getLastName,
            password: this.password,
            class: this.child_class,
          };
    },
  },

  async mounted() {
    if (!this.getClassList.length) await this.getGlobalClassList();

    this.$nextTick(() => {
      this.name = "";
      this.password = "";
    });
  },

  data() {
    return {
      passwordType: true,
      name: "",
      relationship: "",
      child_class: "",
      password: "",

      class_name: this.$route?.query?.class_name,
      school_name: this.$route?.query?.school_name,
      school_logo: this.$route?.query?.school_logo,
      class_id: this.$route?.query?.id,
      class_code: this.$route?.query?.class_code,
      global_class_id: this.$route?.query?.global_class_id,

      valid_name: false,
      show_child_added_modal: false,

      join_class_payload: {
        use_child_token: true,
        code: this.class_id,
      },
    };
  },

  methods: {
    ...mapActions({
      addNewChild: "onboarding/addNewChild",
      getGlobalClassList: "general/getGlobalClassList",
      updateOnboarding: "onboarding/updateOnboarding",
      studentJoinClass: "onboarding/studentJoinClass",
      getChildToken: "general/getChildToken",
    }),

    validateName() {
      if (this.getFirstName.length < 3) {
        this.pushAlert(
          "First name should be at least three characters",
          "warning"
        );
        return false;
      } else if (this.getLastName.length < 3) {
        this.pushAlert(
          "Last name should be at least three characters",
          "warning"
        );
        return false;
      }
      return true;
    },

    async childJoinClass(id) {
      await this.getChildToken(id);
      await this.studentJoinClass(this.joinClassPayload);
    },

    addChild() {
      if (!this.validateName()) return;
      this.handleClick("add", "Adding child...");

      this.addNewChild(this.getChildData)
        .then(async (response) => {
          this.handleClick("add", "Add Child", false);
          if (response.code === 200) {
            this.pushAlert("Child added successfully", "success");
            this.toggleChildAddedModal();
            if (this.class_name) await this.childJoinClass(response.data.id);
            this.updateOnboarding();
          } else if (response.code === 303)
            this.pushAlert("Child already exist", "warning");
          else this.pushAlert("Failed to add child", "warning");
        })
        .catch(() => {
          this.handleClick("add", "Add Child", false);
          this.pushAlert("Error adding new child", "error");
        });
    },

    // TOGGLE PASSWORD TYPE
    togglePasswordType() {
      this.passwordType = !this.passwordType;
    },

    navigateToBase() {
      if (this.getAuthUser.is_boarded) this.exit();
      else {
        this.updateOnboarding();
        this.exit();
      }
    },

    toggleChildAddedModal() {
      this.show_child_added_modal = !this.show_child_added_modal;
    },

    exit() {
      this.$router.push(this.$route.query.page ? this.$route.query.page : "/");
    },
  },
};
</script>

<style lang="scss" scoped>
.class-block {
  padding: toRem(8);
  border: 1.5px solid $brand-inverse-light;
  border-radius: toRem(12);
  margin: toRem(5) auto toRem(20) auto;
  min-width: 350px;
  max-width: 90%;
  @include flex-row-start-nowrap;

  @include breakpoint-down(xs) {
    min-width: 300px;
    max-width: 96%;
  }

  .school-logo {
    @include square-shape(45);
    margin-right: toRem(15);
    position: relative;

    img {
      width: 100%;
      height: 100%;
      @include center-placement;
      border-radius: toRem(10);
    }
  }
}

.gradely-logo {
  margin: toRem(90) auto 0 auto;
  display: block;

  @include breakpoint-down(md) {
    margin: toRem(70) auto 0 auto;
  }
}

.child-link {
  text-decoration: underline;
}

.content-layout {
  padding-top: toRem(35);
}
</style>
