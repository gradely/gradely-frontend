<template>
  <!-- skelecton-loader section start here -->
  <div>
    <section
      v-for="item in [1, 2, 3, 4, 5]"
      :key="item"
      class="loading-wrapper-question-sec"
    >
      <div class="loading-first-label-title">
        <span class="loading-header-list-term-left">first</span>
        <span class="loading-header-list-term-right"> </span>
      </div>

      <ol class="loading-wrapper-question-section">
        <li
          v-for="(skelect_fake_item, index) in [1, 2, 3, 4]"
          :key="index"
          class="loading-item-main-question-item"
        >
          <span>
            <span>{{ index }}.</span>&nbsp;<span>
              Simple Equations Involving Addition and
            </span>
          </span>
        </li>
      </ol>
    </section>
  </div>
  <!-- ends here for skelecton-loadr -->
</template>

<script>
export default {
    name:"SidebarSelectQuestionSkelectonLoader"
}
</script>

<style lang="scss" scoped>
// loading
.loading-wrapper-question-sec {
  list-style: none;
  user-select: none; /* supported by Chrome and Opera */
   -webkit-user-select: none; /* Safari */
   -khtml-user-select: none; /* Konqueror HTML */
   -moz-user-select: none; /* Firefox */
   -ms-user-select: none; /* Internet Explorer/Edge */
  .loading-wrapper-question-section {
    padding-left: 2px;
  }
  .loading-first-label-title {
    @include flex-row-between-nowrap;
    font-style: normal;
    font-weight: bold;
    font-size: 0.875rem;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: #dbf5f8;
    margin: 0rem 1rem;
    padding: 0.67rem 0px;
    .loading-header-list-term-left {
      background: #d5d5d517;
      color: transparent;
      border-radius: 8px;
    }
    .loading-header-list-term-right {
      cursor: pointer;
    }
  }
  .loading-item-main-question-item {
    font-style: normal;
    font-weight: normal;
    font-size: 0.75rem;
    line-height: 16px;
    display: flex;
    align-items: center;
    background: #d5d5d517;
    color: transparent;
    border-radius: 8px;
    line-height: 16px;
    @include flex-row-between-nowrap;
    padding: 0.5rem 0.68rem;
    border-radius: 10px;
    margin: 0.5rem 0.78rem;
    cursor: pointer;
  }
}

// loading skelecton end
</style>