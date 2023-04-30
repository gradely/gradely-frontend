<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    :show_close_btn="true"
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title text-uppercase">
          Change Term
        </div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body">
        <!-- TERM SELECT  -->
        <plain-select-card
          v-for="(term, index) in terms"
          :key="index"
          :index="index"
          :item="term"
          @selected="makeTermSelection($event)"
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
import modalCover from "@/shared/components/modal-cover";
import plainSelectCard from "@/shared/components/plain-select-card";

export default {
  name: "switchTermModal",

  components: {
    modalCover,
    plainSelectCard,
  },

  props: {
    pre_selected_term: {
      type: String,
      default: "first",
    },
  },

  data: () => ({
    terms: [
      {
        id: 1,
        name: "first",
        slug: "first term",
        selected: false,
      },
      {
        id: 2,
        name: "second",
        slug: "second term",
        selected: false,
      },
      {
        id: 3,
        name: "third",
        slug: "third term",
        selected: false,
      },
    ],
  }),

  created() {
    this.terms.map((term) => {
      if (term.name === this.pre_selected_term.toLowerCase())
        term.selected = true;
    });
  },

  methods: {
    makeTermSelection(index) {
      this.terms.map((term) => (term.selected = false)); // RESET TERM LIST
      this.terms[index].selected = true; // UPDATE SELECTED TERM TO TRUE

      this.$emit("selectTerm", this.terms[index]); // EMIT SELECTED TERM
      this.loadRoute(this.terms[index].name);

      this.$emit("closeTriggered");
    },

    // LOAD ROUTEp
    loadRoute(term) {
      let subject_id = this.$route.query.subject_id;

      this.$router
        .push({
          name: this.$router.currentRoute.name,
          params: { id: this.$route.params.id },
          query: subject_id ? { subject_id, term } : { term },
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

<style lang="scss" scoped></style>
