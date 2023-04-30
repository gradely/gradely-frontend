<template>
  <modal-cover
    @closeModal="$emit('closeTriggered')"
    show_close_btn
    :modal_style="{ size: 'modal-xs' }"
  >
    <!-- MODAL HEADER  -->
    <template slot="modal-cover-header">
      <div class="modal-cover-header">
        <div class="modal-cover-title brand-navy">Create Subject</div>
      </div>
    </template>

    <!-- MODAL BODY  -->
    <template slot="modal-cover-body">
      <div class="modal-cover-body pdb-0">
        <!-- DESCRIPTION -->
        <div class="description color-ash">
          This subject is only available to you. You will have to create your
          own topics and questions as we do not have content for it.
        </div>

        <div class="form-row">
          <!-- EMAIL ADDRESS -->
          <div class="form-group compact-row w-100">
            <label for="subjectName" class="label-compact label-sm"
              >Subject Name</label
            >
            <input
              type="text"
              id="subjectName"
              class="form-control"
              placeholder="Mathematics"
              v-model="form.name"
            />
          </div>
        </div>

        <!-- BUTTON ROW -->
        <div class="bottom-row w-100 d-flex justify-content-end mgb-20">
          <button
            class="btn modal-btn transparent-bg no-shadow color-text mgr-5"
            @click="$emit('closeTriggered')"
          >
            Cancel
          </button>

          <button
            class="btn btn-accent"
            :disabled="isDisabled"
            @click="createSubject"
            ref="createBtn"
          >
            Create
          </button>
        </div>
      </div>
    </template>

    <!-- MODAL FOOTER  -->
    <template slot="modal-cover-footer"> </template>
  </modal-cover>
</template>

<script>
import { mapActions } from "vuex";
import modalCover from "@/shared/components/modal-cover";

export default {
  name: "createNewSubjectModal",

  components: {
    modalCover,
  },

  computed: {
    isDisabled() {
      return this.form.name ? false : true;
    },
  },

  data() {
    return {
      form: {
        global_class_id: Number(this.$route.params.global_class_id),
        name: "",
        description: "",
        department: "",
      },
    };
  },

  methods: {
    ...mapActions({ teacherCreateSubject: "general/teacherCreateSubject" }),

    createSubject() {
      this.handleClick("createBtn", "creating...");

      this.teacherCreateSubject(this.form)
        .then((response) => {
          this.handleClick("createBtn", "Create", false);

          if (response.code === 200) {
            this.pushAlert("Subject created successfully", "success");
            this.$emit("reloadSubject");
            setTimeout(() => this.$emit("closeTriggered"), 1000);
          } else {
            this.pushAlert("Subject not created", "warning");
          }
        })
        .catch(() => {
          this.handleClick("createBtn", "Create", false);
          this.pushAlert("An error occured while creating subject", "error");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-cover-title {
  @include font-height(14.5, 19);
}

.modal-cover-body {
  .description {
    margin-top: toRem(-5);
    margin-bottom: toRem(30);
    @include font-height(12.85, 22);
  }
}
</style>
