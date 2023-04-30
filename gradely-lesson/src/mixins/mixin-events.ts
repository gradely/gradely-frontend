import Vue, { VueConstructor } from 'vue';
import { IVue } from '@/interfaces';

// TO USE EVENT BUS, PREPEND "event-bus" TO YOUR EVENTS
const MixinEvents = (Vue as VueConstructor<IVue>).extend({
  methods: {
    handleClick(ref: any, text = 'Please wait...', processing = true) {
      if (processing) {
        this.$refs[ref].disabled = true;
        this.$refs[
          ref
        ].innerHTML = `<div class="icon-dotted-roller gfont-17 mgr-10 animate"></div>${text}`;
      } else {
        this.$refs[ref].innerHTML = `${text}`;
        this.$refs[ref].disabled = false;
      }
    },

    // POP UP ALERT
    pushAlert(message: string, type: string) {
      this?.$bus.$emit('show_response_alert', {
        message,
        type,
      });
    },
  },
});

export { MixinEvents };
