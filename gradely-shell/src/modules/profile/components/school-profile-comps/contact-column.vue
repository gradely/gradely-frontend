<template>
  <div class="contact-column rounded-5 border-border-grey white-text-bg">
    <!-- TITLE TEXT  -->
    <div class="title-text color-grey-dark">CONTACT PERSON</div>

    <!-- CONTACT INFO  -->
    <div class="contact-info">
      <div class="user-image avatar">
        <img
          v-lazy="school.contact_image"
          :alt="$string.getStringInitials(getContactName)"
          class="avatar-img"
          v-if="school.contact_image"
        />

        <div
          v-else
          class="avatar-text white-text"
          :class="$color.getProfileBgColor(getContactName)"
        >
          {{ $string.getStringInitials(getContactName) }}
        </div>
      </div>

      <div class="user-info">
        <!-- NAME  -->
        <div class="name color-text font-weight-700 pdt-5">
          {{ getContactName }}
        </div>

        <!-- ROLE  -->
        <div class="role color-grey-dark">
          {{ school.contact_role ? school.contact_role : "Contact role" }}
        </div>

        <!-- CONTACT  -->
        <div class="contact-link btn-link font-weight-700">
          Contact
        </div>
      </div>
    </div>

    <!-- TITLE TEXT  -->
    <div class="title-text color-grey-dark">ADDRESS</div>

    <!-- CONTACT ROW  -->
    <div class="contact-row mgb-30">
      <div class="icon-holder avatar brand-inverse-light-bg">
        <div class="icon icon-map-pin-sm brand-navy"></div>
      </div>

      <div>
        <div class="title color-grey-dark text-capitalize">
          {{ school.city ? school.city + " Branch" : "City Branch" }}
        </div>
        <div class="value color-text">
          {{ school.address ? school.address : "Contact address" }}
        </div>
      </div>
    </div>

    <!-- TITLE TEXT  -->
    <div class="title-text color-grey-dark">CONTACT</div>

    <!-- PHONE  -->
    <div class="contact-row">
      <div class="icon-holder avatar brand-inverse-light-bg">
        <div class="icon icon-phone brand-navy"></div>
      </div>

      <div>
        <div class="value color-text">
          {{ school.phone ? school.phone : "Contact phone" }}
        </div>
      </div>
    </div>

    <!-- EMAIL  -->
    <div class="contact-row">
      <div class="icon-holder avatar brand-inverse-light-bg">
        <div class="icon icon-email brand-navy"></div>
      </div>

      <div>
        <div class="value color-text">
          {{ school.contact_email ? school.contact_email : "Contact email" }}
        </div>
      </div>
    </div>

    <!-- LINK  -->
    <div class="contact-row">
      <div class="icon-holder avatar brand-inverse-light-bg">
        <div class="icon icon-link brand-navy"></div>
      </div>

      <div>
        <div class="value color-text">
          {{ school.website ? school.website : "Contact website" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "contactColumn",

  props: {
    school: {
      type: Object,
      default: () => ({
        contact_image: "",
        contact_name: "Richy Jones",
        contact_role: "",
        contact_email: "",
        city: "",
        address: "",
        phone: "",
        website: "",
      }),
    },
  },

  computed: {
    getContactName() {
      return this.school.contact_name
        ? this.school.contact_name
        : "Contact name";
    },
  },
};
</script>

<style lang="scss" scoped>
.contact-column {
  padding: toRem(20);

  @include breakpoint-down(xl) {
    padding: toRem(18);
  }

  .title-text {
    @include font-height(11.5, 14);
    letter-spacing: 0.05em;
    margin-bottom: toRem(18);

    @include breakpoint-down(xl) {
      @include font-height(11, 14);
      margin-bottom: toRem(16);
    }
  }

  .contact-info {
    @include flex-row-start-nowrap;
    align-items: flex-start;
    margin-bottom: toRem(30);

    @include breakpoint-down(xl) {
      margin-bottom: toRem(20);
    }

    .user-image {
      @include square-shape(62);
      margin-right: toRem(15);
    }

    .name {
      @include font-height(14.75, 21);

      @include breakpoint-down(xl) {
        @include font-height(14, 20);
      }

      @include breakpoint-down(xs) {
        @include font-height(13, 19);
      }
    }

    .role {
      @include font-height(11.5, 16);
      margin-bottom: toRem(8);

      @include breakpoint-down(xl) {
        @include font-height(11.25, 16);
      }

      @include breakpoint-down(xs) {
        @include font-height(11, 16);
      }
    }

    .contact-link {
      @include font-height(13.5, 18);

      @include breakpoint-down(xl) {
        @include font-height(12.5, 18);
      }
    }
  }

  .contact-row {
    @include flex-row-start-nowrap;
    margin-bottom: toRem(10);

    &:last-of-type {
      margin-bottom: 0;
    }

    .icon-holder {
      @include square-shape(32);
      margin-right: toRem(15);

      .icon {
        @include center-placement;
      }
    }

    .title {
      @include font-height(11, 11);
      margin-bottom: toRem(5);
    }

    .value {
      @include font-height(12.5, 15);

      @include breakpoint-down(xl) {
        @include font-height(12, 14);
      }
    }
  }
}
</style>
