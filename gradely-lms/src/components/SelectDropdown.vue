<template>
  <div class="text-select-main">
    <button
      @click="handleToggle"
      :disabled="disabled"
      :toggle-id="id"
      class="main-btn"
    >
      <span :toggle-id="id" v-html="dataText" class="text"></span>

      <span :toggle-id="id" class="svg-area">
        <svg
          :toggle-id="id"
          :class="dropOpen ? 'inverted' : ''"
          width="11"
          height="7"
          viewBox="0 0 11 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="drop-svg"
        >
          <path
            :toggle-id="id"
            d="M1.2925 0L5.5 4.32659L9.7075 0L11 1.33198L5.5 7L0 1.33198L1.2925 0Z"
            fill="#0C0404"
            fill-opacity="0.74"
          />
        </svg>
      </span>
    </button>
    <div :class="dropOpen ? 'open' : ''" class="dropdown-container">
      <div data-type="drop-input" class="select-item-search">
        <input
          class="search-text"
          type="text"
          data-type="drop-input"
          placeholder="Search"
          v-model="inputString"
        />
        <span class="icon-search"></span>
      </div>
      <div class="scroller">
        <button
          @click="handleChange"
          :data-value="item.value"
          v-for="(item, index) in filteredItems"
          :data-text="item.text"
          :key="index"
          class="list-item"
          :disabled="disabled"
          :ref="item.value"
        >
          {{ item.text }}
        </button>
        <div class="loader-area" v-if="isLoading && !filteredItems.length">
          <span class="icon-dotted-roller icon spinner animate font-15"></span>
          <span class="loader-text">Loading...</span>
        </div>
        <div v-if="!filteredItems.length && !isLoading" class="hiddenText">
          <div v-if="empty_state.message">
            <div class="gfont-16 text-center mgb-10">
              {{ empty_state.message }}
            </div>

            <button
              :disabled="empty_state.loading ? true : false"
              class="btn btn-accent mx-auto pdx-18 pdy-12 gfont-11"
              @click.stop="$emit('newAction', inputString)"
            >
              <span
                class="icon icon-dotted-spinner animate gfont-12 mgr-12"
                v-if="empty_state.loading"
              ></span>
              <span v-if="empty_state.loading">{{ empty_state.loading }}</span>
              <span v-else>{{ empty_state.action_name }}</span>
            </button>
          </div>

          <div v-else>NOTHING TO SHOW</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CustomSelect",
  data() {
    return {
      dropOpen: false,
      dataText: "Hello",
      inputString: "",
      filteredItems: [],
    };
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: "Select Topic",
    },
    defaultText: {
      type: String,
      default: "Select Topic",
    },
    isAjax: {
      type: Boolean,
      default: false,
    },
    ajaxFunction: {
      type: Function,
    },
    value: [String, Number],

    empty_state: {
      type: Object,
      default: () => {
        return {
          message: "",
          action_name: "",
        };
      },
    },

    items: {
      type: Array,
      default: () => [
        { text: "Three", value: 3 },
        { text: "four", value: 4 },
        { text: "five", value: 5 },
        { text: "six", value: 6 },
        { text: "seven", value: 7 },
        { text: "eight", value: 8 },
      ],
    },
    searchFunction: {
      type: Function,
      default: (string, array) => {
        const filtered = array.filter((item) =>
          item.text.toLowerCase().includes(string.toLowerCase())
        );
        return filtered;
      },
    },
  },
  methods: {
    handleToggle() {
      this.dropOpen = !this.dropOpen;
    },
    handleChange(e) {
      this.dataText = e.target.getAttribute("data-text");
      this.$emit("change", e.target.getAttribute("data-value"));
    },
    handleRemove(e) {
      if (e.target.getAttribute("data-type") === "drop-input") {
        return;
      }
      if (!e.target.getAttribute("toggle-id")?.includes(this.id)) {
        if (this.dropOpen) {
          this.dropOpen = false;
        }
      }
    },
  },
  watch: {
    defaultText: {
      handler(text) {
        this.dataText = text;
      },
      immediate: true,
    },

    inputString() {
      this.filteredItems = [
        ...this.searchFunction(this.inputString, this.items),
      ];
      if (!this.filteredItems.length && this.isAjax) {
        this.ajaxFunction(this.inputString);
      }
    },
    items() {
      this.filteredItems = [
        ...this.searchFunction(this.inputString, this.items),
      ];
      // this.filteredItems = this.items;
    },
    value() {
      if (!this.value) {
        this.$emit("change", null);
        this.dataText = this.defaultText;
        return;
      }
      if (this.items) {
        const topic = this.items.filter(
          (item) => Number(item.value) === Number(this.value)
        );
        // console.log(topic);
        this.dataText = topic[0]?.text;
      }
    },
    //   const input = this.$refs[this.value];
    //   if (!input) {
    //     return;
    //   }
    //   input[0].click();
    // }
  },
  mounted() {
    if (this.value) {
      let topic;
      if (this.items) {
        topic = this.items.filter(
          (item) => Number(item.value) === Number(this.value)
        );
        // console.log(topic);
        this.dataText = topic[0]?.text;
      }
    } else {
      this.dataText = this.defaultText;
      this.filteredItems = this.items;
    }
    if (this?.items?.length) {
      this.filteredItems = [...this.items];
    }
  },
  created() {
    window.addEventListener("click", this.handleRemove);
  },
  destroyed() {
    window.removeEventListener("click", this.handleRemove);
  },
  updated() {
    window?.MathJax?.typeset();
  },
};
</script>

<style lang="scss" scoped>
.text-select-main {
  button {
    background: transparent;
  }
  position: relative;
  .main-btn {
    border: 0.0625rem solid #d5d5d5;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.7rem 0.75rem;
    user-select: none; /* supported by Chrome and Opera */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
  }
  .dropdown-container {
    border: 0.0625rem solid #d5d5d5;
    opacity: 0;
    visibility: hidden;
    display: none;
    width: 100%;
    z-index: 2147483647;
    padding: 0.5rem;
    margin-top: 0.5rem;
    overflow-y: auto;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 2px 0 #00000024, 0 1px 5px 0 #0000001f;
    .select-item-search {
      width: 100%;
      outline: none;
      border: 0.0625rem solid #d5d5d5;
      border-radius: 2.5rem;
      padding: 10px;
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
      color: #11bdcf !important;
      .icon-search {
        font-size: 20px;
      }
      .search-text {
        width: 100%;
        margin-left: 8px;
        border: none;
        margin-left: 8px;
      }
    }
    .scroller {
      overflow-y: auto;
      max-height: 200px;
      min-height: 200px;
    }
    .list-item {
      display: block;
      width: 100%;
      padding: 0.5rem;
      text-align: left;
    }
    .list-item:hover {
      background: #a69b9b17;
    }
  }
  .dropdown-container.open {
    opacity: 1;
    visibility: visible;
    display: block;
    animation: blow 0.08s;
    transform-origin: top;
  }
}
.drop-svg {
  transition: 0.3s;
}
.inverted {
  transform: rotate(180deg);
}
.hiddenText {
  text-align: center;
  padding: 20px;
}
.loader-area {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  .loader-text {
    margin-left: 9px;
  }
}

.empty-cta {
  padding: toRem(10) toRem(21);
  color: red;
}

@keyframes blow {
  0% {
    transform: scaleY(0);
  }

  100% {
    transform: scaleY(1);
  }
}
</style>
