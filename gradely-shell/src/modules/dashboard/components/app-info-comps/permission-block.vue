<template>
  <div class="permission-block white-text-bg">
    <!-- BLOCK ONE  -->
    <div class="block-one">
      <div class="title-text">Report Cards will be able to view:</div>

      <permission-accordion
        :permission="{
          icon: 'UserCircle.svg',
          title: 'Personally identifiable information',
          description:
            'For example your school name, address, contact information, teacher names, classes, subjects, age, students, parents, phone number or identification number',
        }"
      />

      <permission-accordion
        :permission="{
          icon: 'Notebook.svg',
          title: 'Students Assessment and grades',
          description:
            'Students assessments and grades related information informations includes homework, quizzes and exams created by teachers, attempt of students on assessments, performance of students on each assessments, and teacher grading on each students record.',
        }"
      />
    </div>

    <!-- BLOCK TWO  -->
    <div class="block-two">
      <div class="title-text">Report Cards will be able to do:</div>

      <permission-accordion
        :permission="{
          icon: 'ChatTeardrop.svg',
          title: 'Post to your classes, feeds and Emails',
          description:
            'Reports will be posted to feeds and report modules of parent, student, teachers and school.',
        }"
      />

      <permission-accordion
        :permission="{
          icon: 'NotePencil.svg',
          title: 'Update your information',
          description:
            'Information of student, school structure, school contacts, class structuring and any other related information.',
        }"
      />
    </div>
  </div>
</template>

<script>
import permissionAccordion from "@/modules/dashboard/components/app-info-comps/permission-accordion";

export default {
  name: "permissionBlock",

  components: {
    permissionAccordion,
  },
};
</script>

<style lang="scss" scoped>
.permission-block {
  padding: toRem(30);

  @include breakpoint-down(xl) {
    padding: toRem(25);
  }

  @include breakpoint-down(sm) {
    padding: toRem(20);
  }

  @include breakpoint-down(xs) {
    padding: toRem(15);
  }

  @include breakpoint-custom-down(370) {
    padding: toRem(15) toRem(12);
  }

  .title-text {
    color: $color-text;
    font-weight: 600;
    @include font-height(14, 23);
    margin-bottom: toRem(15);

    @include breakpoint-down(xl) {
      @include font-height(13, 22);
      margin-bottom: toRem(13);
    }

    @include breakpoint-down(xs) {
      @include font-height(12.25, 20);
    }

    @include breakpoint-custom-down(370) {
      @include font-height(11.5, 19);
    }
  }

  .block-one {
    margin-bottom: toRem(30);
  }

  .block-two {
    margin-bottom: toRem(75);

    @include breakpoint-down(xs) {
      margin-bottom: toRem(45);
    }
  }
}
</style>
