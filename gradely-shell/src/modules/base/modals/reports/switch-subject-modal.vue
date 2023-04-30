<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    :show_close_btn="true"
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">Change Subject</div>

        <!-- SEARCH BAR  -->
        <div class="search-bar mgt-10" v-if="subjects_repo.length > 8">
          <input
            type="search"
            class="form-control rounded-30"
            v-model="search_value"
            @input="filterSubjects"
            @keyup="filterSubjects"
            @propertyChange="filterSubjects"
            @paste="filterSubjects"
            @change="filterSubjects"
            placeholder="Search subject..."
          />
          <div class="icon-search border-grey-dark index-1"></div>
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body mgt--10">
        <!-- SUBJECT LIST  -->
        <plain-select-card
          v-for="(subject, index) in subjects"
          :key="index"
          :index="index"
          :item="subject"
          @selected="makeSubjectSelection($event)"
        />
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer">
      <div class="modal-cover-footer"></div>
    </template>
  </modal-cover>
</template>

<script>
import { mapGetters } from "vuex";
import modalCover from "@/shared/components/modal-cover";
import plainSelectCard from "@/shared/components/plain-select-card";

export default {
  name: "switchSubjectModal",

  components: {
    modalCover,
    plainSelectCard,
  },

  props: {
    pre_selected_subject: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    ...mapGetters({
      getTeacherSubjects: "general/getTeacherSubjectList",
      getClassSubjects: "general/getClassSubjects",
    }),
  },

  data: () => ({
    search_value: null,
    subjects_repo: [],
    subjects: [],
  }),

  created() {
    this.setupSubjectData();
  },

  methods: {
    setupSubjectData() {
      if (this.getAuthType === "school") {
        this.subjects_repo = this.subjects = this.getClassSubjects; // PRELOAD SUBJECT REPO
      } else {
        this.subjects_repo = this.subjects = this.getTeacherSubjects; // PRELOAD SUBJECT REPO
      }

      this.subjects.map((item) =>
        Number(item.subject_id) === Number(this.pre_selected_subject.subject_id)
          ? (item.selected = true)
          : (item.selected = false)
      );
    },

    makeSubjectSelection(index) {
      this.subjects.map((subject) => (subject.selected = false)); // RESET SUBJECT LIST
      this.subjects[index].selected = true; // UPDATE SELECTED SUBJECT TO TRUE
      this.$emit("selectSubject", this.subjects[index]); // EMIT SELECTED SUBJECT

      this.loadRoute(this.subjects[index].subject_id);
      this.$emit("closeTriggered");
    },

    filterSubjects() {
      let filtered_list = [];

      if (this.search_value.length)
        this.subjects_repo.map((subject) => {
          if (
            subject.name.toLowerCase().includes(this.search_value.toLowerCase())
          ) {
            filtered_list.push(subject);
            this.subjects = filtered_list;
          }
        });
      else this.subjects = this.subjects_repo;
    },

    loadRoute(subject_id) {
      let term = this.$route.query.term;

      this.$router
        .push({
          name: this.$router.currentRoute.name,
          params: { id: this.$route.params.id },
          query: term ? { subject_id, term } : { subject_id },
        })
        .catch((error) => {
          if (error.name != "NavigationDuplicated") {
            throw error;
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.search-bar {
  position: relative;
  top: toRem(14);

  .form-control {
    padding-left: toRem(40);
    @include font-height(12.75, 18);
  }

  .icon-search {
    @include center-y;
    left: toRem(20);
    font-size: toRem(15);
    margin-top: toRem(1);
  }
}

.modal-cover-body {
  min-height: 10vh;
  height: auto;
  max-height: 44vh;
}
</style>
