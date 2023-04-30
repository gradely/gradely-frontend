import Vue from 'vue';
const vueInstance = new Vue();
interface IVue extends Vue {
  $refs: any;
  $bus: typeof vueInstance;
  $color: any;
  staticImg: (src: string) => string;
}

export default IVue;
